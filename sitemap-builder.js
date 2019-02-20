'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('@babel/register')({
    presets: [ '@babel/env', '@babel/react' ],
});

const path = require('path');
const paths = require('./config/paths');
const router = require('./src/sitemap-routes.jsx').default;
const Sitemap = require('react-router-sitemap').default;

// building paths from dynamic routes
// will need to import apiDefs.ts to further build out dynamic paths
const paramsConfig = {
    '/explore/:apiCategoryKey': [
        { apiCategoryKey: ['benefits', 'facilities', 'health', 'verification' ] },
      ]
};

const sitemap = (
    new Sitemap(router)
        .filterPaths({ isValid: false, rules: [/index.html/] })
        .applyParams(paramsConfig)
        .build(paths.publicUrl)
        .save(path.join(paths.appPublic, 'sitemap.xml'))
);
