// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Author and Book models in order to use them *********
// const Author = require('../models/Author.model');
const TravelDetails = require("../models/TravelDetails.model");

// ****************************************************************************************
// POST - create a travel option (TESTED | WORKS)
// ****************************************************************************************

// <form action="/travel" method="POST">
router.post("/travel", (req, res) => {
  // console.log(req.body);
  TravelDetails.create(req.body)
    .then((travelDoc) => res.status(200).json(travelDoc))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the travel options (TESTED | WORKS)
// ****************************************************************************************

router.get("/travel", (req, res) => {
  TravelDetails.find()
    .then((travelFromDB) => res.status(200).json(travelFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the travel option (TESTED | WORKS)
// ****************************************************************************************

// <form action="/travel/{{this._id}}/delete" method="post">
router.post("/travel/:travelId/delete", (req, res) => {
  TravelDetails.findByIdAndRemove(req.params.travelId)
    .then(() => res.json({ message: "Successfully removed!" }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the updates (TESTED | WORKS)
// ****************************************************************************************

// <form action="/travel/{{foundTravel._id}}/update" method="POST">
router.post("/travel/:id/update", (req, res) => {
  TravelDetails.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedTravel) => res.status(200).json(updatedTravel))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the travel details (TESTED | WORKS)
// ****************************************************************************************

router.get("/travel/:someTravelId", (req, res) => {
  TravelDetails.findById(req.params.someTravelId)
    // .populate("author")
    .then((foundTravel) => res.status(200).json(foundTravel))
    .catch((err) => next(err));
});

module.exports = router;
