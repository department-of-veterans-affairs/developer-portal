module.exports = {
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    ["@babel/plugin-proposal-private-methods", { "loose": false }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": false }]
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "forceAllTransforms": true,
        "loose": true,
        "corejs": 2,
        "modules": false,
        "exclude": [
          "transform-typeof-symbol"
        ],
        "targets": {
          "ie": "11",
          "chrome": "54",
          "firefox": "46",
          "node": "current"
        }
      }
    ],
    [
      "react-app",
      {
        "flow": false,
        "typescript": true
      }
    ]
  ]
};