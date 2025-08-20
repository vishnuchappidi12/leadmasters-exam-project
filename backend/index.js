const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbURI = process.env.MONGO_URI; 

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');

app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}!`));