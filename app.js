const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use((req, res, next) => {
    throw new HttpError("The requested URL was not found on this server.", 404);
});

//mandatory middleware to handle the error
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }

    res.status(error.code || 500);
    res.json({message: error.message} || "An unknown error occured!");
});

mongoose
    .connect("mongodb+srv://ksukhwani:rX38DHqXieXx1avD@cluster0.lmhzv.mongodb.net/shared-places?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    })

