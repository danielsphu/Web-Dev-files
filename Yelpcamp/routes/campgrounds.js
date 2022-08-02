const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const ExpressErorr = require("../utils/ExpressError");
const {reviewSchema} = require ("../schemas.js");
const Campground = require("../models/campground");
const {isLoggedIn} = require("../middleware")


router.get('/', catchAsync(async (req,res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
}))

router.get("/new", isLoggedIn, (req,res)=>{
    res.render("campgrounds/new");
})

router.post("/", isLoggedIn, catchAsync (async (req,res, next)=>{
    if(!req.body.campground) throw new ExpressErorr("Invalid Campground Data", 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', "Successfully created a new campground!")
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get("/:id", catchAsync (async (req, res, next)=>{
    const campground = await Campground.findById(req.params.id).populate('reviews');
    console.log(campground);
    if(!campground){
        req.flash('error', "Cannot find that campground!");
        res.redirect("/campgrounds")
    }
    res.render("campgrounds/show", {campground});
}))

router.get('/:id/edit', isLoggedIn, catchAsync(async (req,res, next)=>{
    const campground = await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error', "Cannot find that campground!");
        res.redirect("/campgrounds")
    }
    res.render('campgrounds/edit', {campground});
}))

router.put('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete("/:id", isLoggedIn, catchAsync(async (req,res,next)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted your review!")
    res.redirect('/campgrounds');
}));

module.exports = router;