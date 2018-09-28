var express = require('express');
var response = require('../models/Response');

var public = express.Router();

/* GET home page for app. */
public.get('/', function(req, res, next) {
  res.send(response.SuccessResponse(null,"Public area Available"));
  });

//  Return a list of allowed countries for the app
public.get('/countries',function(req,res,next){
  let countries = [
    {value: 'mexico', viewValue: 'Mexico'},
    {value: 'spain', viewValue: 'Spain'},
    {value: 'united-states', viewValue: 'United States'}
  ];
  res.status(200);
  res.send(response.SuccessResponse(countries,"Countries found",202));
});

module.exports = public