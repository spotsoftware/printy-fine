var mongoose = require('mongoose');

var finePrintTagSchema = new mongoose.Schema({
    name: String,
    description: String,
    icon: String
});