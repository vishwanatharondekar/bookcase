define(function(require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');

	var BookView = Backbone.View.extend({
		initialize : function() {
			this.render();
		},
		events : {
			'click .js-delete-book' : 'deleteBook'
		},
		template : Handlebars
				.compile(require('text!./../templates/book.html')),
		render : function() {
			$(this.el).html(this.template(this.model.attributes));
		},
		deleteBook : function(){
			var confirmation = confirm("Are you sure you want to delete the book from shelf?");
			if(confirmation){
				this.model.destroy();
				this.remove();
			}
		}
	});
	return BookView;
});