var Service = require('../models/Service');
var User = require('../models/User');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var Y = require('yui/yql');
var _ = require('lodash');

/**
* GET /aggregator/:userId/services
* Get Services the user is registered to.
*/

exports.getAggregatedServices = function (req, res) {
  User.findOne(req.params.userId, function (err, user) {
    if (err) return next(err);

    res.render('aggregator/services', {
      title: 'My services',
      services: user.services
    });
  });
};

/**
* GET /aggregator/:userId/tags
* Get Tags the user accepted registering himself on the various services.
*/

exports.getAggregatedTags = function (req, res) {

  res.render('aggregator/tags', {
    title: 'My tags',
    tags: new Array()
  });
};
