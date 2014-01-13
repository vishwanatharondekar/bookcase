define(function(require) {

	var Backbone = require('backbone');
	require('localStorage');
	var BookCollection = Backbone.Collection.extend({
        /*localStorage: new Backbone.LocalStorage("books")*/
	});
	return BookCollection;
});

