const { join } = require('path')
const SpritesmithPlugin = require('webpack-spritesmith')

const resolve = function(dir) {
  return join(__dirname, './', dir)
}

const iconSpriteTemplate = function(data) {
  var shared = '.icon-png { background-image: url(I);background-size: X%;}'
    .replace('I', data.sprites[0].image)
    .replace('X', data.sprites.length * 100)

  let sprites = []
  data.sprites.forEach((sprite, index) => {
    sprites.push(
      '.icon-png-N { width: 100%; height: 100%; background-position: -X% 0%; }'
        .replace('N', sprite.name)
        .replace('X', index * 100),
    )
  })

  return shared + '\n' + sprites.join('\n')
}

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/styles/global.scss";
        `,
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon-svg'))
      .end()

    config.module
      .rule('icon-svg')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon-svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-svg-[name]',
      })

    config.module
      .rule('png')
      .exclude.add(resolve('src/assets/icon-png'))
      .end()
  },
  configureWebpack: {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: resolve('./src/assets/icon-png'),
          glob: '*.png',
        },
        target: {
          image: resolve('./src/assets/icon-png.png'),
          css: [
            [
              resolve('./src/styles/common/icon-png.scss'),
              {
                format: 'function_based_template',
              },
            ],
          ],
        },
        customTemplates: {
          function_based_template: iconSpriteTemplate,
        },
        apiOptions: {
          cssImageRef: '~@/assets/icon-png.png',
        },
        spritesmithOptions: {
          algorithm: 'left-right',
        },
      }),
    ],
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
