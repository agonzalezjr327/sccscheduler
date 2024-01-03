const router = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const Person = require("../../models/Person");
const async = require('async');

// @ Route    POST /person/signin
// @ Desc     lets a user log in 
// @ Access   Public
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Please fill out all fields", isAuth: false });
  if (email !== 'admin@admin' || password !== 'admin')
    return res.status(400).json({ msg: 'Incorrect password or email' });
  jwt.sign(
    { id: 1234 },
    config.get("jwtSecret"),
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        isAuth: true,
        msg: `Admin has successfully logged in`,
      })
    }
  )
});

// @ Route    GET api/person/students
// @ Desc     gets all the students info
// @ Access   Public
router.get("/students", (req, res) => {
  Person.find()
    .populate('class')
    .lean(true)
    .then((students) => {
      if (!students) return res.json({ msg: 'no students' });
      return res.json({ students });
    }).catch(err => console.log(err))
});

// @ Route    POST api/person/update
// @ Desc     lets the user update student's info
// @ Access   Private
router.post("/updatestudent", (req, res) => {
  const { id, name, adc, bedSpace, releaseDate, trade, cityReleasingTo, courtfines, veteran, wioa, desTeam, ssn, placeReleasingTo, note, isActive, dob, isGraduated, isRemoved, hasActiveLicense, hasChildSupport, enrollForensicPeerSupport, jobField, arrivalDate } = req.body;
  if (name === '' && adc === '' && bedSpace === '' && releaseDate === '')
    return res.json({ msg: "Please fill out fields" });
  Person.findById({ _id: id })
    .then((user) => {
        if (!user) res.json({msg: 'user does not exist'})
        Person.schema.methods.updatePerson(id, name, adc, bedSpace, releaseDate, trade, cityReleasingTo, courtfines, veteran, wioa, desTeam, ssn, placeReleasingTo, note, isActive, dob, isGraduated, isRemoved, hasActiveLicense, hasChildSupport, enrollForensicPeerSupport, jobField, arrivalDate)
        .then((student) => {
          res.json({
            msg: `${name} has been successfully updated`,
          });
        }).catch((err) => console.log(err));
    }).catch((err) => res.json({ msg: err }));
});

// @ Route    POST /api/person/createStudent
// @ Desc     creates student to second chance center 
router.post("/createstudent", (req, res) => {
  const { name, adc, bedSpace, releaseDate, rss, trade } = req.body;
  if (!name || !adc || !bedSpace || !releaseDate)
    return res.json({
      msg: "Please fill in all fields"
    });

  Person.findOne({ adc: adc })
    .then((user) => {
      if (user) return res.json({ msg: `${user.name} is Already Registered` });
      Person.schema.methods.createPerson(name, adc, bedSpace, releaseDate, rss, trade)
        .then((person) => {
          res.json({
            msg: `${person} has been added to SCC`,
          });
        }).catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// @ Route    POST api/person/removerss
// @ Desc     remove person from rss list
// @ Access   Public
router.post('/removerss', (req, res) => {
  const { id } = req.body;
  Person.findById({ _id: id })
    .then((user) => {
      user.isRSS = false;
      user.save().then((user) => {
        res.json({
          msg: `${user.name} has been removed from RSS`,
        });
      }).catch(err => res.json({ msg: err }));

    }).catch((err) => res.json({ msg: err }));
});

module.exports = router;