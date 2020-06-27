// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Author and Book models in order to use them *********
// const Author = require('../models/Author.model');
const FutureTrips = require("../models/FutureTrips.model");

// ****************************************************************************************
// POST - create an FutureTrips (TESTED | WORKS)
// ****************************************************************************************

// <form action="/FutureTrips" method="POST">
router.post("/futuretrips", (req, res) => {
  // console.log(req.body);
  FutureTrips.create(req.body)
    .then((futureTripsDoc) => res.status(200).json(futureTripsDoc))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the futureTrips options (TESTED | WORKS)
// ****************************************************************************************

router.get("/futuretrips", (req, res) => {
  FutureTrips.find()
    .then((futureTripsFromDB) => res.status(200).json(futureTripsFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the futureTrips option (TESTED | WORKS)
// ****************************************************************************************

// <form action="/futureTrips/{{this._id}}/delete" method="post">
router.post("/futuretrips/:futureTripsId/delete", (req, res) => {
  FutureTrips.deleteOne({_id: req.params.futureTripsId})
    .then((dbRes) => res.json({ message: "Successfully deleted!",  dbRes }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the updates (TESTED | WORKS)
// ****************************************************************************************

// <form action="/futureTrips/{{foundfutureTrips._id}}/update" method="POST">
router.post("/futuretrips/:id/update", (req, res) => {
  FutureTrips.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedFutureTrips) => res.status(200).json(updatedFutureTrips))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the FutureTrips details (TESTED | WORKS)
// ****************************************************************************************

router.get("/futuretrips/:someFutureTripsId", (req, res) => {
  FutureTrips.findById(req.params.someFutureTripsId)
    // .populate("author")
    .then((foundFutureTrips) => res.status(200).json(foundFutureTrips))
    .catch((err) => next(err));
});

module.exports = router;
