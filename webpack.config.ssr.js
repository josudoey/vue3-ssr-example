
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { ssrOutputPath } = require('./env')

module.exports = function (env) {
  return {
    target: 'node',
    externals: [
      'vue'
    ],
    entry: {
      main: {
        import: path.resolve('./outlet/ssr/entry.mjs'),
        filename: 'main.mjs',
        library: {
          type: 'module'
        }
      }
    },
    node: {
      __dirname: false,
      __filename: false
    },
    experiments: {
      outputModule: true
    },
    externalsType: 'node-commonjs',
    output: {
      path: ssrOutputPath,
      chunkFormat: 'module'
    },
    mode: 'production',
    resolve: {
      alias: {
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({}),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true }
              }
            ]
          }
        })
      ]
    },
    module: {
      rules: [{
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: require.resolve('file-loader'),
        options: {
          outputPath: 'img',
          publicPath: '../img',
          useRelativePath: false,
          name: '[contenthash].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: require.resolve('file-loader'),
        options: {
          outputPath: 'fonts',
          publicPath: '../fonts',
          useRelativePath: false,
          name: '[contenthash].[ext]'
        }
      }, {
        test: /\.html$/,
        loader: require.resolve('html-loader'),
        options: {
          minimize: true
        }
      }, {
        test: /render.pug$/,
        use: [{
          loader: require.resolve('vue-loader/dist/templateLoader.js'),
          options: {
            minimize: {
              collapseBooleanAttributes: true
            }
          }
        }, {
          loader: require.resolve('pug-plain-loader')
        }]
      }, {
        test: /template.pug$/,
        use: [{
          loader: require.resolve('html-loader'),
          options: {
            minimize: {
              collapseBooleanAttributes: true
            }
          }
        }, {
          loader: require.resolve('pug-plain-loader')
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            emit: false
          }
        }, {
          loader: require.resolve('css-loader'),
          options: {
            modules: {
              namedExport: true,
              localIdentName: '__[hash:base64:5]'
            },
            importLoaders: 1
          }
        }]
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[contenthash].css',
        chunkFilename: 'css/[contenthash].css'
      })
    ]
  }
}
