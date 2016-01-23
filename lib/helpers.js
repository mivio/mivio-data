'use strict';

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
