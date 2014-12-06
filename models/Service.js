var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
    finePrints: Array
});