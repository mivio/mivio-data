'use strict';

var cultures = process.env.CULTURE.split(/[,; ]+/g);
if (!cultures) {
	console.log('NO LANG');
}

var request = require('https').request;
var url = require('url');
var fs = require('fs');
var path = require('path');

function saveData(data, lang) {
	var categories = {};
	data.items.forEach(function(item) {
		categories[item.id] = {
			id: parseInt(item.id),
			name: item.snippet.title
		};
	});
	fs.writeFileSync(path.join(__dirname, lang + '.json'), JSON.stringify(categories) + '\n');
}

function start(lang, country) {
	var link = 'https://www.googleapis.com/youtube/v3/videoCategories?key=' + process.env.YOUTUBE_API_KEY + '&part=snippet&hl=' + lang + '&regionCode=' + country;
	var urlParts = url.parse(link);

	var options = {
		hostname: urlParts.host,
		path: urlParts.path,
		method: 'GET',
		port: 443
	};

	var req = request(options, function(res) {
		res.setEncoding('utf8');
		// console.log(res.statusCode);
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			data = JSON.parse(data);
			saveData(data, lang);
		});
	});

	req.on('error', function(e) {
		console.log(e);
	});

	req.end();
}

cultures.forEach(function(culture) {
	culture = culture.split('-');
	start(culture[0], culture.length > 1 ? culture[1] : culture[0]);
});
