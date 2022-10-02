const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')


const db = require('../database/db')
const { config } = require('../config/config')


class Server {

    constructor() {
        this.app = express()
        this.PORT = config.PORT
        this.Paths = {
            usuarios: '/api/register',
            login: '/api/auth',
            personajes: '/api/character',
            peliculas: '/api/movies',
            archivos: '/api/archivos'
        }

        this.dbConnection()
        this.middlewares()
        this.routes()

    }
    async dbConnection() {
        await db.authenticate()
        await db.sync({})
        console.log('Database Online')
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.Paths.usuarios, require('../router/user'))
        this.app.use(this.Paths.login, require('../router/login'))
        this.app.use(this.Paths.personajes, require('../router/personaje'))
        this.app.use(this.Paths.peliculas, require('../router/pelicula'))
        this.app.use(this.Paths.archivos, require('../router/uploads'))
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`servidor escuchando el puerto ${this.PORT}`)
        })
    }


}

module.exports = Server