const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const cors = require('cors');
const schemaModule = require('./schema.js');
const schema = schemaModule.metricsschema;
const dataschema = schemaModule.dataschema;

const app = express();
app.use(cors())
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

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

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`[Done] : Server running on port ${port}`));