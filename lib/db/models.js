'use strict';

var vogels = require('vogels-helpers');
var schemas = require('./schemas');
var tablePrefix = process.env.TREVID_TABLE_PREFIX || 'Trevid_';

exports.NAMES = ['TrevidVideo'];

exports.Video = vogels.define('TrevidVideo', {
	tableName: [tablePrefix, 'Videos'].join('_'),
	hashKey: 'id',
	schema: schemas.Video,
	indexes: [{
		hashKey: 'countryCategory',
		rangeKey: 'createdAt',
		type: 'global',
		name: 'VideosCountryCategoryIndex'
	}]
});
