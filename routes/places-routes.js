const express = require("express");
const { check } = require("express-validator");
const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placesControllers.getPlaceById);

router.post("/"
        ,[
            check("title").notEmpty(),
            check("address").notEmpty(),
            check("creator").notEmpty(),
            check("description").isLength({min:5})
        ],
        placesControllers.createPlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;