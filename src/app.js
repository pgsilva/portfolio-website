import Express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as dotenv from 'dotenv'

import { router } from './in/www.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

export default class Server {

    constructor() {
        this.server = Express()
    }

    run() {
        this.middlewares()
        this.routes()

        const port = process.env.SERVER_PORT
        this.server.listen(port, () => {
            console.log(`${Date(Date.now())} Node server started in port: ${port}`)
        })
    }

    middlewares() {
        const logger = (req, res, next) => {
            req.logger = new Date().toISOString();
            console.log("[INFO] Requested at: " + req.logger)

            next()
        }

        this.server.use(Express.json())
        this.server.use(Express.urlencoded({ limit: '50mb', extended: true }))
        this.server.use(cors())
        this.server.use(morgan('dev'))
        this.server.use(logger)

        //EJS middlewares
        this.server.set('views', './src/views')
        this.server.set('js', './src/views/js')
        this.server.set('view engine', 'ejs') // Setamos que nossa engine será o ejs
        console.log(dirname(fileURLToPath(import.meta.url)) + '/views')
        this.server.use(Express.static(dirname(fileURLToPath(import.meta.url)) + '/views'))
        

    }

    routes() {
        this.server.use("/", router)

        this.server.get("/isAlive", (req, res, next) => {
            console.log('[INFO] Request receive to health check')
            res.json({
                status: "I'm alive",
                msg: "With great power comes great responsibility",
                port: process.env.SERVER_PORT,
                you: req.clientIp
            })
        })
    }
}

new Server().run()