(function() {
	'use strict';
	angular
		.module('three', [])
		.factory('threeService', threeService);

	function threeService($document, $q, $rootScope) {
			var d = $q.defer();
			function onScriptLoad() {
				// Load client in the browser
				$rootScope.$apply(function() { d.resolve(window.three); });
			}
			// Create a script tag with ThreeJS as the source
			// and call our onScriptLoad callback when it
			// has been loaded
			var scriptTag = $document[0].createElement('script');
			scriptTag.type = 'text/javascript'; 
			scriptTag.async = true;
			// scriptTag.src = 'http://d3js.org/d3.v3.min.js';
			scriptTag.src = '../bower_components/threejs/build/three.js';
			scriptTag.onreadystatechange = function () {
				if (this.readyState == 'complete') onScriptLoad();
			};
			scriptTag.onload = onScriptLoad;

			var s = $document[0].getElementsByTagName('body')[0];
			s.appendChild(scriptTag);

			return {
				three: function() { return d.promise; }
			};
	}
})();