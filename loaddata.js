const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const fs = require('fs');
const schemaModule = require('./schema.js');
const schema = schemaModule.metricsschema;
const dataschema = schemaModule.dataschema;

const app = express();

connectDB();

const apikey = "666a7bd1-5be8-459d-8888-fb00afa55d31"

app.get('/', (req, res) => res.send('Hello second world!'));

const port = process.env.PORT || 8083;

app.listen(port, () => console.log(`[Done] : Server running on port ${port}`));

var jsondata = {}



const meta = mongoose.model('Datafile', schema);

fs.readFile('../assignment_data/metrics.json', (err, data) => {
    if (err) throw err;
    jsondata = JSON.parse(data);
    meta.insertMany(jsondata).then(function(){
        console.log("[Done] : Metrices data inserted in mongodb");
    }).catch(function(err){
        console.log(err);
    })

    jsondata.forEach(function(mdata){
        var filename = mdata._id;
        console.log(filename);
        const datamodel = mongoose.model('collection '+filename, dataschema);
        fs.readFile('../assignment_data/'+filename+'.json', (err,data) => {
            if(err) throw err;
            filedata = JSON.parse(data);
            datamodel.insertMany(filedata).then(function(){
                console.log("[Done] : Inserted data in Collection "+filename)
            }).catch(function(err){
                console.log(err);
            })
        })
    })
});








