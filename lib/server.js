// Zero Dependencies Node.js HTTP Server for running static on Heroku
var http = require('http');
var fs = require('fs');
var path = require('path');
console.log('cwd', __dirname);
var index = fs.readFileSync(path.resolve(__dirname + '/../index.html'), 'utf8');
var favicon = fs.readFileSync(__dirname + '/favicon.ico');
var app = fs.readFileSync(__dirname + '/todo-app.js');
var elmish = fs.readFileSync(__dirname + '/elmish.js');
var appcss = fs.readFileSync(__dirname + '/todomvc-app.css');
var basecss = fs.readFileSync(__dirname + '/todomvc-common-base.css');

http.createServer(function (req, res) {
  console.log("URL:", req.url);
  if (req.url.indexOf('favicon') > -1) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end(favicon);
  }
  if (req.url.indexOf('.js') > -1) {
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    if (req.url.indexOf('elmish') > -1) {
      res.end(elmish);
    }
    else {
      res.end(app);
    }
  }
  if (req.url.indexOf('.css') > -1) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    if (req.url.indexOf('base') > -1) {
      res.end(basecss);
    }
    else {
      res.end(appcss);
    }
  }
  else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
  }
}).listen(process.env.PORT || 8000);
