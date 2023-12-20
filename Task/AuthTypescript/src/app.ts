import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { init } from './connections/mongodb'
import router from './routes/index'
import http from 'http'
import https from 'https'
import fs from 'fs'
import handler from './middleware/errorHandler'

class App {
    public app: express.Application;
    constructor() {
        this.app = express()

        Promise.all([
            this.connectDatabase(),
            this.initializeMiddleware(),
            this.initializeController(),
            this.initializeErrorHandling(),
        ]).then(() => {
            this.listen()
        })
    }

    private async connectDatabase() {
        await init()
    }

    private async initializeMiddleware() {
        this.app.use(bodyParser.json({ limit: "50MB" })),
            this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors()),
            this.app.use(morgan("tiny"))
    }

    private async initializeController() {
        this.app.use("/", router)
    }

    private async initializeErrorHandling() {
        this.app.use(handler)
    }

    public async listen() {
        let server = http.createServer(this.app)
        if (process.env.KEY || process.env.CERT) {
            const HTTP_KEY: any = process.env.KEY;
            const HTTP_CERT: any = process.env.CERT;
            const KEY: any = fs.readFileSync(HTTP_KEY)
            const CERT: any = fs.readFileSync(HTTP_CERT)
            server = https.createServer({ key: KEY, cert: CERT }, this.app)
        }

        server.listen(3000, () => {
            console.log(`server listening on 3000`);
        })
    }

}

try {
    new App()
} catch (error: any) {
    console.log("Error in project startup", error.message);
}

export default App;