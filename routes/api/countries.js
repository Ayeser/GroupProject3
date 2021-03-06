const router = require("express").Router();
const db = require("../../models");
const Countries = require('../../models/countries');
const mongoose = require("mongoose"); 

// Matches with "/api/countries"
router.get("/", (req, res) => {
  Countries
  .find({})
  .sort({ date: -1 })
  .then(dbModel => res.json(dbModel))
  .catch(err => res.status(422).json(err));
})

// Matches with "/api/countries/:name"
router.get("/specificCountry/:name", (req, res) => {
  db.Countries
      .find( { "name" : req.params.name } )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
})

module.exports = router;
