'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({ 
	name: {
        type: String,
        required: 'Kindly enter the user name'
    },
	userLogin: {
        type: String,
        required: 'Kindly enter the user login'
    },
	password: {
        type: String,
        required: 'Kindly enter the user password'
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

module.exports = mongoose.model('User', UserSchema);