const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const schemaModule = require('./schema.js');
const path = require('path');
const schema = schemaModule.metricsschema;
const dataschema = schemaModule.dataschema;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname,'dashboardui/build')));
connectDB();



const metricsmodel = mongoose.model('datafiles', schema);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dashboardui", "build", "index.html"));
});

app.get('/metrics' , (req, res) => {
    console.log("request came bitches")
    metricsmodel.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/:id' , (req, res) => {
    var collectionname = 'collection '  + req.originalUrl.substring(1);
    const datamodel = mongoose.model(collectionname, dataschema)
    datamodel.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`[Done] : Server running on port ${port}`));