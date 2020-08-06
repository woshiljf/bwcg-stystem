'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/': {
        // target: 'http://localhost:8086',
        // target: 'http://127.0.0.1:8082',
        target: 'http://bwcaigou.baowei-inc.com',
        // target: 'http://auth.baowei-inc.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '': ''
        }
      }
      // ,
      // '/cdownload': {
 
      //   target: 'http://bwcaigou.baowei-inc.com',
      //   // target: 'http://auth.baowei-inc.com',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/cdownload': ''
      //   }
      // },
      // '/order': {
      //   // target: 'http://localhost:8080',
      //   // target: 'http://10.65.2.40:8087',   // 张岩2
      //   // target: 'http://10.65.1.105:8087',  // 宁元
      //   target: 'http://bwcaigou.baowei-inc.com', // 测试端口
      //   // target: 'http://10.65.6.1:8187', // 开发端口
      //   // target: 'http://127.0.0.1:8087',
      //   // target: 'http://smp.api.baowei-inc.com',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/order': ''
      //   }
      // },
      // '/pdc': {
      //   // target: 'http://10.65.6.201:9099',
      //   target: 'http://bwcaigou.baowei-inc.com', // 开发端口
      //   // target: 'http://10.65.2.150:8080', // 开发端口（张岩测试地址和端口）
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/pdc': ''
      //   }
      // },
      // '/statement': {
      //   // target: 'http://localhost:8088',
      //   target: 'http://bwcaigou.baowei-inc.com',
      //   // target: 'http://10.65.3.201:8088',
      //   // target: 'http://10.65.3.201:8091',
      //   // target: 'http://accounting-sync.api.baowei-inc.com',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/statement': ''
      //   }
      // },
      // '/bff': {
      //   // target: 'http://10.65.6.201:8098', // 测试端口
      //   // target: 'http://10.65.6.1:8094', // 开发环境
      //   // target: 'http://10.65.2.59:8080', // 戴逢
      //   // target: 'http://10.65.1.26:8088', // 朱家田
      //   // target: 'http://10.65.2.109:8090',   // 仁浩
      //   target: 'http://bwcaigou.baowei-inc.com', // bff 渠道优化项目 联调环境端口
      //   // target: 'http://10.65.2.59:8080', // 戴逢
      //   // target: 'http://10.65.6.201:8302',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/bff': ''
      //   }
      // },
      // '/oos': {
      //   target: 'http://bwcaigou.baowei-inc.com', // 王
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/oos': ''
      //   }
      // }
    },

    // Various Dev Server settings

    // can be overwritten by process.env.HOST
    // if you want dev by ip, please set host: '0.0.0.0'
    host: 'localhost',
    port: 9527, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-source-map',

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build:prod --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    // `npm run build:prod --generate_report`
    generateAnalyzerReport: process.env.npm_config_generate_report || false
  }
}
