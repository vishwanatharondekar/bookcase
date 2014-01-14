define(function(require){
	
	
	var BookCaseView = require('./bookcase');
	
	
	var UserBookCaseView = BookCaseView.extend({
		initialize : function(options){
			UserBookCaseView.__super__.initialize.apply(this, arguments);
			
			
			this.otherBookShelf = {
				collection : new Backbone.Collection(),
				model : new Backbone.Model({
					id : 'Other'
				})
			};
			
		},
		addBookToShelf : function(bookModel){
			var lastBookShelf = this.bookShelfs[this.bookShelfs.length-1];
			lastBookShelf['collection'].add(bookModel);
		}
	});
	return UserBookCaseView;
});


