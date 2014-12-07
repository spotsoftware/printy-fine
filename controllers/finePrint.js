var Service = require('../models/Service');
var FinePrint = require('../models/FinePrint');
var querystring = require('querystring');
var validator = require('validator');
var async = require('async');
var request = require('request');
var Y = require('yui/yql');
var _ = require('lodash');

var _tags = [
    {
        code: 'no-privacy',
        title: 'There is no Privacy',
        icon: 'http://loremicon.com/i/flat/64/security'
    },
    {
        code: 'time',
        title: 'Your time is our',
        icon: 'http://loremicon.com/i/flat/64/clock'
    },
    {
        code: 'photo-property',
        title: 'All images is property of the service',
        icon: 'http://loremicon.com/i/flat/64/image '
    },
    {
        code: 'automatic-updates',
        title: 'There is no Privacy',
        icon: 'http://loremicon.com/i/flat/64/download '
    },
    {
        code: 'sold-souls',
        title: 'Your soul is property of this service',
        icon: 'http://loremicon.com/i/flat/64/money'
    },
    {
        code: 'credit-card',
        title: 'We can use your credit card as we need',
        icon: 'http://loremicon.com/i/flat/64/creditcard'
    },
    {
        code: 'home-key',
        title: 'We have a copy of your home\'s keys',
        icon: 'http://loremicon.com/i/flat/64/key'
    },
     
];


/**
 * GET /services/:service_id/fineprints/:fineprintId
 * Show a fineprint for a particular service.
 */

exports.getFinePrint = function (req, res) {


    var finePrintTags = _tags;

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
        
        finePrint.kind = 'Privacy';
        finePrint.finePrintTags = finePrintTags;

        res.render('fineprints/show', {
            title: finePrint.name,
            service: service,
            finePrint: finePrint,
        });

    });


};

/**
 * GET /services/:serviceId/fineprint
 * Add FinePrint.
 */

exports.getNewFinePrint = function (req, res, next) {

    Service.findById(req.params.serviceId, function (err, service) {
        if (err) return next(err);

        res.render('fineprints/add', {
            title: service.name,
            service: service,
            availableTags: _tags
        });

    });
};

/**
 * GET /services/:serviceId/fineprints/:finePrintId/edit
 * Edit FinePrint.
 */

exports.getEditFinePrint = function (req, res, next) {

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
            finePrint: finePrint,
            availableTags: _tags
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