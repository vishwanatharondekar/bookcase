define(function(require){
	
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var BookShelfView = require('./bookshelf');
	
	
	var BookCaseView = Backbone.View.extend({
		initialize : function(options){
			this.bookShelves = [];
			this.render(options.bookShelfs);
			
		},
		template : Handlebars.compile(require('text!./../templates/bookcase.html')),
		render : function(bookShelfs){
			this.bookShelfs = bookShelfs || this.bookShelfs;
			$(this.el).html(this.template(bookShelfs));
			for(var index in bookShelfs){
				var dataForBookShelf = _.extend({ el : this.$('.' + bookShelfs[index].model.cid)}, bookShelfs[index]);
				this.bookShelves.push(new BookShelfView(dataForBookShelf));
			}
		}
	});
	return BookCaseView;
});