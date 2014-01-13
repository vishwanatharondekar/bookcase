var require = {
		baseUrl : '/static-resources/',
		paths : {
			backbone : 'libraries/backbone/backbone.min',
			jquery : 'libraries/jquery/jquery-2.0.0.min',
			underscore : 'libraries/underscore/underscore.min',
			handlebars : 'libraries/handlebars/handlebarshelpers',
			handlebarshelpers :'libraries/handlebars/handlebars',
			css : 'libraries/require/css',
			normalize : 'libraries/require/normalize',
			async : 'libraries/require/async',
			text : 'libraries/require/text',
			envvariables : 'core/envvariables',
			localStorage : 'libraries/require/backbone.localstorage',
			formvalidationwrapper : 'plugins/jquery/formvalidation/formvalidation'/*,
			autocomplete : 'libraries/jquery-ui/js/ui/minified/jquery.ui.autocomplete.min',
			uicore : 'libraries/jquery-ui/js/ui/minified/jquery.ui.core.min',
			uiwidget : 'libraries/jquery-ui/js/ui/minified/jquery.ui.widget.min',
			uimenu : 'libraries/jquery-ui/js/ui/minified/jquery.ui.menu.min',
			uiposition : 'libraries/jquery-ui/js/ui/minified/jquery.ui.position.min',
			animate : 'plugins/jquery/animate-enhanced/jquery.animate-enhanced.min'*/
		},
		shim : {
			'backbone' : {
				deps : [ 'underscore', 'jquery' ],
				exports : 'Backbone'
			},
			'handlebars' : {
				deps : [ 'handlebarshelpers' ]
			},
			'persistence' : {
				exports : 'Lawnchair'
			},
			'animate' : {
				deps : [ 'jquery' ],
			},
			'autocomplete' : {
				deps : [ 'jquery', 'uicore' , 'uiwidget', 'uimenu', 'uiposition'],
			},
			'uimenu' : {
				deps : [ 'uiwidget'],
			},
			localStorage : {
				deps : [ 'backbone']
			}
		},
		waitSeconds : 60,
		/* urlArgs: "v=0.25",  */
		deps : ['app/apploader']
};