var mongoose = require('mongoose');

var finePrintSchema = new mongoose.Schema({
    name: String,
    description: String,
    kind: String,
    finePrintTags: Array,
});