define(function(require) {

	var Backbone = require('backbone');
	var Handlebars = require('handlebars');
	var BookView = require('./book');

	var BookShelf = Backbone.View.extend({
		initialize : function(options) {
			_.extend(this, options);
			var self = this;
			this.listenTo(this.collection, 'remove', function(){
 				Backbone.Events.trigger('BookCaseChanged' + options.bookCase.attributes.type);
				
				self.render();
			});
			this.listenTo(this.collection, 'add', function(){
 				Backbone.Events.trigger('BookCaseChanged' + options.bookCase.attributes.type);
				
				self.render();
			})
			this.render();
		},
		events : {
			'addBook' : 'addBook',
			'removeBook' : 'removeBook'
		},
		template : Handlebars
				.compile(require('text!./../templates/bookshelf.html')),
		render : function() {
			$(this.el).html(this.template(this));
			for(var index in this.collection.models){
				new BookView({el : this.$('.' + this.collection.models[index].cid), model :this.collection.models[index], draggable : this.draggable});
			}
		},
		addBook : function(event, model){
			//console.log("Book Added", event, id);
			this.collection.add(model);
		},
		removeBook : function(event, id){
			console.log("Book removed", event, id)
			this.collection.remove(id);
		}
	});
	return BookShelf;
});