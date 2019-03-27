/* tslint:disable no-console */

/*  This webpack plugin uses the existing React routes and JSON API definitions 
*   included in the app to create a sitemap at build using react-router-sitemap
*   (as opposed to having to maintain a separate map of the app that uses 
*   Node.js-friendly code or building the sitemap by hand). 
*   This is complicated by the fact that the app's routes and API definitions 
*   include dependencies on the components that they render, leading to dependencies 
*   on not just tsx files but also scss and mdx files.
*   The processing necessary to transform these dependencies into Node.js-friendly code 
*   taps into the existing webpack configuration to avoid a reimplementation 
*   of this workflow that also is run at build.
*
*   The basic flow of this plugin is:
*     1. Copy the webpack.config.prod.js and change the entry point to Routes.tsx
*     2. Compile Routes.tsx and its dependencies
*     3. Save the compiled bundle into memory and execute the script 
*        using a Node.js virtual machine with implementations of web standards (notably DOM and Window)
*     4. use the resulting exported function `getSitemapData` to build a sitemap with react-router-sitemap
*     5. add `sitemap.xml` to the original webpack compilation's assets so that it is output like any other file in the build bundle
*   You can pass this plugin the option verbose: true to receive messages as it moves through this flow.
*
*   Modifying the sitemap
*     When a route is added to or removed from Routes.tsx this plugin will automatically modify the sitemap. 
*     There are situations when the config for react-router-sitemap needs to be updated for the sitemap to reflect the desired paths:
*       - When a route is included in Routes.tsx that should not be included in the sitemap, it needs to be added to `pathFilter`
*       - When a route with dynamic subroutes is added to Routes.tsx you need to pass an array of the available params to `paramsConfig`
*/

const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs')
const util = require('util');
const vm = require('vm');
const fs = require('fs');

class SitemapBuilderPlugin {

  constructor(options) {
    if (typeof options === 'undefined' || !options.routesFile) {
      console.error('To use SitemapBuilderPlugin you must provide an options object with routesFile as a property')
    }
    this.routesFile = options.routesFile;
    this.verbose = options.verbose || false;
    this.fileName = options.fileName || 'sitemap.xml';
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      if (this.verbose) {
        console.log('Sitemap Builder Plugin start');
      }
      // Tapable hooks are not able to be removed (https://github.com/webpack/tapable/issues/71)
      // so we immediately invoke callback() when this plugin is being called by a compilation it triggers
      if (compiler.options.entry.includes(this.routesFile)) {
        if (this.verbose) {
          console.log('Sitemap Builder Plugin end without compiling', compiler.options.entry);
        }
        callback();
      } else {
        let config = compiler.options;
        config.entry = [this.routesFile];
        config.output.path = '/';
        config.output.filename = 'routes.js';
        config.optimization = { minimize: false };

        this.compileRoutes(config)
          .then((mfs) => this.executeRoutes(mfs))
          .then((sitemapData) => this.buildSitemap(sitemapData, compilation))
          .then(() => this.finish(callback))
          .catch(err => this.finishWithError(err, compilation, callback));
      }
    });
  }

  compileRoutes(config) {
    if (this.verbose) {
      console.log('compileRoutes start');
    }
    return new Promise((resolve, reject) => {
      let compiler = webpack(config);
      let mfs = new MemoryFileSystem();
      compiler.outputFileSystem = mfs;
      compiler.run((err, stats) => {
        if (this.verbose) {
          console.log('compileRoutes compiler.run callback');
        }
        if (err) {
          reject(err);
        } else {
          resolve(mfs);
        }
      })
    })
  }

  executeRoutes(mfs) {
    if (this.verbose) {
      console.log('executeRoutes start');
    }
    return new Promise((resolve, reject) => {
      const source = mfs.readFileSync('/routes.js').toString();
      const script = new vm.Script(source, { filename: 'routes.vm', displayErrors: true });
      const jsdom = require('jsdom');
      const { JSDOM } = jsdom;
      const dom = new JSDOM(``, { runScripts: 'outside-only' });
      const sitemapData = dom.runVMScript(script).getSitemapData();
      resolve(sitemapData);
    })
  }

  buildSitemap(sitemapData, compilation) {
    if (this.verbose) {
      console.log('buildSitemap start');
    }
    const path = require('path');
    const paths = require('./config/paths');
    const prodURL = require(paths.appPackageJson).homepage;
    const apiFlags = sitemapData.flags.hosted_apis;
    const routes = sitemapData.topLevelRoutes();
    const Sitemap = require('react-router-sitemap').default;

    const pathFilter = {
      isValid: false,
      rules: [/index.html|\/explore\/terms-of-service|\/applied|\/beta-success|\/oauth/],
    };

    function getApiRouteParams(route, apiCategory) {
      let routeParams = sitemapData.apiDefs[apiCategory].apis.reduce((result, api) => {
        if (apiFlags.hasOwnProperty(api.urlFragment) && apiFlags[api.urlFragment]) {
          result.push(api.urlFragment);
        }
        return result;
      }, []);

      if (route === '/explore/:apiCategoryKey/docs/:apiName' && !sitemapData.apiDefs[apiCategory].apiKey) {
        routeParams.push('authorization');
      }

      return routeParams;
    }

    const paramsConfig = {
      '/explore/:apiCategoryKey/docs/:apiName': sitemapData.apiCategoryOrder.map(apiCategory => {
        return {
          apiCategoryKey: apiCategory,
          apiName: getApiRouteParams('/explore/:apiCategoryKey/docs/:apiName', apiCategory),
        };
      }),
      '/explore/:apiCategoryKey?': [ { 'apiCategoryKey?': sitemapData.apiCategoryOrder } ],
      '/release-notes/:apiCategoryKey?': [ { 'apiCategoryKey?': sitemapData.apiCategoryOrder } ],
    };

    const sitemap = (
      new Sitemap(routes)
        .filterPaths(pathFilter)
        .applyParams(paramsConfig)
        .build(prodURL)
        .save(path.join(paths.appBuild, 'sitemap.xml'))
    ).sitemaps[0].cache;

    fs.unlinkSync(path.join(paths.appBuild, 'sitemap.xml'));

    compilation.fileDependencies.add(this.fileName);
    compilation.assets[this.fileName] = {
      size: () => {
        return Buffer.byteLength(sitemap, 'utf8');
      },
      source: () => {
        return sitemap;
      },
    };
  }

  finish(callback) {
    if (this.verbose) {
      console.log('Sitemap Builder Plugin end');
    }
    callback();
  }

  finishWithError(err, compilation, callback) {
    console.log('Sitemap Builder Plugin Error');
    console.error(err.stack);
    compilation.errors.push(err.stack);
    callback();
  }
}

module.exports = SitemapBuilderPlugin;
