
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require('helmet');
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.hidePoweredBy('PHP 4.2.0'));

app.use('/api', require('./routes/index'))

// get driver connection
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to Mongo 2023")
}

app.listen(port, () => {

  console.log(`Server is running on port: ${port}`);
});
