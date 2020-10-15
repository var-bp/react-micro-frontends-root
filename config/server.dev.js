/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  // Exists only in webpack-dev-server. It's only needed if you want to serve static files.
  contentBase: path.join(__dirname, '../build'),
  // Tells dev-server to open the browser after server had been started.
  open: false,
  // Enable gzip compression of generated files.
  compress: false,
  // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
  // for the WebpackDevServer client so it can learn when the files were
  // updated. The WebpackDevServer client is included as an entry point
  // in the webpack development configuration. Note that only changes
  // to CSS are currently hot reloaded. JS changes will refresh the browser.
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3000,
  public: 'http://localhost:3000',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};
