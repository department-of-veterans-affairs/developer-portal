# Webpack Plugin Audit
### This is a check to see which plugins are being used, need updated, or are severely exploitable.

Plugins moved to latest release where done so only if there were no issues with the upgrade. Therefore the plugins that are not up to date are due to various issues with the latest release and other parts of the Dev Portal.

## webpack.config.dev.js

Plugin             | Link  | Use it?  | To date?| Security bad?   | 
-----------------|---------|----------|---------|---------|
autoprefixer     |[NPM](https://www.npmjs.com/package/autoprefixer) |    Yes |   No |No |                   
path     |[NPM](https://www.npmjs.com/package/path) |    Yes |   Yes |   No |     
webpack     |[NPM](https://www.npmjs.com/package/webpack) |    Yes |   No |   No |
react-dev-utils/CaseSensitivePathsPlugin     |[NPM](https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin) |    Yes |   Yes |   No |
react-dev-utils/InterpolateHtmlPlugin     |[NPM](https://www.npmjs.com/package/react-dev-utils) |    Yes |   No |   [Yes](https://snyk.io/test/npm/react-dev-utils/6.1.1) |
react-dev-utils/WatchMissingNodeModulesPlugin     |[NPM](https://www.npmjs.com/package/react-dev-utils) |    Yes |   No |   [Yes](https://snyk.io/test/npm/react-dev-utils/6.1.1) |
react-dev-utils/ModuleScopePlugin     |[NPM](https://www.npmjs.com/package/react-dev-utils) |    Yes |   No |   [Yes](https://snyk.io/test/npm/react-dev-utils/6.1.1) |
ForkTsCheckerWebpackPlugin     |[NPM](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin) |    Yes |   Yes |   No |  N/A |
TsconfigPathsPlugin     |[NPM](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) |    Yes |   Yes | No
CopyPlugin     |[NPM](https://www.npmjs.com/package/copy-webpack-plugin) |    Yes |   Yes |   [No](https://snyk.io/vuln/npm:copy-webpack-plugin) |

