var config = require('config');

module.exports = function(app, router) {
	router.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	var index = router.route("/");

	index.post(function(request, response) {
		if (req.body.storyData && req.body.storyData.objectPHID) {

		}
	});

	app.use('/', router);

	app.use(function(req, res, next) {
		res.status(404);

		if (req.accepts('json')) {
			res.send({
				error: 'Not found'
			});
			return;
		}

		res.type('txt').send('Not found');
	});
}