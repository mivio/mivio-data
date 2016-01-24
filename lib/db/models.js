'use strict';

var vogels = require('vogels-helpers');
var schemas = require('./schemas');
var VideoRecord = require('./video_record');
var tablePrefix = process.env.TREVID_TABLE_PREFIX || 'Trevid';

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
	}, {
		hashKey: 'country',
		rangeKey: 'createdAt',
		type: 'global',
		name: 'VideosCountryIndex'
	}]
}, VideoRecord);
