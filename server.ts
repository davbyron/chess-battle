import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb'
import { createApi } from 'unsplash-js';
import { MongoURI, UnsplashAccessKey } from './chess-battle.config.js'

const app = express()
const port = 3001

app.use(cors())

const mongoURI = MongoURI;
const mongoClient = new MongoClient(mongoURI);

function getRandomInt(max: number) {
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

app.get('/cardPhotoUrl/:cardPhotoId', async (request, response) => {
    const cardPhotoId = request.params.cardPhotoId;
    console.log(`cardPhotoId: ${cardPhotoId}`)
    const unsplash = createApi({
        accessKey: UnsplashAccessKey
    });

    const unsplashResponse = await unsplash.photos.get({ photoId: cardPhotoId });
    const cardPhotoUrl = unsplashResponse.response.urls.regular;
    console.log(`cardPhotoUrl: ${cardPhotoUrl}`);

    response.send({'url': cardPhotoUrl});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
