/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const env = require('./env');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.join(__dirname, '../build'),
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    publicPath: '/',
    // Prevents conflicts when multiple webpack runtimes (from different apps)
    // are used on the same page.
    jsonpFunction: `webpackJsonp${env.MICROFRONTEND_NAME}`,
    // this defaults to 'window', but by setting it to 'this' then
    // module chunks which are built will work in web workers as well.
    globalObject: 'this',
  },
  // Some libraries import Node modules but don't use them in the browser.
  // Tell webpack to provide empty mocks for them so importing them works.
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    // Automatically split vendor and commons
    // An in-depth guide https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching.
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    // This allows you to set a fallback for where webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts.
    modules: ['node_modules', path.join(__dirname, '../node_modules')],
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools.
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.join(__dirname, '../src'),
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              cache: true,
              eslintPath: 'eslint',
              resolvePluginsRelativeTo: __dirname,
            },
          },
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
          },
        },
      },
      {
        loader: 'file-loader',
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.css$/,
          /\.(scss|sass)$/,
          /\.(json|jsonp)$/,
        ],
        options: {
          name: 'media/[name].[hash:8].[ext]',
        },
      },
      // Add an additional namespace to generated styles to prevent container and micro-frontends from conflicting
      {
        test: require.resolve('react'),
        loader: 'expose-loader',
        options: {
          exposes: 'React',
        },
      },
      {
        test: require.resolve('react-dom'),
        loader: 'expose-loader',
        options: {
          exposes: 'ReactDom',
        },
      },
      {
        // styled-components has a different entry point for require vs import, so we have to specify the specific base path
        test: path.join(__dirname, '../node_modules/styled-components'),
        loader: 'expose-loader',
        options: {
          exposes: 'StyledComponents',
        },
      },
    ],
  },
  plugins: [
    // A linter for CSS-like syntaxes like SCSS, Sass, Less and SugarSS
    new StylelintPlugin({
      files: '**/*.{scss,sass,css,ts,tsx,js,jsx}',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public'),
          to: './',
          globOptions: {
            dot: true,
            ignore: ['**/*.html', '**/.DS_Store'],
          },
        },
      ],
    }),
    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          // eslint-disable-next-line no-param-reassign
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.app.filter((fileName) => !fileName.endsWith('.map'));
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
};
