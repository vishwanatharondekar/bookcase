define(function(require){
	var BookCaseView = require('./bookcase');
	
	var GenreBookCaseView = BookCaseView.extend({
		initialize : function(options){
			GenreBookCaseView.__super__.initialize.apply(this, arguments);
			
			
			this.shelfMap = {};
			
			for(var index in options.bookShelfs){
				this.shelfMap[options.bookShelfs[index].model.attributes.title] = options.bookShelfs[index]; 
			}
		},
		addBookToShelf : function(bookModel){
			var genre = bookModel.get('genre');
			this.shelfMap[genre]['collection'].add(bookModel);
		}
	});
	return GenreBookCaseView;
});


