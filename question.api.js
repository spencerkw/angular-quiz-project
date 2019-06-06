"use strict";
const express = require("express");
const router = express.Router();
const pool = require("./connection");

router.get("", (req, res) => {
  pool.query("SELECT * FROM questions ORDER BY RANDOM() LIMIT 10").then(result => {
    res.json(result.rows);
  });
});

module.exports = router;