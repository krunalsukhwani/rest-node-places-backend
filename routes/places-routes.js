const express = require("express");
const { check } = require("express-validator");
const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router.post("/"
        ,[
            check("title").notEmpty(),
            check("address").notEmpty(),
            check("creator").notEmpty(),
            check("description").isLength({min:5})
        ],
        placesControllers.createPlace);

module.exports = router;