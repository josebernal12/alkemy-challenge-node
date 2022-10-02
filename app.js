const Server = require('./models/server')
require('./database/association')
require('dotenv').config()

const server = new Server

server.listen()