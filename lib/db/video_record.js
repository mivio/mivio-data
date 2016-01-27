'use strict';

var helpers = require('../helpers');

exports.createNormalize = function createNormalize(data) {
	if (data.category && !data.countryCategory) {
		data.countryCategory = [data.country, data.category].join('-');
	}

	helpers.formatVideoTitle(data);
	helpers.formatVideoDescription(data);

	if (data.sourceUsername.length > 50) {
		data.sourceUsername = data.sourceUsername.substr(0, 50);
	}

	return data;
};

exports.createValidate = function(data) {
	if (!data.title || data.title.length < 10) {
		throw new Error('Video title is too short');
	}
	// if (data.description.length < 10) {
	// 	throw new Error('Video description is too short');
	// }
};
