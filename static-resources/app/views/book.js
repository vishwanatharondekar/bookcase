define(function(require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');

	var BookView = Backbone.View.extend({
		initialize : function(options) {
			this.render(options);
		},
		events : {
			'click .js-delete-book' : 'deleteBook',
			'dragover' : 'preventEvent',
			'dragenter' : 'preventEvent',
			'drop' : 'dropBook',
			'dragstart' : 'startBookDrag',
			'addToShelf' : 'addBookToShelf'
		},
		template : Handlebars
				.compile(require('text!./../templates/book.html')),
		render : function(options) {
			var dataForTemplate = {};
			dataForTemplate = _.extend(this.model.attributes, {draggable : options.draggable})
			$(this.el).html(this.template(dataForTemplate));
		},
		deleteBook : function(){
			var confirmation = confirm("Are you sure you want to delete the book from shelf?");
			if(confirmation){
				this.model.destroy();
				this.remove();
			}
		},
		preventEvent : function(e){
	        e.preventDefault();
	        e.stopPropagation();
		},
		dropBook : function(event){
			var shelfToAddBook = $(this.el).parents(".bookshelf-container" );
			var shelfToRemoveBook = $('.bookshelf-container.'+event.originalEvent.dataTransfer.getData('shelftoremovebook'));
			var bookToRemove = event.originalEvent.dataTransfer.getData('booktoremove');
			//shelfToAddBook.trigger('bookDropped', bookToRemove);
			shelfToRemoveBook.trigger('removeBook', bookToRemove);
			
			$('.js-book.' +bookToRemove).trigger('addToShelf', shelfToAddBook);
		},
		startBookDrag : function(event){
			this.shelfToRemoveBook = $(this.el).parents(".bookshelf-container" );
			console.log(event, this.model.attributes);
			event.originalEvent.dataTransfer.setData('shelftoremovebook', this.shelfToRemoveBook.data('id'));
			event.originalEvent.dataTransfer.setData('booktoremove', this.model.cid);
		},
		addBookToShelf : function(event, shelfToAddBook){
			$(shelfToAddBook).trigger('addBook', this.model);
		}
	});
	return BookView;
});
