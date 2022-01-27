const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;

// Get our API routes
const api = require('./api');
// const route = require('./routes');
const app = express();  

// app.use('/vue', 
//     express.static(path.join(__dirname, 
//       '/node_modules/vue/dist/vue.js')));

// Parsers for POST data
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set our API routes
app.use('/api', api);
// Catch all other routes and return the index file 
// app.get('*', (req, res) => { res.sendFile(path.join(__dirname, 'dist/index.html')); });
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, 'dist/index.html')); 
});
const port = process.env.PORT || '8080';
app.set('port', port);
// Create HTTP server
const server = http.createServer(app);


server.listen(port, () => console.log(`API running on localhost:${port}`));