define(function(require) {

	var Backbone = require('backbone');
	require('localStorage');

	var BookShelfModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("bookShelf"),
		initialize : function() {
		}
	});
	return BookShelfModel;
});