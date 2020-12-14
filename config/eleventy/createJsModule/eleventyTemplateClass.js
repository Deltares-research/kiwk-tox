const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MemoryFileSystem = require('memory-fs');

const isProd = process.env.ELEVENTY_ENV === 'production';
const mfs = new MemoryFileSystem();
const OUTPUT_PATH = path.resolve(__dirname, '/memory-fs/js/');

// Webpack shared config
const envPlugin = new webpack.EnvironmentPlugin({
  ELEVENTY_ENV: process.env.ELEVENTY_ENV,
});

const rules = [
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
  },
];

module.exports = class {
  async data() {
    const webpackConfig = {
      mode: isProd ? 'production' : 'development',
      entry: {
        [this.FILE_NAME]: this.FULL_PATH,
      },
      output: {
        path: OUTPUT_PATH,
        filename: '[name].js',
      },
      module: { rules },
      plugins: [envPlugin],
    };

    return Object.assign(
      {
        permalink: `/assets/scripts/${this.FILE_NAME}.js`,
        eleventyExcludeFromCollections: true,
      },
      this.FRONT_MATTER,
      { webpackConfig }
    );
  }

  // Compile JS with Webpack, write the result to Memory Filesystem.
  // this brilliant idea is taken from Mike Riethmuller / Supermaya
  // @see https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-webpack.js
  compile(webpackConfig) {
    const compiler = webpack(webpackConfig);
    compiler.outputFileSystem = mfs;
    compiler.inputFileSystem = fs;
    compiler.resolvers.normal.fileSystem = mfs;

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          const errors =
            err || (stats.compilation ? stats.compilation.errors : null);

          reject(errors);
          return;
        }

        const { assets } = stats.compilation;
        const file = assets[`${this.FILE_NAME}.js`].source();

        resolve(file);
      });
    });
  }

  // render the JS file
  async render({ webpackConfig }) {
    try {
      const result = await this.compile(webpackConfig);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
};
