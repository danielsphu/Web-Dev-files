const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const ExpressErorr = require("../utils/ExpressError");
const {reviewSchema} = require ("../schemas.js");
const Campground = require("../models/campground");
const {isLoggedIn, isAuthor} = require("../middleware")
const campgrounds = require("../controllers/campgrounds")

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, catchAsync (campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync (campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditCampground))

module.exports = router;