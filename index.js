const express = require('express');
const cors = require('cors');
const Sefaz = require('./src/Sefaz');

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', Sefaz.index);

app.listen(3333);