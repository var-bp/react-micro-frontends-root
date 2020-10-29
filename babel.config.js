module.exports = {
  presets: [['@babel/env', { modules: false }], '@babel/preset-typescript', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime'],
  env: {
    development: {
      plugins: [['babel-plugin-styled-components', { displayName: true }]],
    },
    production: {
      plugins: [
        'date-fns',
        'lodash',
        ['babel-plugin-styled-components', { displayName: false, fileName: false }],
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
