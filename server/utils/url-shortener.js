const shortUrl = require('node-url-shortener');

exports.shortenUrl = (req, res, next) => {
	let fullUrl = req.protocol + '://' + req.get('host');
	let referrer = req.query.referrer;
	let room = req.query.room;
	let urlToShorten = fullUrl + "?room=" + room;
	shortUrl.short(urlToShorten, function(err, url){
	    res.send(url);
		next();
	});
}