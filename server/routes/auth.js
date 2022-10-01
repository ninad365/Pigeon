var express = require('express');
const router = express();
path = require('path');
var User = require('../models/users');

var signup = path.join(__dirname, '../views/signup.ejs')

router.post('/login', function (req, res) {
	console.log(req.body)
	User.findOne({ email: req.body.username }, function (err, data) {
		// console.log(data);
		if (data) {
			if (data.password == req.body.password) {
				req.session.userId = data._id;
				req.session.username = data.username;
				return res.status(200).json({ "Success": "Logged in!" })

			} else {
				return res.status(400).json("Wrong password!")
			}
		} else {
			return res.status(404).json( "Email is not registered")
		}
	});
})

router.post('/', function (req, res) {
	console.log('--')
	console.log(req.body)
	console.log('--')
	User.findOne({ email: req.body.username }, function (err, data) {
		// console.log(data);
		if (data) {
			if (data.password == req.body.password) {
				req.session.userId = data._id;
				req.session.username = data.username;
				return res.status(200).json({ "Success": "Logged in!" })

			} else {
				return res.status(500).json({ "Failure": "Wrong password!" })
			}
		} else {
			return res.status(500).json({ "Failure": "Email is not registered" })
		}
	});
});

router.get('/signup', (req, res) => {
	res.render(signup);
});
router.post('/signup', (req, res, next) => {
	var username = req.body.name;
	var password = req.body.password;
	var email = req.body.email;

	var newUser = new User({
		email: email,
		username: username,
		password: password
	});
	newUser.save(next);
	return res.redirect('/');
}
)

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

module.exports = router;