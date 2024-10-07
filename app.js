const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

mongoose
    .connect("mongodb+srv://ksukhwani:rX38DHqXieXx1avD@cluster0.lmhzv.mongodb.net/shared-places?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })

