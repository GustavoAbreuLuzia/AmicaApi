'use strict';
const nodemailer = require("nodemailer");

var mongoose = require('mongoose'),
Partner = mongoose.model('Partner');

exports.list_partners = function(req, res) {
    var query = Partner.find({}, null, {sort: {'Created_Date': -1}});
    query.exec(function(err, partner) {
        if (err)
            res.send(err);
        res.json(partner);
    });
};

exports.create_partner = function(req, res) {
    var partnerToAdd = new Partner(req.body);
    partnerToAdd.save(async function(err, partner) {
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
          subject: `Há um novo Sócio!`, // Subject line
          text: `Nome: ${partner.name}, 
          Documento: ${partner.document}, 
          Aniversário: ${partner.birthday.getDate()}/${partner.birthday.getMonth() + 1}/${partner.birthday.getFullYear()}, 
          Morada: ${partner.address}, 
          LOcalidade: ${partner.city}, 
          Código Postal: ${partner.postalCode}, 
          Email: ${partner.mail}, 
          Profissão: ${partner.job},
          Telefone: ${partner.phone}`, // plain text body
          html: `<p><b>Nome</b>: ${partner.name} <br />
          <b>Documento:</b> ${partner.document}  <br />
          <b>Aniversário:</b> ${partner.birthday.getDate()}/${partner.birthday.getMonth() + 1}/${partner.birthday.getFullYear()}  <br />
          <b>Morada:</b> ${partner.address}  <br />
          <b>Localidade:</b> ${partner.city}  <br />
          <b>Código Postal:</b> ${partner.postalCode}  <br />
          <b>Email:</b> ${partner.mail}  <br />
          <b>Profissão:</b> ${partner.job} <br />
          <b>Telefone:</b> ${partner.phone}</p>` // html body
        });
        
        res.json(partner);
    });
};

exports.find_partner = function(req, res) {
  Partner.findById(req.params.partnerId, function(err, partner) {
        if (err)
            res.send(err);
        res.json(partner);
    });
};

exports.update_partner = function(req, res) {
  Partner.findOneAndUpdate({_id: req.params.partnerId}, req.body, {new: true, useFindAndModify: false}, function(err, partner) {
    if (err)
      res.send(err);
    res.json(partner);
  });
};

exports.delete_partner = function(req, res) {
  Partner.remove({
    _id: req.params.partnerId
  }, function(err, partner) {
    if (err)
      res.send(err);
    res.json({ message: 'Partner successfully deleted' });
  });
};