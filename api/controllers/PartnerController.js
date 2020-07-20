'use strict';
require('dotenv').config();
const nodemailer = require("nodemailer"),
mongoose = require('mongoose'),
Partner = mongoose.model('Partner'),
Security = require('../security/security'),
PizZip = require('pizzip'),
Docxtemplater = require('docxtemplater'),
fs = require('fs'),
path = require("path");

exports.list_partners = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    var query = Partner.find({}, null, {sort: {'Created_Date': -1}});
    query.exec(function(err, partner) {
        if (err)
            res.send(err);
        res.json(partner);
    });
  }
};

exports.create_partner = function(req, res) {
    var partnerToAdd = new Partner(req.body);
    partnerToAdd.save(async function(err, partner) {
        if (err)
            res.send(err);

        var content = fs.readFileSync(path.resolve(__dirname, 'templates/FichaSocio.docx'), 'binary');
        var zip = new PizZip(content);
        var doc;
        try {
            doc = new Docxtemplater(zip);
        } catch(error) {
            // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
            errorHandler(error);
        }

        //set the templateVariables
        doc.setData({
          nome: partner.name,
          morada: partner.address,
          localicade: partner.city,
          email: partner.mail,
          telemovel: partner.phone,
          codPostal: partner.postalCode,
          profissao: partner.job,
          contribuinte: partner.document,
          dia: partner.birthday.getDate(),
          mes: partner.birthday.getMonth() + 1,
          ano: partner.birthday.getFullYear(),
        });

        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render()
        }
        catch (error) {
            // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
            errorHandler(error);
        }
        
        var buf = doc.getZip().generate({type: 'nodebuffer'});
        
        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        //fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

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
          subject: `Há um novo Sócio!`, // Subject line
          text: `Nome: ${partner.name}, 
          Documento: ${partner.document}, 
          Aniversário: ${partner.birthday.getDate()}/${partner.birthday.getMonth() + 1}/${partner.birthday.getFullYear()}, 
          Morada: ${partner.address}, 
          Localidade: ${partner.city}, 
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
          <b>Telefone:</b> ${partner.phone}</p>`, // html body
          attachments: [{   // binary buffer as an attachment
            filename: `Socio_${partner.name.replace(/ /g,'')}.docx`,
            content: buf
        }]
        });
        
        res.json(partner);
    });
};

exports.find_partner = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
  Partner.findById(req.params.partnerId, function(err, partner) {
        if (err)
            res.send(err);
        res.json(partner);
    });
  }
};

exports.update_partner = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    Partner.findOneAndUpdate({_id: req.params.partnerId}, req.body, {new: true, useFindAndModify: false}, function(err, partner) {
      if (err)
        res.send(err);
      res.json(partner);
    });
  }
};

exports.delete_partner = function(req, res) {
  const login = Security.login_admin(req, res);

  if(login.auth) {
    Partner.remove({
      _id: req.params.partnerId
    }, function(err, partner) {
      if (err)
        res.send(err);
      res.json({ message: 'Partner successfully deleted' });
    });
  }
};