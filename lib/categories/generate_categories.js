'use strict';

var langs = process.env.LANG.split(/[,; ]+/g);
if (!langs) {
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

function start(lang) {
	var link = 'https://www.googleapis.com/youtube/v3/videoCategories?key=' + process.env.YOUTUBE_API_KEY + '&part=snippet&hl=' + lang + '&regionCode=' + lang;
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

langs.forEach(function(lang) {
	start(lang);
});
