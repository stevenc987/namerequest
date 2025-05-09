const webpack = require('webpack') // eslint-disable-line @typescript-eslint/no-var-requires
const fs = require('fs') // eslint-disable-line @typescript-eslint/no-var-requires
const packageJson = fs.readFileSync('./package.json')
const name = JSON.parse(packageJson).name
const appName = JSON.parse(packageJson).appName
const appVersion = JSON.parse(packageJson).version
const sbcName = JSON.parse(packageJson).sbcName
const sbcVersion = JSON.parse(packageJson).dependencies['sbc-common-components']
const aboutText1 = (appName && appVersion) ? `${appName} v${appVersion}` : ''
const aboutText2 = (sbcName && sbcVersion) ? `${sbcName} v${sbcVersion}` : ''

module.exports = {
  configureWebpack: {
    devtool: 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          ABOUT_TEXT:
            (aboutText1 && aboutText2) ? `"${aboutText1}<br>${aboutText2}"`
              : aboutText1 ? `"${aboutText1}"`
                : aboutText2 ? `"${aboutText2}"`
                  : '',
          APP_NAME: `"${name}"`
        }
      })
    ],
    devServer: {
      hot: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.vue', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['postcss-loader', 'sass-loader']
        }
      ]
    }
  },
  transpileDependencies: [
    'vuetify',
    'vuex-module-decorators',
    'keycloak-js'
  ],
  publicPath: process.env.VUE_APP_PATH
}
