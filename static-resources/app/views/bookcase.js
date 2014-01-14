define(function(require){
	
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var BookShelfView = require('./bookshelf');
	
	
	var BookCaseView = Backbone.View.extend({
		initialize : function(options){
			_.extend(this, options)
			var self = this;
			this.bookShelves = [];
			this.model = new Backbone.Model({type : options.type, bookShelfs : options.bookShelfs });
			Backbone.Events.listenTo(Backbone.Events, 'BookCaseChanged'+options.type, function(){
				console.log("Book case change called");
				self.updateBookCase();
			});
			this.render(options.bookShelfs);
			localStorage.setItem('bookCase-' + this.model.attributes.type, JSON.stringify(this.model.toJSON()));
			Backbone.Events.listenTo(Backbone.Events, 'BOOK:ADDED', function(bookModel){
				self.addBook(bookModel);
			});
			
		},
		template : Handlebars.compile(require('text!./../templates/bookcase.html')),
		render : function(bookShelfs){
			this.bookShelfs = bookShelfs || this.bookShelfs;
			$(this.el).html(this.template(bookShelfs));
			for(var index in bookShelfs){
				var dataForBookShelf = _.extend({ el : this.$('.' + bookShelfs[index].model.cid), bookCase : this.model , draggable : this.draggable}, bookShelfs[index]);
				this.bookShelves.push(new BookShelfView(dataForBookShelf));
			}
		},
		updateBookCase : function(){
			localStorage.setItem('bookCase-' + this.model.attributes.type, JSON.stringify(this.model.toJSON()));
		},
		addBook : function(bookModel){
			this.addBookToShelf(bookModel);
			this.updateBookCase();
		}
	});
	return BookCaseView;
});


