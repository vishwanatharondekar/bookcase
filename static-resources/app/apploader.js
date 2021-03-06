var books = null;
define(function(require){
	
	var Handlebars = require('handlebars');
	var Backbone = require('backbone');
	var UserBookCase = require('./views/userbookcase');
	var GenreBookCase = require('./views/genrebookcase');
	var BookShelfModel = require('./models/bookshelfmodel');
	var BookModel = require('./models/bookmodel');
	var BookShelfView = require('./views/bookshelf');
	var BookView = require('./views/book');
	var BookCollection   = require('./collections/bookCollection')
	
	
	var userBookCaseData = {
		    "bookcase": [
		                 {
		                     "title": "shelf 1",
		                     "id": "s1",
		                     "books": [
		                         {
		                             "title": "Secrets of the JavaScript Ninja",
		                             "isbn": "193398869X",
		                             "author": "John Resig",
		                             "genre": "Technology"
		                         },
		                         {
		                             "title": "Ender's Game (The Ender Quintet)",
		                             "isbn": "0812550706",
		                             "author": "Orson Scott Card",
		                             "genre": "Sci Fi"
		                         },
		                         {
		                             "title": "I, Robot",
		                             "isbn": "055338256X",
		                             "author": "Isaac Asimov",
		                             "genre": "Sci Fi"
		                         }
		                     ]
		                 },
		                 {
		                     "title": "shelf 2",
		                     "id": "s2",
		                     "books": [
		                         {
		                             "title": "JavaScript Patterns",
		                             "isbn": "0596806752",
		                             "author": "Stoyan Stefanov",
		                             "genre": "Technology"
		                         },
		                         {
		                             "title": "Abraham Lincoln",
		                             "isbn": "0195374525",
		                             "author": "James M. McPherson",
		                             "genre": "Biography"
		                         }
		                     ]
		                 },
		                 {
		                     "title": "shelf 3",
		                     "id": "s3",
		                     "books": [
		                         {
		                             "title": "JavaScript: The Good Parts",
		                             "isbn": "0596517742",
		                             "author": "Douglas Crockford",
		                             "genre": "Technology"
		                         },
		                         {
		                             "title": "A Clash of Kings (A Song of Ice and Fire, Book 2)",
		                             "isbn": "0345535421",
		                             "author": "R.R. Martin",
		                             "genre": "Fantasy"
		                         },
		                         {
		                             "title": "A Storm of Swords: A Song of Ice and Fire: Book Three",
		                             "isbn": "055357342X",
		                             "author": "R.R. Martin",
		                             "genre": "Fantasy"
		                         }
		                     ]
		                 },
		                 {
		                     "title": "shelf 4",
		                     "id": "s4",
		                     "books": [
		                         {
		                             "title": "A Game of Thrones (A Song of Ice and Fire, Book 1)",
		                             "isbn": "0553593714",
		                             "author": "R.R. Martin",
		                             "genre": "Fantasy"
		                         },
		                         {
		                             "title": "Steve Jobs",
		                             "isbn": "1451648545",
		                             "author": "Walter Isaacson",
		                             "genre": "Biography"
		                         },
		                         {
		                             "title": "Jim Henson: The Biography",
		                             "isbn": "0345526112",
		                             "author": "Brian Jay Jones",
		                             "genre": "Biography"
		                         },
		                         {
		                             "title": "Do Androids Dream of Electric Sheep?",
		                             "isbn": "0345404475",
		                             "author": "Philip K. Dick",
		                             "genre": "Sci Fi"
		                         }
		                     ]
		                 }
		             ]
		         };
	
	
	var AppView = Backbone.View.extend({
		initialize : function(){
			booksGlobal = this.books = new BookCollection();
			
			var userBookShelfsDataArray = new Array();
			
			var bookShelfArray = null;
			if(localStorage['bookCase-user']){
				var localStorageData = JSON.parse(localStorage['bookCase-user']);
				var localBookShelfs = localStorageData.bookShelfs;
				var bookShelfs = [];
				
				for(var index in localBookShelfs){
					var localBookShelf = localBookShelfs[index];
					var objBookShelf = {};
					_.extend(objBookShelf, localBookShelf.model);
					_.extend(objBookShelf, {books : localBookShelf.collection});
					bookShelfs.push(objBookShelf);
				}
				console.log('bookShelfs Calculated from localStorage' ,  bookShelfs);
				bookShelfArray = bookShelfs;
			} else {
				bookShelfArray = userBookCaseData.bookcase;
			}

			var allGeneres = {};
			for(var index in bookShelfArray){
				var bookShelf = bookShelfArray[index];
				var books = bookShelf.books;
				var booksCollectionForShelf = new Backbone.Collection();
				
				for(var bookIndex in books){
					var bookModel = new BookModel(books[bookIndex]);
					this.books.add(bookModel);
					allGeneres[books[bookIndex].genre]=true;
					booksCollectionForShelf.add(bookModel);
				}
				delete bookShelf.books;
				
				var bookShelfModel = new BookShelfModel(bookShelf);
				userBookShelfsDataArray.push({model : bookShelfModel, collection : booksCollectionForShelf});
			}
			
			var genreBookShelfsDataArray = new Array();
			for(var genreIndex in allGeneres){
				var genre = genreIndex;
				var booksCollectionForShelf = new Backbone.Collection(this.books.filter(function(book) {
					return book.get("genre") === genre;
				}));
				var bookShelfModel = new BookShelfModel({ "title": genre});
				genreBookShelfsDataArray.push({model : bookShelfModel, collection : booksCollectionForShelf});
			}
			this.render();

			this.userBookCase = new UserBookCase({el : this.$('.js-user-bookcase'), bookShelfs : userBookShelfsDataArray, type : 'user', draggable : true});
			this.genreBookCase = new GenreBookCase({el : this.$('.js-genre-bookcase'), bookShelfs : genreBookShelfsDataArray, type :  'genre'});
		},
		events : {
			'click .js-book-case-button' : 'showBookCase' ,
			'click .btn-save-book' : 'saveBook' 
		},
		render : function(){
			$(this.el).html(this.template());
			this.userBookCase;
		},
		template : Handlebars.compile(require('text!./templates/app.html')),
		showBookCase : function(bookCase){
			this.$('.js-book-case').hide();
			var bookCaseToShow = $(event.target).data('bookcase');
			this.$(bookCaseToShow).show('slow');
		},
		saveBook : function(){
			var book = {
                "title": this.$('.js-book-title').val(),
                "isbn": this.$('.js-book-isbn').val(),
                "author": this.$('.js-book-author').val(),
                "genre": this.$('.js-book-genre').val()
			};
			var bookModel = new Backbone.Model(book);
			this.books.add(bookModel);
			Backbone.Events.trigger('BOOK:ADDED', bookModel);
		}
	});
	
	
	new AppView({el : $('.app-container')});
	
});