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
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            return '/index.html'
          } else if (
            process.env.MOCK !== 'none' &&
            req.path.indexOf('/api') !== -1
          ) {
            const name = req.path
              .split('/api/')[1]
              .split('/')
              .join('_')
            delete require.cache[require.resolve(`./mock/${name}`)]
            const mock = require(`./mock/${name}`)
            const result = mock(req, res)
            res.send(result)
          }
        },
      },
    },
  },
}
