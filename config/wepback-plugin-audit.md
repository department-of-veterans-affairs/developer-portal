# Webpack Plugin Audit
### This is a check to see which plugins are being used, need updated, or are severely exploitable.

## webpack.config.dev.js

Plugin             | Link  | Use it?  | To date?| Security bad?   | 
-----------------|---------|----------|---------|---------|
autoprefixer     |[NPM](https://www.npmjs.com/package/autoprefixer) |    Yes |   No |No |                   
path     |[NPM](https://www.npmjs.com/package/path) |    Yes |   Yes |   No |     
webpack     |[NPM](https://www.npmjs.com/package/webpack) |    Yes |   No |   No |
CaseSensitivePathsPlugin     |[NPM](https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin) |    Yes |   Yes |   No |
InterpolateHtmlPlugin     |[NPM](https://www.npmjs.com/package/react-dev-utils) |    N/A |   N/A |   N/A |
WatchMissingNodeModulesPlugin     |[NPM](https://www.npmjs.com/package/react-dev-utils) |    N/A |   N/A |   N/A |
ModuleScopePlugin     |[NPM](https://www.npmjs.com/package/react-dev-utils) |    N/A |   N/A |   N/A |
ForkTsCheckerWebpackPlugin     |[NPM](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin) |    N/A |   N/A |   N/A |  N/A |
TsconfigPathsPlugin     |[NPM](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) |    N/A |   N/A | N/A
CopyPlugin     |[NPM](https://www.npmjs.com/package/copy-webpack-plugin) |    N/A |   N/A |   N/A |

