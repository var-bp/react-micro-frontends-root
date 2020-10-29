/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const cors = require('cors');
const express = require('express');

const APP = express();
const PORT = 8080;
const HOST = '0.0.0.0';

APP.use(cors());
APP.use(express.static(path.join(__dirname, '../build')));

// Serve static gzip files
APP.get('*.js', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

// Serve static gzip files
APP.get('*.css', (req, res, next) => {
  req.url = `${req.url}.gz`;
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

APP.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

APP.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.info(`Production server running at: http://localhost:${PORT}/`);
});
