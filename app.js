const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('express').Router();
const schemaModule = require('./schema.js');
const path = require('path');
const schema = schemaModule.metricsschema;
const dataschema = schemaModule.dataschema;

const app = express();
app.use(cors())
app.use(router)
connectDB();
app.use(express.static('client/build'));
app.get('/', (req, res) => res.send((__dirname+'../dashboardui/build/index.html')));
console.log(__dirname)
const metricsmodel = mongoose.model('datafiles', schema);

app.get('/metrics' , (req, res) => {
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

// router.use(function(req, res) {
//     console.log('/dashboardui/build/index.html')
// 	res.sendFile('/dashboardui/build/index.html');
// });

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`[Done] : Server running on port ${port}`));