const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: String, required: true }
});

module.exports = mongoose.model('Place', placeSchema);
//Place is model name then mongoose will create collection in mongoDB and 
//collection name is plural of the model name: places
