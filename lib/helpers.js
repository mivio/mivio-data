'use strict';

var utils = require('./utils');

exports.encodeVideoId = function(id, country) {
	id = new Buffer(id).toString('hex');
	if (country) {
		id = country + id;
	}
	return id;
};

exports.decodeVideoId = function(id) {
	id = id.substr(2);
	return new Buffer(id, 'hex').toString('utf8');
};

function smartLower(target) {
	return target.split(/[\s]+/g)
		.map(function(word, index) {
			if (word.length < 4 && index > 0) {
				return word.toLowerCase();
			}
			for (var i = word.length - 1; i >= 0; i--) {
				var c = word[i];
				if (utils.isLower(c)) {
					return word;
				}
			}
			word = word.toLowerCase();
			return word[0].toUpperCase() + word.substr(1);
		}).join(' ');
}

function hasManyUpperCase(target) {
	var countOkChars = 0;
	for (var i = target.length - 1; i >= 0; i--) {
		var c = target[i];
		if (utils.isDigit(c) || utils.isLower(c)) {
			countOkChars++;
		}
	}

	return countOkChars < target.length / 2;
}

exports.formatVideoTitle = function(video) {
	if (!video.title) {
		video.title = video.sourceTitle.replace(/[❤✿•►✔♦\uFEFF\xA0]/g, ' ').trim();
		video.title = video.title.replace(/\s{2,}/g, ' ');
		video.title = video.title.replace(/!{2,}/g, '!').replace(/\?{2,}/g, '?');
		video.title = video.title.replace(/\[.*\]$/g, '').trim();
		video.title = video.title.replace(/^\[.*\]/g, '').trim();
		video.title = video.title.replace(/ \| /g, ' - ');
		video.title = video.title.replace(/[\.,:;\*@_=!\?-]+$/g, '').replace(/^[\.,:;\*@_!\?=-]+/g, '').trim();

		if (hasManyUpperCase(video.title)) {
			video.title = smartLower(video.title);
		}
	}

	if (video.title === video.sourceTitle) {
		delete video.sourceTitle;
	}

	video.title = video.title.replace(/\s{2,}/, ' ');

	if (video.title.length > 200) {
		video.title = video.title.substr(0, 200).trim();
	}

	return video.title;
};

exports.formatVideoDescription = function(video) {
	video.description = video.description || '';
	video.description = video.description.replace(/[❤✿•►✔➝\uFEFF\xA0]/g, ' ');
	video.description = video.description.replace(/[\t\r ]{2,}/g, ' ').trim();
	video.description = video.description.replace(/-{3,}/g, ' ').trim();
	video.description = video.description.replace(/\.{4,}/g, '.').trim();
	video.description = video.description.replace(/={4,}/g, '=').trim();
	video.description = video.description.replace(/\?{2,}/g, '?').trim();
	video.description = video.description.replace(/!{2,}/g, '!').trim();
	video.description = video.description.replace(/_{2,}/g, '!').trim();
	var lines = video.description.split(/[\n]+/g);
	var nlines = [];

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].trim();
		if (line && line.length > 40 && !/http(s)?:\/\//g.test(line)) {
			if (hasManyUpperCase(line)) {
				line = smartLower(line);
			}
			nlines.push(line);
		}
	}

	video.description = nlines.join('\n');
	if (video.description.length > 512) {
		video.description = video.description.substr(0, 512).trim();
	}

	return video.description;
};
