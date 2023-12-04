const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const { init } = require('./conections/mongodb');
const router = require('./routes/index');
const http = require('http');
const https = require('https');
const handler = require('./middleware/errorHandler');

class App {
    constructor() {
        this.app = express();

        Promise.all([
            this.connectDatabase(),
            this.initializeMiddleware(),
            this.initializeController(),
            this.initializeErrorHandling(),
        ]).then(() => {
            this.listen();
        })
    }

    async connectDatabase() {
        await init();
    }

    async initializeMiddleware() {
        this.app.use(bodyParser.json({ limit: '50MB' }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan('tiny'));
    }

    async initializeController() {
        this.app.use('/', router);
    }

    async initializeErrorHandling() {
        this.app.use(handler);
    }

    async listen() {
        let server = http.createServer(this.app);
        if (process.env.KEY || process.env.CERT) {
            const HTTP_KEY = process.env.KEY;
            const HTTP_CERT = process.env.CERT;
            const KEY = fs.readFileSync(HTTP_KEY);
            const CERT = fs.readFileSync(HTTP_CERT);
            server = https.createServer({ key: KEY, cert: CERT }, this.app);
        }

        server.listen(3001, () => {
            console.log('server listening on 3000');
        });
    }
}

try {
    new App();
} catch (error) {
    console.log("Error in project startup::", error);
}