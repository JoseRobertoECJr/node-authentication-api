const express = require('express');
const router = express.Router();

var User = require('./../models/user');

router.get('/', function(req, res){
    res.send('api works');
});

router.route('/setup')

    .get(function(req, res){
        var jose = new User({
            name: 'Jose Roberto',
            password: '1234',
            admin: true
        });

        jose.save(function(err){
            if(err)
                throw err;
            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

module.exports = router;
