import express from 'express';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb'

const app = express()
const port = 3001

app.use(cors())

const mongoURI = "mongodb+srv://admin:euNLxsrAMIPVfiqk@chess-battle.ymz2lx5.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.get('/', (request, response) => {
    response.send('Connected.')
})

app.get('/card', async (request, response) => {
    // Get all pawns.
    // TODO: We should know how many there are, determine which
    // one we want beforehand, then query for just that one pawn,
    // to speed up querying.
    await mongoClient.connect()
    const pawnCollection = mongoClient.db("chess-battle").collection("pawns");
    const pawnsCursor = pawnCollection.find({});
    const pawns = await pawnsCursor.toArray();
    await mongoClient.close();

    // Get random pawn
    const pawnIndex = getRandomInt(pawns.length);
    response.send(pawns[pawnIndex]);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})