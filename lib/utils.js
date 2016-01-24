'use strict';

exports.Promise = require('bluebird');
// exports._ = require('lodash');

var OBJ_ROMANIAN_CORRECT = {
	'ș': /ş/g,
	'Ș': /Ş/g,
	'ț': /ţ/g,
	'Ț': /Ţ/g
};

function replaceAll(obj, text) {
	for (var prop in obj) {
		text = text.replace(obj[prop], prop);
	}
	return text;
}

function correctText(s, lang) {
	if (!s) {
		return s;
	}
	if (lang === 'ro') {
		return replaceAll(OBJ_ROMANIAN_CORRECT, s);
	}
	return s;
}

function isLetter(s) {
	return s.toUpperCase() !== s.toLowerCase();
}

function isUpper(s) {
	return isLetter(s) && s.toUpperCase() === s;
}

function isLower(s) {
	return isLetter(s) && s === s.toLowerCase();
}

function isDigit(s) {
	return /^\d+$/.test(s);
}

function isLetterOrDigit(s) {
	return isDigit(s) || isLetter(s);
}

function isPunctuation(s) {
	return /[!"#%&'\(\)\*,\.\/:\?@\[\]\\_{}-]/.test(s);
}

exports.isLetter = isLetter;
exports.isDigit = isDigit;
exports.isLetterOrDigit = isLetterOrDigit;
exports.isLower = isLower;
exports.isUpper = isUpper;
exports.isPunctuation = isPunctuation;
exports.correctText = correctText;
