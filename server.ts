import express from 'express';
import cors from 'cors';
import sqlite3 from "sqlite3";
import { Server } from 'socket.io';
import { createServer } from 'http';
import { MongoClient } from 'mongodb'
import { createApi } from 'unsplash-js';
import { MongoURI, UnsplashAccessKey } from './chess-battle.config.js'

const app = express()
const port = 3001

app.use(cors())

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
});

const mongoURI = MongoURI;
const mongoClient = new MongoClient(mongoURI);

const sqlite = new sqlite3.Database('./src/db.sql', (err) => {
	if (err) {
		console.error(err.message);
	} else {
    console.log("Connected to SQLite db.");
  }
});

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


/**
 * SOCKET.IO
 */

io.on("connection", (socket) => {
  console.log("Connected to Socket.IO.");

  socket.on("draw-card", (card) => {
    socket.emit("draw-card", card);
  });
});


/**
 * HTTP ROUTES
 */

app.get('/', (request, response) => {
    response.send('Connected.')
})

app.get('/cards', async (request, response) => {
	sqlite.all("SELECT * FROM cards", [], (err, rows) => {
		if (err) {
			response.status(500).send(err.message);
		}

		response.send(rows);
	});
})

app.get('/card', async (request, response) => {
    // Get all pawns.
    // TODO: We should know how many there are, determine which
    // one we want beforehand, then query for just that one pawn,
    // to speed up querying.
    try {
        await mongoClient.connect()
        const pawnCollection = mongoClient.db("chess-battle").collection("pawns");
        const pawnsCursor = pawnCollection.find({});
        const pawns = await pawnsCursor.toArray();
        await mongoClient.close();

        // Get random pawn
        const pawnIndex = getRandomInt(pawns.length);
		    response.send(pawns[pawnIndex]);
    } catch (error) {
        console.error(error);
        response.send(undefined);
    }
})

app.get('/cardPhotoUrl/:cardPhotoId', async (request, response) => {
    const cardPhotoId = request.params.cardPhotoId;
    console.log(`cardPhotoId: ${cardPhotoId}`)
    const unsplash = createApi({
        accessKey: UnsplashAccessKey
    });

    const unsplashResponse = await unsplash.photos.get({ photoId: cardPhotoId });
    const cardPhotoUrl = unsplashResponse.response?.urls.regular;
    console.log(`cardPhotoUrl: ${cardPhotoUrl}`);

    response.send({'url': cardPhotoUrl});
})

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
})

export default app;
