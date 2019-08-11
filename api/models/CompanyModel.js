'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanySchema = new Schema({ 
	name: {
        type: String,
        required: 'Kindly enter the company name'
    },
	description: {
        type: String,
        required: 'Kindly enter the company description'
    },
	imgSrc: {
        type: String,
        required: 'Kindly enter the company image'
    },
    order: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
	Created_Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);