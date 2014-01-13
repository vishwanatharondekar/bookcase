define(function(require) {

	var Backbone = require('backbone');
	require('localStorage');
	var Handlebars = require('handlebars');

	var BookModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("books"),
		initialize : function() {
		}
	});
	return BookModel;
});