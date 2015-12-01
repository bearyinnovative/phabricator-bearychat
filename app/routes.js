var config = require('config');
var querystring = require('querystring');
var request = require('request');
var superagent = require('superagent');

module.exports = function(app, router) {
	router.use(function(req, res, next) {
		console.log(req.method, req.url);
		next();
	});

	var index = router.route("/");

	index.post(function(req, res) {
		res.send('OK');

		if (req.body.storyData && req.body.storyData.objectPHID) {
			var token = config.get("phabricator.token");
			var queryurl = config.get("phabricator.api") + "/api/phid.query";
			var sendurl = config.get("bearychat.url");
			var phid = req.body.storyData.objectPHID;
			var text = req.body.storyText;

			var form = {
				'api.token': token,
				'phids[]': phid
			};

			var formData = querystring.stringify(form);
			var contentLength = formData.length;

			request({
				headers: {
					'Content-Length': contentLength,
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				uri: queryurl,
				body: formData,
				method: 'POST'
			}, function(err, res, body) {
				if (!err) {
					var sendbody = JSON.parse(body);
					sendbody.result[phid].text = text;

					superagent
					.post(sendurl)
					.send(sendbody)
					.set('Accept', 'application/json')
					.end(function(err, res) {
						if (!err) {
							console.log(res);
						};
					});
				};
			});
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