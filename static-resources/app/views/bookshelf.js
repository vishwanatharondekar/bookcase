define(function(require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var BookView = require('./book');

	var BookShelf = Backbone.View.extend({
		initialize : function(options) {
			this.render();
		},
		template : Handlebars
				.compile(require('text!./../templates/bookshelf.html')),
		render : function() {
			$(this.el).html(this.template(this));
			
			for(var index in this.collection.models){
				new BookView({el : this.$('.' + this.collection.models[index].cid), model :this.collection.models[index]});
			}
		}
	});
	return BookShelf;
});