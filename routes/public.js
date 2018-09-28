var express = require('express');

var public = express.Router();

/* GET home page for app. */
public.get('/', function(req, res, next) {
    res.send('scrapp app');
  });

//  Return a list of allowed countries for the app
public.get('/countries',function(req,res,next){
  let countries = [
    {value: 'mexico', viewValue: 'Mexico'},
    {value: 'spain', viewValue: 'Spain'},
    {value: 'united-states', viewValue: 'United States'}
  ];
  res.status(200);
  res.send(countries);
});

module.exports = public