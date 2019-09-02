'use strict';

exports.login_admin = function(req, res) {
    var jwt = require('jsonwebtoken');
    
    var token = req.signedCookies.token;
    if (!token) {
        var auth = { auth: false, message: 'No token provided.' };
        res.status(401).send(auth);
        return auth;
    }

    let decodedReturn = null;
    jwt.verify(token, process.env.API_KEY, function(err, decoded) {
        if (err) {
            var auth = { auth: false, message: 'Failed to authenticate token.' };
            res.status(500).send(auth);
            decodedReturn = auth;
        }
        
        decodedReturn = decoded;
    });

    return decodedReturn;
};