module.exports.initDb = function () {

	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/express4test');

	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function () {
		console.log('express4test db opened');
	});
};