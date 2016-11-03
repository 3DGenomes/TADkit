(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name ui.service:uiTooltipService
	 * @description uiTooltip loads CSS
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 *
	 */
	angular
		.module('ui')
		.factory('uiTooltipService', uiTooltipService);

	function uiTooltipService($rootScope, $log, $document, $q) {
		var ASSETS = "assets/css/";

		function append(filename) {
				var deferred = $q.defer();

				var filetype = filename.substr(filename.lastIndexOf('.')+1);
				var resource = {
					"filename" : filename,
					"filetype" : filetype
				};
				if (filetype == "css") {
					resource.nodeName = "link";
				} else if (filetype == "js") {
					resource.nodeName = "script";
				} else {
					$log.warn("Service: \"" + filetype + "\" is not a valid filetype!");
					// return deferred.resolve();
				}

				function onLoad() {
					$rootScope.$apply(function() {
						$log.debug("Loaded: " + resource.filename);
						deferred.resolve(resource);
					});
				}

				function appendResource(resource) {
					var node = $document[0].createElement(resource.nodeName);
						if (resource.nodeName == "link") {
							node.type = "text/css";
							node.href = ASSETS + resource.filename;
							node.rel = "stylesheet";
						} else if (resource.nodeName == "script") {
							node.type = "text/javascript";
							node.src = ASSETS + resource.filename;
							node.async = true;
							// node.text = config;
						}
						node.onreadystatechange = function () { if (this.readyState == "complete") onLoad(); };
						node.onload = onLoad;

					var parent = $document[0].getElementsByTagName("body")[0];
						parent.appendChild(node);
				}

				appendResource(resource);
				return deferred.promise;
		}

		return {
			load: function() {
				$log.log("Services loading...");

				var resources = [];
				resources.push("ui-tooltip.css");

				var appendResources = [];
				angular.forEach(resources, function(filename, key) {
					appendResources.push(append(filename));
				});

				return $q.all(appendResources)
				.then(function(results) {
					$log.debug(results);
					$log.info("Services (" + resources + ") loaded OK!");
					return results;
				});
			}
		};
	}
})();