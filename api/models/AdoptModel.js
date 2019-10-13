'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdoptSchema = new Schema({ 
	name: {
        type: String,
        required: 'Kindly enter the pet name'
    },
	description: {
        type: String,
        required: 'Kindly enter the pet description'
    },
	imgSrc: {
        type: String,
        required: 'Kindly enter the pet image'
    },
    images: {
        type: [{
            type: String
        }]
    },
    petType: {
        type: {
            type: String,
            enum: ['Cão', 'Gato']
        }
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

module.exports = mongoose.model('Pets', AdoptSchema);