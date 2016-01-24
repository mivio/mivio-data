'use strict';

var utils = require('../utils');

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

	return countOkChars < target.length / 3;
}

function formatTitle(video) {
	if (!video.title) {
		video.title = video.sourceTitle.replace(/[❤✿•►\uFEFF\xA0]/g, ' ').trim();
		video.title = video.title.replace(/\s{2,}/g, ' ');
		video.title = video.title.replace(/!{2,}/g, '!').replace(/\?{2,}/g, '?');
		video.title = video.title.replace(/\[.*\]$/g, '').trim();

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
}

function formatDescription(video) {
	video.description = video.description || '';
	video.description = video.description.replace(/[❤✿•►✔➝\uFEFF\xA0]/g, ' ');
	video.description = video.description.replace(/[\t\r ]{2,}/g, ' ').trim();
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
	if (video.description.length > 400) {
		video.description = video.description.substr(0, 400).trim();
	}
}

exports.createNormalize = function createNormalize(data) {
	if (data.category && !data.countryCategory) {
		data.countryCategory = [data.country, data.category].join('-');
	}

	formatTitle(data);
	formatDescription(data);

	if (data.sourceUsername.length > 50) {
		data.sourceUsername = data.sourceUsername.substr(0, 50);
	}

	return data;
};

exports.createValidate = function(data) {
	if (data.title.length < 10) {
		throw new Error('Video title is too short');
	}
	if (data.description.length < 10) {
		throw new Error('Video description is too short');
	}
};
