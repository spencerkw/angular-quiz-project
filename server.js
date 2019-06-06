"use strict";
const express = require("express");
const app = express();
const questionRoutes = require("./question.api");
const scoresRoutes = require("./scores.api");
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use("/questions", questionRoutes);
app.use("/scores", scoresRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));