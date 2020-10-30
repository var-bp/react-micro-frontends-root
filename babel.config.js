/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const path = require('path');

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: false,
        // By default, babel assumes babel/runtime version 7.0.0-beta.0,
        // explicitly resolving to match the provided helper functions.
        // https://github.com/babel/babel/issues/10261
        version: require('@babel/runtime/package.json').version,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules: false,
        // Undocumented option that lets us encapsulate our runtime, ensuring
        // the correct version is used
        // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
        absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
      },
    ],
  ],
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-styled-components',
          { displayName: true, namespace: process.env.MICROFRONTEND_NAME },
        ],
      ],
    },
    production: {
      plugins: [
        'date-fns',
        'lodash',
        [
          'babel-plugin-styled-components',
          { displayName: false, fileName: false, namespace: process.env.MICROFRONTEND_NAME },
        ],
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
        ['react-remove-properties', { properties: ['data-testid'] }],
      ],
    },
    test: {
      presets: ['@babel/env', '@babel/preset-typescript', '@babel/preset-react'],
      plugins: [['babel-plugin-styled-components', { displayName: true, fileName: true }]],
    },
  },
};
