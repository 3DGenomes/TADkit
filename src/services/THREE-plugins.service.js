(function() {
	'use strict';
	angular
		.module('THREEPlugins', [])
		.factory('THREEPlugins', THREEPlugins);

	function THREEPlugins(THREEService, $document, $q, $rootScope) {
		// check if THREEService is loaded
		// check if plugin already loaded - add and remove form array
		var plugins = {
			loaded: []
		};

		return {
			load: function(filenames) {
				var self = this;
				var pluginsToLoad = []; // push async functions into list for subsequent processing
				angular.forEach(filenames, function(filename, key) {
					var newPlugin = true;
					for (var i = plugins.loaded.length - 1; i >= 0; i--) {
						if (plugins.loaded[key] == filename) {
							newPlugin = false;
							// console.log("THREE.js plugin " + filename + " already loaded.");
							// return;
						}
					}
					if (newPlugin) {
						var loadPlugin = self.add(filename);
						pluginsToLoad.push(loadPlugin);
					}
				});
				// if none in pluginsToLoad...?
				return $q.all(pluginsToLoad)
				.then(function(results) {
					console.log("THREE.js plugins loaded: " + results); //if none...?
					return window.THREE;
				});
			},
			add: function(filename) {
				var deferred = $q.defer();

				function onScriptLoad() {
					$rootScope.$apply(function() {
						plugins.loaded.push(filename);
						// console.log(plugins.loaded);
						deferred.resolve(filename);
					});
				}

				var pluginTag = $document[0].createElement('script');
					pluginTag.type = 'text/javascript';
					pluginTag.src = 'assets/js/' + filename + '.js';
					pluginTag.async = true;
					pluginTag.onreadystatechange = function () {
						if (this.readyState == 'complete') {
							onScriptLoad();
						}
					};
					pluginTag.onload = onScriptLoad;

				var t = $document[0].getElementsByTagName('body')[0];
					t.appendChild(pluginTag);

				return deferred.promise;
			},
			remove: function(filename) {
				angular.forEach(plugins.loaded, function(plugin, key) {
					if (plugin == filename) {
						plugins.loaded[key].pop();
						// REMOVE DOM ELEMENT?
						console.log("THREE.js plugin " + filename + " removed.");
					}
				});
			}
		};
	}
})();