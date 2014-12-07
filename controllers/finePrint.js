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
        icon: 'http://loremicon.com/i/flat/64/security',
        description: 'With the subscription of this service, you agree to NO MORE Privacy.'
        
    },
    {
        code: 'time',
        title: 'Your time is our',
        icon: 'http://loremicon.com/i/flat/64/clock',
        description: 'Time is an overvalued concept. Starting from now you agree to give us your time. Our day will be 25h.'
    },
    {
        code: 'photo-property',
        title: 'All images is property of the service',
        icon: 'http://loremicon.com/i/flat/64/image ',
        description: 'All images uploaded to this service, will become property of the service itself. You will not have no property.'
    },
    {
        code: 'automatic-updates',
        title: 'There is no Privacy',
        icon: 'http://loremicon.com/i/flat/64/download ',
        description: 'We will update service without any comunication. We can left features as we need.'
    },
    {
        code: 'sold-souls',
        title: 'Your soul is property of this service',
        icon: 'http://loremicon.com/i/flat/64/money',
        description: 'You will sold us your soul, completely without any choice of compensation.'
    },
    {
        code: 'credit-card',
        title: 'We can use your credit card as we need',
        icon: 'http://loremicon.com/i/flat/64/creditcard',
        description: 'You must share with us your credit card pin code, we will use it many times.'
    },
    {
        code: 'home-key',
        title: 'We have a copy of your home\'s keys',
        icon: 'http://loremicon.com/i/flat/64/key',
        description: 'You must make a copy of your home\'s keys. We will evaulate it as our accomodation.'
    },
     
];

/**
 * GET /services/:service_id/fineprints/:fineprintId/preview
 * Show a fineprint preview for a particular service.
 */

exports.getFinePrintPreview = function (req, res) {


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

        res.render('fineprints/preview', {
            title: finePrint.name,
            service: service,
            finePrint: finePrint,
        });

    });


};
    
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