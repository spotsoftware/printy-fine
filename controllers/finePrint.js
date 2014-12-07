var Service = require('../models/Service');
var FinePrint = require('../models/FinePrint');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var Y = require('yui/yql');
var _ = require('lodash');

/**
 * GET /services/:service_id/fineprints/:fineprintId
 * Show a fineprint for a particular service.
 */

exports.getFinePrint = function (req, res) {

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

    var finePrint = {
        name: 'Privacy Policy Fine Print',
        description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then',
        kind: 'Privacy',
        finePrintTags: finePrintTags
    };

    res.render('fineprints/show', {
        title: finePrint.name,
        finePrint: finePrint
    });

};

/**
 * GET /services/:serviceId/fineprint
 * Add FinePrint.
 */

exports.getNewFinePrint = function (req, res, next) {

    var tags = ['Privacy', 'Sold soul', 'Photo', 'Credit Card Pin Code', 'Property of Everythings'];
    
    Service.findById(req.params.serviceId, function (err, service) {
        if (err) return next(err);

        
        
        res.render('fineprints/add', {
            title: service.name,
            service: service, 
            availableTags: tags
        });

    });
};

/**
 * GET /services/:serviceId/fineprints/:finePrintId/edit
 * Edit FinePrint.
 */

exports.getEditFinePrint = function (req, res, next) {

    console.log(req.params);

    Service.findById(req.params.serviceId, function (err, service) {
        if (err) return next(err);

        var finePrint = {
            name: '',
            description: ''
        };

        for (var i = 0; i < service.finePrints.length; i++) {
            var item = service.finePrints[i];

            if (item._id == req.params.fineprintId) {
                finePrint = item;
            }
        }

        res.render('fineprints/edit', {
            title: service.name,
            service: service,
            finePrint: finePrint
        });

    });
};

/**
 * POST /services/:serviceId/fineprint
 * Add FinePrint to service
 */

exports.postFinePrint = function (req, res, next) {

    Service.findById(req.params.serviceId, function (err, service) {
        if (err) return next(err);

        if (req.params.fineprintId != null) {

            for (var i = 0; i < service.finePrints.length; i++) {
                var finePrint = service.finePrints[i];

                if (finePrint._id == req.params.fineprintId) {
                    finePrint.name = req.body.name;
                    finePrint.description = req.body.description;
                    
                    service.markModified('finePrints');
                }

            }


        } else {

            var finePrint = new FinePrint({
                name: req.body.name,
                description: req.body.description
            });

            service.finePrints.push(finePrint);
        }

        //save the service
        service.save(function (err) {
            if (err) return next(err);
            res.redirect('/service');
        });

    });
};