var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
	var user = new User({
		firstName: req.body.firstName,
		lastName : req.body.lastName,
		password : bcrypt.hashSync(req.body.password, 10),
		email : req.body.email
	});
	user.save(function (err, result) {
		if (err){
			return res.status(500).json({
				title: 'error',
				error: err
			});
		}
		res.status(201).json({
			message: 'saved user',
			obj: result
		});

	})
});

router.post('/signin', function (req, res, next) {
	User.findOne({email: req.body.email}, function (err, user) {
		if (err){
			return res.status(500).json({
				title: 'error',
				error: err
			});
		}
		if (!user){
			return res.status(401).json({
				title: 'login failed',
				obj: {message: 'invalid login'}
			});
		}
		if(!bcrypt.compareSync(req.body.password, user.password)){
			return res.status(401).json({
				title: 'login failed',
				obj: {message: 'invalid login'}
			});
		}
		var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			message: 'success',
			token: token,
			userId: user._id
		});
	});
});

module.exports = router;
