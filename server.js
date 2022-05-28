"use strict";
// get the packages we need
const express = require("express"), //use to define framework
  app = express(), //taking express object for whole project
  cors = require("cors"),
  route = require("./route/route");
const { CommonHelper } = require("./util/common-helper");
/*
 ===============   LANGUAGE    =================
 1.Define unique Key - pair in Locales / Messsages.js
 2.It will add entry in respective json files
 3.By default language is set to english User can change by passing language in
  Header : Accept-Language : 'en'
  Query : url?lang=en
*/
const language = require("i18n");
language.configure({
  locales: ["en", "fr"],
  defaultLocale: "en",
  autoReload: true,
  directory: __dirname + "/locales",
  queryParameter: "lang",
  objectNotation: true,
  syncFiles: true,
});
app.use(language.init); // MULTILINGUAL SETUP
//intialized databse connection
CommonHelper.createSqlPoolConnection().catch((err) => {
  console.log("error", err);
});
// ====================================
// Route need to allow cross origin
// ====================================
app.use(cors({ origin: "*", credentials: true }));
// app.use(cors())

// use body parser so we can get info from POST and/or URL parameters
app.use(
  express.urlencoded({
    parameterLimit: 100000,
    limit: "500mb",
    extended: true,
  }),
);

//enabling bodyparser to accept json also

// app.use(
//   express.json({
//     limit: "500mb",
//     type: "application/json",
//     extended: true,
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     },
//   }),
// );

//adding route for home page
app.get("/", (req, res) => {
  res.send(
    "<center><h2><b>Hi, This is Cozzini Service.<br><i> How can i help you ;)</i></b></h2></center>",
  );
});

app.use("/api/v1/", route);

module.exports = app;
