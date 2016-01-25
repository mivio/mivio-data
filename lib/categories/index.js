'use strict';

var supportedLanguages = ['ru'];

exports.getCategories = function(lang) {
	if (~supportedLanguages[lang]) {
		return require('./' + lang + '.json');
	}
	throw new Error('Invalid category language: ' + lang);
};

exports.getCategory = function(lang, id) {
	var categories = exports.getCategories(lang);
	return categories[id];
};
