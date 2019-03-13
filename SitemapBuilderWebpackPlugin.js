/* tslint:disable no-console */
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
    const routes = sitemapData.focusedRoutes();
    const Sitemap = require('react-router-sitemap').default;

    const pathFilter = {
      isValid: false,
      rules: [/index.html|\/explore\/terms-of-service|\/applied|\/beta-success/],
    };

    const paramsConfig = {
      '/explore/:apiCategoryKey/docs/:apiName': sitemapData.apiCategoryOrder.map(apiCategory => {
        return {
          apiCategoryKey: apiCategory,
          apiName: sitemapData.apiDefs[apiCategory].apis.map((api) => api.urlFragment),
        };
      }),
      '/explore/:apiCategoryKey?': [''].concat(sitemapData.apiCategoryOrder).map(apiCategory => {
        return { 'apiCategoryKey?': apiCategory };
      }),
    };

    const sitemap = (
      new Sitemap(routes)
        .filterPaths(pathFilter)
        .applyParams(paramsConfig)
        .build(prodURL)
        .save(path.join(paths.appBuild, 'sitemap.xml'))
    ).sitemaps[0].cache.replace(/\?<\/loc>/g, '</loc>');

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
