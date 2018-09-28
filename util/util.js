var fs = require('fs');

// readCountryData
// Reads a local file based on the given country
exports.readCountryData = function(country = 'mexico'){
    var uri = "json/"+country+".json";
    console.log("reading file "+uri);
    var content = fs.readFileSync(uri);
    var json;
    try{
        json = JSON.parse(content);
    }catch(e){
        json = null;
        console.log("ERROR Reading file: %s",e);
    }
    
    if( json && json.position!= '' ){
        return json;
    }
    return null;
};

// writeCountryData
// writes json file for the given country and json object
exports.writeCountryData = function(country='mexico',json){
    
    let uri = 'json/'+country+'.json'
    fs.writeFile(uri, JSON.stringify(json, null, 4), function(err){
        if(err != null){
            console.log("Error writting file "+uri);
        }else{
            console.log('File successfully written! - Check your project directory for the %s.json file',country);
        }
    })
};
