import express, { response } from "express";
import { connect } from "mongoose";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);
await client.connect()
console.log("mongoDB is connected");

// gatting the room database
app.get('/room', async (request, response) => {
    const room = await client.db('hallBooking').collection('room').find({}).toArray();
    response.send(room);
})

// posting the room database
app.post('/room', async (request, response) => {
    const data = request.body;
    console.log(data);
    const result = await client.db('hallBooking').collection('room').insertMany(data);
    response.send(result);
})

// gatting the room booking data;
app.get('/bookingRoom', async (request, response) => {
    const roomBook = await client.db('hallBooking').collection('bookingRoom').find({}).toArray();
    response.send(roomBook);
})

// posting the room database
app.post('/bookingRoom', async (request, response) => {
    const bookingRoom = request.body;
    console.log(bookingRoom);
    const bookedRoom = await client.db('hallBooking').collection('bookingRoom').insertMany(bookingRoom);
    response.send(bookedRoom);
})

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
 