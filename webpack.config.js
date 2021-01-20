const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: {
    'js/main': './src/main.js',
  },
  plugins: [
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        class: 'svg-sprite'
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: '../src/components/svg-sprite/svg-sprite.svg',
              esModule: false,
            }
          },
          'svgo-loader'
        ]
      },
    ]
  },
}
