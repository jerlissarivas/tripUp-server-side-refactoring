// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Author and Book models in order to use them *********
// const Author = require('../models/Author.model');
const TripDetails = require("../models/TripDetails.model");
const Itinerary = require("../models/FutureTrips.model");

// ****************************************************************************************
// POST - create a trip (TESTED | WORKS)
// ****************************************************************************************

// <form action="/trips" method="POST">
router.post("/trips", (req, res, next) => {
  // console.log(req.body);
  TripDetails.create(req.body)
    .then((tripDoc) => res.status(200).json(tripDoc))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the trips (TESTED | WORKS)
// ****************************************************************************************

router.get("/trips", (req, res) => {
  TripDetails.find()
    .then((tripsFromDB) => res.status(200).json(tripsFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the trip (TESTED | WORKS)
// ****************************************************************************************

// <form action="/trips/{{this._id}}/delete" method="post">
router.post("/trips/:tripId/delete", (req, res) => {
  TripDetails.findByIdAndRemove(req.params.tripId)
    .then(() => res.json({ message: "Successfully removed!" }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the updates (TESTED | WORKS)
// ****************************************************************************************

// <form action="/trips/{{foundTrip._id}}/update" method="POST">
router.post("/trips/:id/update", (req, res) => {
  TripDetails.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedTrip) => res.status(200).json(updatedTrip))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the trip details (TESTED | WORKS)
// ****************************************************************************************

router.get("/trips/:someTripId", (req, res) => {
  TripDetails.findById(req.params.someTripId)
    // .populate("author")
    .then((foundTrip) => res.status(200).json(foundTrip))
    .catch((err) => next(err));
});

// router.get("/trips/:someTripId", (req, res, next) => {
//   TripDetails.findById(req.params.someTripId)
//     .then((foundTrip) => {
//       console.log(foundTrip);
//       Itinerary.findById(ObjectId(foundTrip.itinerary))
//         .then((itinerary) => {
//           res.status(200).json(foundTrip);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(`Error while getting contact details from the DB: ${err}`);
//       next(err);
//     });
// });

module.exports = router;
