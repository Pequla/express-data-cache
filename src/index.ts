import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { notFoundResponse, retrieveIdFromPath, sendError } from "./utils";
import { AppDataSource } from "./db";
import { DataService } from "./services/data.service";

const app = express();
app.use(express.json());

// Reading env variables
dotenv.config();
const port = Number(process.env.SERVER_PORT);

// Connect to database
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database');
        app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
    })
    .catch((error) => console.log(error))

app.get('/api/data', async (req, res) => {
    try {
        const search = req.query.search as string ?? ''
        res.json(await DataService.getData(search))
    } catch (e) {
        sendError(res, e)
    }
})

app.get('/api/data/:id', async (req, res) => {
    try {
        const id = retrieveIdFromPath(req)
        res.json(await DataService.getDataById(id))
    } catch (e) {
        sendError(res, e)
    }
})

app.get('*', function (req, res) {
    notFoundResponse(res)
});

