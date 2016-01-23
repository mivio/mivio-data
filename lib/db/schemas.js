'use strict';

var Joi = require('vogels-helpers').Joi;

exports.Video = {
	// sourceId Buffer toString('hex'):
	id: Joi.string().reqex(/^[a-z0-9]{3,40}$/).required(),
	country: Joi.string().lowecase().trim().length(2).required(),
	title: Joi.string().max(200).required(),
	description: Joi.string().max(400),
	createdAt: Joi.number().integer().default(Date.now(), 'created date'),
	updatedAt: Joi.number().integer(),
	category: Joi.number().integer(),

	source: Joi.string().valid(['youtube']).required(),
	sourceId: Joi.string().alphanum().min(3).max(32).required(),
	sourceTitle: Joi.string().max(200),
	sourceUsername: Joi.string().trim().min(1).max(50).required(),
	sourceChannelId: Joi.string().trim().min(1).max(50),
	sourceCountViews: Joi.number().integer(),
	sourceCountComments: Joi.number().integer(),
	sourcePublishedAt: Joi.number().integer(),

	// format: COUNTRY-CATEGORY: md-42
	countryCategory: Joi.string().reqex(/^\w{2}-\d+$/)
};