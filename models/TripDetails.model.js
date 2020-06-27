const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tripDetailsSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    tripName: String,
    tripType: String, // create an enum to give options for vacation, business, personal, etc
    location: String, // how to incorporate google to add a location
    dates: String, // how to incorporate calendar to plan date frame
    travelType: { type: String, enum: ["Flight", "Train", "Drive", "Other"] },
    notes: String,
  },
  {
    // keeps record when is created and updated
    timestamps: true,
  }
);

module.exports = model("TripDetails", tripDetailsSchema);
