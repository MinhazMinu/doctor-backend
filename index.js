const express = require("express");
const cors = require("cors");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(BodyParser.json());
const uri =
  "mongodb+srv://dbUser:Dark@0011@cluster0-37ztz.mongodb.net/test?retryWrites=true&w=majority";
let client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("https://doctor-backend.herokuapp.com/", (req, res) =>
  res.send("Welcome to Doctors Portal  Backed")
);

app.get("https://doctor-backend.herokuapp.com/appointments", (req, res) => {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((conErr) => {
    const collection = client.db("doctorsPortal").collection("appointments");
    collection.find().toArray((err, documents) => {
      err ? res.status(500).send(err) : res.send(documents);
    });
  });
  client.close();
});

app.get(
  "https://doctor-backend.herokuapp.com/bookedAppointments",
  (req, res) => {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    client.connect((conErr) => {
      const collection = client
        .db("doctorsPortal")
        .collection("bookedAppointments");
      collection.find().toArray((err, documents) => {
        err ? res.status(500).send(err) : res.send(documents);
      });
    });
    client.close();
  }
);

app.post("https://doctor-backend.herokuapp.com/makeBooking", (req, res) => {
  const data = req.body;
  console.log(data);
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((conErr) => {
    console.log(conErr);
    const collection = client
      .db("doctorsPortal")
      .collection("bookedAppointments");
    collection.insertOne(data, (err, result) => {
      err ? res.status(500).send({ message: err }) : res.send(result.ops[0]);
      console.log(err);
    });
  });
  client.close();
});

const port = process.env.PORT || 3200;
app.listen(port, (err) =>
  err
    ? console.log("Filed to Listen on Port", port)
    : console.log("Listing for Port", port)
);
