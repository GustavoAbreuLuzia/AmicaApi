'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({ 
	name: {
        type: String,
        required: 'Kindly enter the name of the Contact'
    },
	mail: {
        type: String
    },
	phone: {
        type: String
    },
	subject: {
        type: String,
        required: 'Kindly enter the subject of the Contact'
    },
    message: {
        type: String,
        required: 'Kindly enter the message of the Contact'
    },
	Created_Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', ModelSchema);