const express = require('express');
const app = express();
const router = express.Router();

var config = require('./../config');
app.set('superSecret', config.secret);

var jwt = require('jsonwebtoken');

var User = require('./../models/user');

router.get('/', function(req, res){
    res.send('api works');
});

router.route('/users')

    .get(function(req, res){
        User.find(function(err, users){
            if(err)
                res.send(err);

            res.json(users);
        });
    });

router.route('/authenticate')

    .post(function(req, res){
        User.findOne({
            name: req.body.name
        }, function(err, user){
            if(err)
                res.send(err);

            if(!user){
                res.json({ success: false, message: 'Authenticate failed. You are not registered.' });
            } else if(user){

                if(user.password != req.body.password){
                    res.json({ success: false, message: 'Authenticate failed. Wrong password.' });
                } else{
                    var token = jwt.sign(user, app.get('superSecret'), {
                        expiresIn: 60*60*24 //24 hours
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token',
                        token: token
                    });
                }
            }
        });
    });

module.exports = router;
