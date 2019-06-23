"use strict"
const http = require('http')
const https = require('https')
const path = require('path')
const express = require('express')
// const fs = require('fs')
// const axios = require('axios')
// const FormData = require('form-data')

const { PORT, CLOUDANT_URL } = require('./configs')
const { normalizePort, onError, onListening } = require('./util')
const applyMiddlewares = require('./middlewares')

const app = express()

applyMiddlewares( app )

app.use( express.static( path.join( __dirname ) ) )

const port = normalizePort( process.env.PORT || PORT )
app.set( 'port', port )


const server = http.createServer( app )
console.log('server started on port',port)


const db = require('./db')(CLOUDANT_URL)
const io = require('./socketio')(server, db)
const api = require('./api')(app, db, io)

api.refreshDB()

server.listen( port )
server.on( 'error', onError( port ) )
server.on( 'listening', onListening( server ) )
