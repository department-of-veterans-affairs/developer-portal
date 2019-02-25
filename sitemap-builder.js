'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('@babel/register')({
    presets: [ '@babel/env', '@babel/react' ],
});

const path = require('path');
const paths = require('./config/paths');
const prodURL = require(paths.appPackageJson).homepage;
const router = require('./src/sitemap-routes.jsx').default;
const Sitemap = require('react-router-sitemap').default;

const pathFilter = {
    isValid: false,
    rules: [/index.html|\/explore\/terms-of-service|\/applied|\/beta-success/],
};

// building paths from dynamic routes
// todo import apiDefs.ts
const apiCategoryOrder = [ 'benefits', 'facilities', 'health', 'verification' ];
const apiDefs = {
    benefits: {
        apis: [
            { urlFragment: 'benefits', },
            { urlFragment: 'appeals', },
            { urlFragment: 'claims', },
            { urlFragment: 'loan_guaranty', },
        ],
    },
    facilities: {
        apis: [
            { urlFragment: 'facilities', },
        ],
    },
    health: {
        apis: [
            { urlFragment: 'argonaut', },
        ],
    },
    verification: {
        apis: [
            { urlFragment: 'disability_rating', },
            { urlFragment: 'service_history', },
            { urlFragment: 'veteran_confirmation', },
            { urlFragment: 'address_validation', },
        ],
    },
};
const paramsConfig = {
    '/explore/:apiCategoryKey': apiCategoryOrder.map(apiCategory => {
        return { apiCategoryKey: apiCategory };
    }),
    '/explore/:apiCategoryKey/docs/:apiName': apiCategoryOrder.map(apiCategory => {
        return {
            apiCategoryKey: apiCategory,
            apiName: apiDefs.benefits.apis.map((api) => api.urlFragment),
        };
    }),
};

const sitemap = (
    new Sitemap(router)
        .filterPaths(pathFilter)
        .applyParams(paramsConfig)
        .build(prodURL)
        .save(path.join(paths.appPublic, 'sitemap.xml'))
);
