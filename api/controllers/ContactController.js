'use strict';
const nodemailer = require("nodemailer");

var mongoose = require('mongoose'),
Contact = mongoose.model('Contact');

exports.create_contact = function(req, res) {
    var contactToAdd = new Contact(req.body);

    contactToAdd.save(async function(err, contact) {
        if (err)
            res.send(err);
            
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "gustavo.abreuluzia@gmail.com", // generated ethereal user
            pass: "homukqrvrezhgpnm" // generated ethereal password
          }
        });

        let info = await transporter.sendMail({
          from: '"Amica 🐶" <AssociacaoAmica@hotmail.com>', // sender address
          to: "gustavo.abreuluzia@gmail.com", //"AssociacaoAmica@hotmail.com", // list of receivers
          subject: `${contact.subject}`, // Subject line
          text: `${contact.message}`, // plain text body
          html: `<p>${contact.message}</p>` // html body
        });

        res.json(contact);
    });
};