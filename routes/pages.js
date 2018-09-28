var express = require('express');

var cheerio = require('cheerio');
var request = require('request');
var util = require('../util/util');
var response = require('../models/Response');

var pages = express.Router();

/* GET home page for api */
pages.get('/', function(req, res, next) {
  var data = util.readCountryData('mexico');
  if( data ){
    // Set http status
    res.status(201);

    // sends an api response
    res.send(response.SuccessResponse(data,"Countries found",201));
  }
  data = [];

  res.status(200);
  // Sends an api response
  res.send(response.SuccessResponse(data,"Api available"));
});

pages.get('/scrapp/facebook/top/:country',function(req,res,next){
  var country = req.params.country || 'mexico';
  var url = 'https://www.socialbakers.com/statistics/facebook/pages/total/'+country;
  
  // Check if pages information already exists
  var data = util.readCountryData(country);
  if( data ){
    res.status(200);
    res.send(response.SuccessResponse(data,"Pages found"));
  }
  else{
    // request for information if doesn't exists
      request(url, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);
            var topPages = [], page={};

            // Iterate through "position" elements in table
            $('.item.item-count').each(function(){
                var that = $(this);
                topPages.push({
                  position:that.text().trim(), 
                  pageName: "",
                  pageTotal: ""
                });
            });

            // Iterate through "names" elements in table
            $('.brand-table-list__heading .show-name').each(function(idx,elem){
                var that = $(this);
                if(topPages[idx])
                  topPages[idx].pageName = that.text().trim()
            });

            // Iterate through "total count" elements in table
            $('.table-pie-name-mobile').siblings("strong").each(function(idx,elem){
                var that = $(this);
                topPages[idx].pageTotal = that.text().trim()
            });

            // updates/insert country json
            util.writeCountryData(country,topPages);

            res.status(200);
            res.send(response.SuccessResponse(topPages,"Scrapper Pages found",201));
            
        }else{
          res.status(500);
          res.send(response.InternalError(500));
        }
      });
    }
});

module.exports = pages;

