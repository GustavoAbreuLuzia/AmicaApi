'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModelSchema = new Schema({ 
	title: {
        type: String,
        required: 'Kindly enter the title of the News'
    },
	description: {
        type: String,
        required: 'Kindly enter the description of the News'
    },
	type: {
        type: [{
            type: String,
            enum: ['Info', 'Warning', 'AdoptDog', 'AdoptCat']
        }],
        required: 'Kindly enter the type of the News'
    },
	imgSrc: {
        type: String
    },
    images: {
        type: [{
            type: String
        }]
    },
	linkExterno: {
        type: String
    },    
	hasLink: {
        type: Boolean
    },  
	Created_Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', ModelSchema);