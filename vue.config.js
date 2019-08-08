const { join } = require('path')

const resolve = function(dir) {
  return join(__dirname, './', dir)
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/assets/styles/index.scss";
        `,
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/IconSvg'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/IconSvg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
  },
}
