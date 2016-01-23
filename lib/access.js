'use strict';

require('./db/models');

var db = require('vogels-helpers');

/**
 * Access class
 */
var Service = module.exports = function() {

};

/**
 * Get a Video by id
 */
Service.prototype.getVideo = function(id) {
	return db.access.getItem('TrevidVideo', id, {
			format: 'json'
		});
};

/**
 * Get videos by ids
 */
Service.prototype.getVideos = function(ids) {
	return db.access.getItems('TrevidVideo', ids, {
		format: 'json'
	});
};

/**
 * Find Videos
 */
Service.prototype.queryVideos = function(params) {
	params.format = params.format || 'items';
	return db.access.query('TrevidVideo', params);
};