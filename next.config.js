const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')

const conf = {
  env: {
    ENVIRONTMENT: process.env.ENVIRONTMENT,
  },
}

module.exports = withPlugins(
  [
    withCSS({
      cssModules: true,
      cssLoaderOptions: {
        localIdentName: '[hash:base64:5]',
      },
    }),
  ],
  conf,
)
