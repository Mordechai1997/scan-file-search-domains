require('dotenv').config();
const express = require('express')
const cors = require('cors');
const dataRoute = require('./routers/data.js');

const path = require('path');
const app = express();

app.use(express.json());
app.use(cors())
app.use(dataRoute);

app.use(express.urlencoded({ extended: true }));

var dir = path.join(__dirname, 'uploads');
app.use(express.static(dir));




app.listen(process.env.PORT, function () {
    console.log(`server listening on port ${process.env.PORT}`)
})

