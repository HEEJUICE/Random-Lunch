const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/Person");

const router = express.Router();

// /api/people
// find all ppl
router.get("/people", async (req, res) => {
  try {
    const people = await Person.find();
    return res.status(200).json(people);
  } catch (error) {
    // console.error(error)
    return res.status(400).send(`Error: ${error}`);
  }
});
