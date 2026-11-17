require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todoapp';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(' MongoDB connecté');
    app.listen(PORT, () => console.log(` Serveur sur http://localhost:${PORT}`));
  })
  .catch((err) => console.error(' Erreur Mongo :', err));