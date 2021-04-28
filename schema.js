const express = require('express');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id : 'string',
    measure : 'string',
    dimensions : []
});

const dataschema = new mongoose.Schema({
    original_value : 'Decimal128',
    forecasted_value : 'Decimal128',
    min_band : 'Decimal128',
    max_band : 'Decimal128',
    line_status : 'Number',
    timestamp : 'Date'
});

exports.metricsschema = schema;
exports.dataschema = dataschema;