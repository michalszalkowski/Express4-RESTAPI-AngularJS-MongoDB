var express = require('express');
var Article = require('./article');

module.exports.init = function () {

	var routerApi = express.Router();

	// middleware to use for all requests
	routerApi.use(function (req, res, next) {
		console.log('Somebody uses our API !');
		next();
	});

	// POST NEW ITEM http://localhost:8080/api/articles
	routerApi.route('/articles').post(function (req, res) {

		var article = new Article();
		article.name = req.body.name;
		article.desc = req.body.desc;

		article.save(function (err) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'article created!' });
		});

	});

	// GET ALL ITEMS http://localhost:8080/api/articles
	routerApi.route('/articles').get(function (req, res) {
		Article.find(function (err, article) {
			if (err) {
				res.send(err);
			}
			res.json(article);
		});
	});

	// GET ONE ITEM http://localhost:8080/api/bears/:article_id
	routerApi.route('/articles/:article_id').get(function (req, res) {
		Article.findById(req.params.article_id, function (err, article) {
			if (err) {
				res.send(err);
			}
			res.json(article);
		});
	});

	// PUT UPDATE ONE ITEM http://localhost:8080/api/articles/:article_id
	routerApi.route('/articles/:article_id').put(function (req, res) {

		Article.findById(req.params.article_id, function (err, article) {
			if (err) {
				res.send(err);
			}
			article.name = req.body.name;
			article.desc = req.body.desc;

			article.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json({ message: 'article updated!' });
			});

		});
	});

	//DELETE ONE ITEM http://localhost:8080/api/articles/:article_id
	routerApi.route('/articles/:article_id').delete(function (req, res) {
		Article.remove({
			_id: req.params.article_id
		}, function (err, article) {
			if (err) {
				res.send(err);
			}

			res.json({ message: 'Successfully deleted' });
		});
	});

	return routerApi;
};