(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('myHttpInterceptor', function($q) {
		  return {
		    'request': function(config) {
		    	var el = angular.element(document.querySelector('#spinnerdiv'))[0];
		    	if(!angular.isUndefined(el))
		    		el.style.display = "block";
		      return config;
		    },
		
		    'response': function(response) {
		    	var el = angular.element(document.querySelector('#spinnerdiv'))[0];
		    	if(!angular.isUndefined(el))
		    		el.style.display = "none";
		      return response;
		    }
	  };
	});
})();