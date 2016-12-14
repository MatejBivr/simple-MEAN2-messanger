var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.get('/', function (req, res, next) {
	Message.find()
		.populate('user', 'firstName')
		.exec(function(err, messages) {
		if (err){
			return res.status(500).json({
				title: 'error',
				error: err
			});
		}
		res.status(200).json({
			message: 'success',
			obj: messages
		});
	});
});

router.use('/', function (req, res, next) {
	jwt.verify(req.query.token, 'secret', function (err, decoded) {
		if(err){
			return res.status(401).json({
				title: 'Not Authenticated',
				error: err
			});
		}
		next();
	});
});

router.post('/', function (req, res, next) {
	var decoded = jwt.decode(req.query.token);
	User.findById(decoded.user._id, function (err, user) {
		if(err) {
			return res.status(500).json({
				title: 'no such user',
				error: err
			});
		}
		var message = new Message({
			content: req.body.content,
			user: user
		});
		message.save(function (err, result) {
			if(err) {
				return res.status(500).json({
					title: 'error',
					error: err
				});
			}
			user.messages.push(result);
			user.save();
			res.status(201).json({
				message: 'saved',
				obj: result
			});
		});
	});

});

router.patch('/:id', function (req, res, next) {
	Message.findById(req.params.id, function (err, message) {
		if(err) {
			return res.status(500).json({
				title: 'error',
				error: err
			});
		}
		if(!message){
			return res.status(500).json({
				title: 'no message found',
				error: {message: 'message not found'}
			});
		}
		message.content = req.body.content;
		message.save(function (err, result) {
			if(err) {
				return res.status(500).json({
					title: 'error',
					error: err
				});
			}
			res.status(200).json({
				message: 'updated',
				obj: result
			});
		})
	})
});

router.delete('/:id', function (req, res, next) {
	Message.findById(req.params.id, function (err, message) {
		if(err) {
			return res.status(500).json({
				title: 'error',
				error: err
			});
		}
		if(!message){
			return res.status(500).json({
				title: 'no message found',
				error: {message: 'message not found'}
			});
		}
		
		message.remove(function (err, result) {
			if(err) {
				return res.status(500).json({
					title: 'error',
					error: err
				});
			}
			res.status(200).json({
				message: 'deleted',
				obj: result
			});
		})
	})
});

module.exports = router;
