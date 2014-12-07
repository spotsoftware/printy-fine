var Service = require('../models/Service');
var User = require('../models/User');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var Y = require('yui/yql');
var _ = require('lodash');

/**
 * GET /account/services
 * List of Services for current User
 */

exports.getUserServices = function (req, res) {

    var finePrintTags = [{
            name: 'Privacy',
            description: 'we have lost it !!!',
            icon: 'http://loremicon.com/i/flat/64/security'
    },
        {
            name: 'Time',
            description: 'tic tac tic tac',
            icon: 'http://loremicon.com/i/flat/64/clock'
    }];

    var finePrints = [{
        name: 'Privacy Policy Fine Print',
        description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then',
        kind: 'Privacy',
        finePrintTags: finePrintTags
    }];


    var services = [{
        name: 'MyNextSocial',
        description: 'The Next Social to rules them all :-D',
        url: 'http://github.com',
        owner: 'owner@of.service',
        finePrints: finePrints
    }];

    res.render('services/index', {
        title: 'Services List',
        services: services

    });
};

/**
 * POST /account/service/:serviceId
 * Add a service for current User
 * @param serviceId
 */

exports.postUserService = function (req, res, next) {

    Service.findById(req.params.serviceId, function (err, service) {
        if (err) return next(err);

        User.findById(req.user.id, function (err, user) {
            if (err) return next(err);

            if (user.services) user.services = [];

            user.services.push(service);

            user.save(function (err) {
                if (err) return next(err);
                req.flash('success', {
                    msg: 'Profile Service information updated.'
                });
                res.redirect('/account');
            });
        });

    });

};

/**
 * GET /service
 * Get Service Details for Current User (Owner)
 */

exports.getServiceForOwner = function (req, res) {

    Service.findOne({
        owner: req.user.id
    }, function (err, service) {
        if (err) return next(err);

        res.render('services/show', {
            title: service.name,
            service: service
        });

    });

};