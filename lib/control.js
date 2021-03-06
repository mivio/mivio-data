'use strict';

require('./db/models');

var db = require('vogels-helpers');

var Service = module.exports = function() {

};

/**
 * Create a Video
 */
Service.prototype.createVideo = function(data) {
	return db.control.create('TrevidVideo', data, {
		format: 'json'
	});
};

/**
 * Update a Video
 */
Service.prototype.updateVideo = function(data) {
	return db.control.update('TrevidVideo', data, {
		format: 'json'
	});
};
