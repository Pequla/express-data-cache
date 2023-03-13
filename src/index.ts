import express from "express";
import { db } from "./database";
import dotenv from "dotenv";
import axios from "axios";
import { CachedData } from "./model/data.model";

const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.SERVER_PORT;

db.authenticate().then(() => {
    console.log('Connected to database');
    app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.get('/hello', (req, res) => {
    try {
        const cached = CachedData.create({
            id: 1,
            name: 'nikeq',
            uuid: '17933cb0b20f463e966f4d59518a2c7c',
            discordId: '667897322742743040',
            tag: 'finley#0141',
            avatar: 'https://cdn.discordapp.com/avatars/667897322742743040/ed4481fe121922a6aacadf6aab5a4e16.png',
            guildId: '264801645370671114',
            createdAt: new Date('2021-06-29T14:58:14'),
            cachedAt: new Date()
        })
        return res.json(cached);
    } catch (e) {
        res.json({ msg: 'Faild' })
    }
});

app.get('/api/data', async (req, res, next) => {
    try {
        const data = await CachedData.findAll();
        res.json(data);
    } catch (e) {
        next(e)
    }
});

app.get('/api/data/:id', async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id))
        next(new BadRequestException(`${req.params.id} is not a valid number`))

    const data = await CachedData.findOne({ where: { id: id } });
    if (data == null) {
        next(new NotFoundException(`No data found for id ${id}`))
    }
    res.json(data);
});

function BadRequestException(msg: string = 'Bad request') {
    this.status = 400;
    this.message = msg
}

function NotFoundException(msg: string = 'Not found') {
    this.status = 404;
    this.message = msg
}

app.use((err, req, res, next) => {
    return res.status(err.status).json({
        message: err.message,
        timestamp: new Date()
    })
})

