const dotenv = require('dotenv');
const express = require('express');
const auth = require('./rout/auth');
const loger = require('./midileware/loger');
const connectDB = require('./config/db');
dotenv.config({path:'./config/config.env'});
const errorHandler = require('./midileware/error');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/v1/auth',auth);
app.use(errorHandler);
app.use(loger);

const PORT = process.env.PORT || 4000;
app.listen(PORT,console.log('server running'));