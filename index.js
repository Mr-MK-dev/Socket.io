const express = require('express');
const path = require('path');
const app = express();

const staticPath = path.join(__dirname, './public');


app.use(express.static(staticPath));


module.exports = app
