/**!
 * Genome Maps https://genomemaps.org
 * Jsorolla genome-viewer https://github.com/opencb/jsorolla
 * @author  Mike Goodstadt  <mikegoodstadt@gmail.com>
 * @version 0.0.1
 */
(function() {
	'use strict';
	angular
		.module('browsers')
		.factory('JsorollaService', JsorollaService);

	function JsorollaService($rootScope, $log, $document, $q, $timeout) {
		var ASSETS = "assets/js/genome-viewer/";

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
					$log.warn("JsorollaService: \"" + filetype + "\" is not a valid filetype!");
					// return deferred.resolve();
				}

				function onLoad() {
					$rootScope.$apply(function() {
						// console.log("Loaded: " + resource.filename);
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
				$log.log("OpenCB Jsorolla Genome Viewer loading...");

				var resources = [];
				resources.push("vendor/fontawesome/css/font-awesome.min.css");
				resources.push("vendor/qtip2/jquery.qtip.min.css");
				resources.push("styles/css/style.css");
				resources.push("vendor/underscore/underscore-min.js");
				resources.push("vendor/backbone/backbone.js");
				resources.push("vendor/jquery/dist/jquery.min.js");
				resources.push("vendor/qtip2/jquery.qtip.min.js");
				resources.push("vendor/uri.js/src/URI.min.js");
				resources.push("gv-config.js");
				resources.push("genome-viewer.js");

				var appendResources = [];
				angular.forEach(resources, function(filename, key) {
					appendResources.push(append(filename));
				});

				return $q.all(appendResources)
				.then(function(results) {
					$log.debug(results);
					$log.log("OpenCB Jsorolla Genome Viewer loaded OK!");
					return results;
				});
			}
		};
	}
})();