const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Place = require("../models/place");

const getPlaceById = async (req, res, next) => {
    //get place id from the routes
    const placeId = req.params.pid;

    //get place information from the MongoDB
    let placeInfo;
    try{
        placeInfo = await Place.findById(placeId);
    }catch(err){
        return next(new HttpError("Something went wrong, Could not find the place.", 500));
    }

    //display error messgae if place is not available with the given place id
    if(!placeInfo){
        return next(new HttpError("Could not find the place for the provided place id.", 404));
    }

    //send response to the Front End (UI) - convert this response to getter method
    res.json({place: placeInfo.toObject({ getters: true})});
}

const createPlace = async (req, res, next) => {
    //check all validations 
    const errors = validationResult(req);

    //display error message if data is invalid
    if(!errors.isEmpty()){
        console.log(errors);
        const error = new HttpError("Invalid Input, Please enter correct data!", 400);
        return next(error);
    }

    //get data from request body
    const { title, address, description, creator } = req.body;

    //create object of Place model
    const newPlace = new Place({
        title, address, description, creator
    }); 

    //code to insert data into the MongoDB
    try{
        await newPlace.save();
    }catch(err){
        const error = new HttpError("Creating place failed, please try again later!", 500);
        return next(error);
    }

    //send response to the user : send newPlace to the user
    res.status(201).json({place: newPlace.toObject({ getters : true })});
};

exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;