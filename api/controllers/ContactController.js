'use strict';
require('dotenv').config();
const nodemailer = require("nodemailer"),
mongoose = require('mongoose'),
Contact = mongoose.model('Contact'),
Security = require('../security/security');

exports.list_contact = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    var query = Contact.find({}, null, {limit: parseInt(req.query.quantity), sort: {'Created_Date': -1}});
    query.exec(function(err, contact) {
        if (err)
            res.send(err);
        res.json(contact);
    });
  }
};

exports.create_contact = function(req, res) {
    var contactToAdd = new Contact(req.body);
    contactToAdd.save(async function(err, contact) {
        if (err)
            res.send(err);
            
        let transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.USER_MAIL, // generated ethereal user
            pass: process.env.PASS_MAIL // generated ethereal password
          }
        });

        let info = await transporter.sendMail({
          from: `"${process.env.FROM_NAME}" <${process.env.FROM_MAIL}>`, // sender address
          to: process.env.TO_MAIL, // list of receivers
          subject: `${contact.subject}`, // Subject line
          text: `${contact.message}`, // plain text body
          html: `<p>${contact.message}</p>` // html body
        });

        res.json(contact);
    });
};

