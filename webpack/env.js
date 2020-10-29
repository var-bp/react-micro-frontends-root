/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

module.exports = fs.existsSync(path.join(__dirname, '../.env')) ? dotenv.config().parsed : {};
