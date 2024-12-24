// Логирование http запросов (middleware) - для обычных логов показаний датчиков и моточасы оборудования не подойдет


// EXPRESS

// var express = require('express')
// var morgan = require('morgan')
 
// var app = express()
 
// app.use(morgan('combined'))
 
// app.get('/', function (req, res) {
//   res.send('hello, world!')
// })


// vanilla http server

// var finalhandler = require('finalhandler')
// var http = require('http')
// var morgan = require('morgan')
 
// // create "middleware"
// var logger = morgan('combined')
 
// http.createServer(function (req, res) {
//   var done = finalhandler(req, res)
//   logger(req, res, function (err) {
//     if (err) return done(err)
 
//     // respond to request
//     res.setHeader('content-type', 'text/plain')
//     res.end('hello, world!')
//   })
// })