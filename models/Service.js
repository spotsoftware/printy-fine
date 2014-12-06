var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    url: String,
    finePrints: Array,
    owner: String
});

module.exports = mongoose.model('Service', serviceSchema);