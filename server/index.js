const express = require('express');
const mongoose = require('./configue/index')
const cors = require('cors');
const route = require('./router/curd')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use('/', route)
app.use('/',route)
app.use('/',route)
app.use('/',route)
app.use('/',route)
app.use('/',route)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
