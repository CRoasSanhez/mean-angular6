var express = require('express');

var cheerio = require('cheerio');
var request = require('request');
var util = require('../util/util');

var pages = express.Router();

/* GET home page for api */
pages.get('/', function(req, res, next) {
  var data = util.readCountryData('mexico');
  if( data ){
    console.log("File found");
    res.status(200);
    res.send(data);
  }
  var pages = [];
  res.send(pages);
});

pages.get('/scrapp/facebook/top/:country',function(req,res,next){
  var country = req.params.country || 'mexico';
  var url = 'https://www.socialbakers.com/statistics/facebook/pages/total/'+country;
  
  // Check if information already exists
  var data = util.readCountryData(country);
  if( data ){
    console.log("File found");
    res.status(200);
    res.send(data);
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

            // iterating through tr elements in table
            /*
            $('.brand-table-list tr').each(function(idx,elem){
              var that = $(this);
                // get page position
                page.position = that.find(".item-count").text().trim();

                // Get page name
                page.pageName = that.find(".show-name").text().trim();

                // Get page total count
                page.pageTotal = that.find("strong").text().trim();


                //topPages.push(page);
            });
            */

            // updates/insert country json
            util.writeCountryData(country,topPages);

            res.status(200);
            res.send(topPages);
            
        }else{
          res.status(500);
          res.send(error);
        }
      });
    }
});

module.exports = pages;

