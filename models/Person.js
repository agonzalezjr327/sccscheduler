const mongoose = require("mongoose");
const async = require("async");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");


/**
 * Person Model
 * ==========
 */
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please fill out name"]
  },
  adc: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 6,
    unique: true,
    required: [true, "Please fill out adc"]
  },
  bedSpace: {
    type: String,
    trim: true,
  },
  dob: {
    type: String,
    trim: true,
  },
  arrivalDate: {
    type: Date,
    trim: true,
    default: () => Date.now(),
  },
  isActive: {
    type: Boolean,
    trim: true,
    default: true
  },
  isGraduated: {
    type: Boolean,
    trim: true,
    default: false
  },
  isRSS: {
    type: Boolean,
    trim: true,
    default: false
  },
  releaseDate: {
    type: String,
    trim: true,
  },
  graduationDate: {
    type: String,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
  class: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classes",
    index: true
  }],
  race: {
    type: String,
    trim: true,
  },
  trade: {
    type: String,
    trim: true,
    default: 'None'
  },
  ssn: {
    type: String,
    trim: true,
  },
  desTeam: {
    type: String,
    trim: true,
  },
  cityReleasingTo: {
    type: String,
    trim: true,
  },
  placeReleasingTo: {
    type: String,
    trim: true,
  },
  jobField: {
    type: String,
    trim: true,
  },
  orientation: {
    type: Boolean,
    trim: true,
    default: true
  },
  courtfines: {
    type: Boolean,
    trim: true,
    default: false
  },
  veteran: {
    type: Boolean,
    trim: true,
    default: false
  },
  wioa: {
    type: Boolean,
    trim: true,
    default: false
  },
  isRemoved: {
    type: Boolean,
    trim: true,
    default: false
  },
  hasActiveLicense: {
    type: Boolean,
    trim: true,
    default: false
  },
  hasChildSupport: {
    type: Boolean,
    trim: true,
    default: false
  },
  enrollForensicPeerSupport: {
    type: Boolean,
    trim: true,
    default: false
  }
});

// creates a new person
PersonSchema.methods.createPerson = async function (name, adc, bedSpace, releaseDate, rss, trade) {
  const person = await Person.create({
    name: name,
    adc: adc,
    bedSpace: bedSpace,
    releaseDate: releaseDate,
    isRSS: rss,
    trade: trade
  })
  return person.name
};

// update a person's information
PersonSchema.methods.updatePerson = async function (id, name, adc, bedSpace, releaseDate, trade, cityReleasingTo, courtfines, veteran, wioa, desTeam, ssn, placeReleasingTo, note, isActive, dob, isGraduated, isRemoved, hasActiveLicense, hasChildSupport, enrollForensicPeerSupport, jobField, arrivalDate) {
  await Person.findOne({ _id: id }).then(user => {
    user.isRemoved = isRemoved;
    user.name = name;
    user.adc = adc;
    user.bedSpace = bedSpace;
    user.releaseDate = releaseDate;
    user.trade = trade;
    user.cityReleasingTo = cityReleasingTo;
    user.courtfines = courtfines;
    user.veteran = veteran;
    user.wioa = wioa;
    user.desTeam = desTeam;
    user.ssn = ssn;
    user.placeReleasingTo = placeReleasingTo;
    user.note = note;
    user.isActive = isActive;
    user.dob = dob;
    user.isGraduated = isGraduated;
    user.hasActiveLicense = hasActiveLicense;
    user.hasChildSupport = hasChildSupport;
    user.enrollForensicPeerSupport = enrollForensicPeerSupport;
    user.jobField = jobField;
    user.arrivalDate = arrivalDate
    user.save();
  }).catch(err => console.log(err))
};

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
