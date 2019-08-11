'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartnerSchema = new Schema({ 
	name: {
        type: String,
        required: 'Kindly enter the partner name'
    },
	document: {
        type: String,
        required: 'Kindly enter the partner document'
    },
	birthday: {
        type: Date,
        required: 'Kindly enter the partner birthday'
    },
    address: {
        type: String,
        required: 'Kindly enter the partner address'
    },
    city: {
        type: String,
        required: 'Kindly enter the partner city'
    },
    postalCode: {
        type: String,
        required: 'Kindly enter the partner postalCode'
    },
    mail: {
        type: String,
        required: 'Kindly enter the partner mail'
    },
    job: {
        type: String,
        required: 'Kindly enter the partner job'
    },
    phone: {
        type: String,
        required: 'Kindly enter the partner phone'
    },
    status: {
        type: Boolean,
        default: true
    },
	Created_Date: {
        type: Date,
        default: Date.now
    },
    Updated_Date: {
        type: Date
    }
});

module.exports = mongoose.model('Partner', PartnerSchema);