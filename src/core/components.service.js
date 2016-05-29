(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Components
	 * @description Components for Storyboards.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 * @requires https://github.com/monicao/angular-uuid4
	 *
	 */
	angular
		.module('TADkit')
		.factory('Components', Components);

	function Components($log, $q, $http, uuid4) {
		var components = {
			loaded : [],
			current : {
				index: 0
			}
		};
		
		return {

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#load
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Loads default components from file.
			 * Waits for promise.
			 *
			 * @requires $log
			 * @requires $q
			 * @requires $http
			 *
			 * @returns {Object} Components as promise.
			 */
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-components.json";
				if( components.loaded.length > 0 ) {
					 deferred.resolve(components);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						components.loaded = data;
						$log.debug("Components (" + data.length + ") loaded from " + dataUrl);
						deferred.resolve(components);
					});
				}
				return deferred.promise;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#add
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Adds component to components Object derived from supplied parameters.
			 * 
			 *
			 * @requires uuid4
			 *
			 * @param {Array} [details] Array of parameters for component.
			 *        [uuid,id,title,type,state{width,height,margin,position},view{}]
			 * @returns {Object} Components Object.
			 */
			add: function(details) {
				details = details || ["","","","","","",[]];
				var component = {
					metadata : {
						version : 1.0,
						type : "component",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						type : details[2],
						state : {
							width : details[3],
							height : details[4],
							margin : details[5],
							position : details[6]
						}
					},
					view : details[7]
				};
				components.loaded.push(component);
				components.current = components.loaded.length - 1;
				return components;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#remove
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Removes component from components Object.
			 *
			 * @param {number} [index] Index of component.
			 * @returns {Object} Components Object.
			 */
			remove: function(index) {
				index = index || components.current.index;
				var component = components.loaded.indexOf(index);
				components.loaded.splice(component, 1);
				return components;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#set
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Sets current component.
			 *
			 * @param {number} [index] Index of component.
			 * @returns {Object} The current component.
			 */
			set: function(index) {
				if (index !== undefined || index !== false) components.current.index = index;
				var component = components.loaded[components.current.index];
				return component;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#init
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Initializes component.
			 *
			 * @param {number} [index] Index of component.
			 * @returns {Object} Components.
			 */
			init: function(index) {
				// W.I.P.
				// index = index || components.current.index;
				// var component = components.loaded.indexOf(index);
				// var chromStart = chromStart || 0;
				// var chromEnd = chromEnd || 4999999;
				// var scale = scaleOrig || 1;
				// component.view.viewpoint.chromStart = chromStart;
				// component.view.viewpoint.chromEnd = chromEnd;
				// if (component.object.type === "scene" || component.object.type === "scene-clusters") {
				// 	// For 3D scenes, so as to view whole object for a given FOV:
				// 	// Scale * radius of object = translation from orgin of object
				// 	var angle = component.view.viewpoint.fov / 2;
				// 	scale = Math.tan(angle).toFixed(2);
				// 	$log.debug(scale);
				// }
				// component.view.viewpoint.scale = scale;
				$log.info("Component initialized!");
				return components;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#setViewpoint
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Adds component to components Object.
			 *
			 * @requires uuid4
			 *
			 * @param {number} chromStart Viewpoint start of component.
			 * @param {number} chromEnd Viwepoint end coordinate of component.
			 * @param {number} scaleOrig Viewpoint scale of component.
			 * @returns {Object} Components.
			 */
			setViewpoint: function(chrom, chromStart, chromEnd, scaleOrig) {
				chrom = chrom || "1";
				chromStart = chromStart || 0;
				chromEnd = chromEnd || 4999999;
				var currentComponents = components.loaded;
				angular.forEach(currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chrom = chrom;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-clusters") {
						/* For 3D scenes, so as to view whole object for a given FOV:
						 * Scale * radius of object = translation from orgin of object
						 * See ... service.
						 */
						var angle = component.view.viewpoint.fov / 2;
						scale = Math.tan(angle).toFixed(2);
					}
					component.view.viewpoint.scale = scale;
				});
				return components;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#get
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Get components Object.
			 *
			 * @param {Array} [list] Array of components to get.
			 * @returns {Object} Components.
			 */
			get: function(list) {
				list = list || [];
				var collection = [];
				if (list.length > 0) {
					for (var i = list.length - 1; i >= 0; i--) {
						var id = list[i];
						for (var j = components.loaded.length - 1; j >= 0; j--) {
							var component = components.loaded[j];
							if (component.object.id === id) {
								collection.unshift(component);
								break;
							}
						}
						// if (collection.length === 0) $log.warn("Component id '" + id + "' not found.");
					}
					// if (collection.length > 0) $log.warn("No components loaded.");
				} else {
					// return all components
					collection = components.loaded;
				}
				return collection;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#getComponent
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Get component from components Object. Returns current component if no component index supplied.
			 *
			 * @param {number} [index] Index of component.
			 * @returns {Object} Component.
			 */
			getComponent: function(index) {
				if (index === undefined || index === false) index = components.current.index;
				var component = components.loaded[index];
				return component;
			},

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#getComponentById
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Get component from components Object by ID (required).
			 *
			 * @param {number} id Component ID (Note: not component index).
			 * @returns {Object} Component if found.
			 */
			getComponentById: function(id) {
				var component, found;
				if (id !== undefined || id !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.id === id) {
							component = components.loaded[i];
							found = i;
							$log.debug("Component '" + id + "' found!");
						}
					}
				} else {
					return $log.warn("No valid component ID supplied.");
				}
				if (!found) {
					component = components.loaded[components.current.index];
					$log.warn("Component '" + id + "' not found: returning current.");
				}
				return component;
			},
			// OLD VERSION FROM STORYBOARDS WITH INDEX
			// getComponentById: function (id) {
			// 	var self = this;
			// 	var component, found;
			// 	var components = self.getStoryboard().components;
			// 	if (id !== undefined || id !== false) {
			// 		for (var i = components.length - 1; i >= 0; i--) {
			// 			$log.debug(components[i].object.title);
			// 			if (components[i].object.title === id) {
			// 				component = components[i];
			// 				component.index = i;
			// 				found = true;
			// 				$log.debug("Component '" + id + "' found");
			// 			}
			// 		}
			// 	}
			// 	if (!found) {
			// 		component = components[0];
			// 		$log.warn("Component '" + id + "' not found: returning first.");
			// 	}
			// 	$log.debug(component);
			// 	return component;
			// }

			/**
			 * @ngdoc function
			 * @name TADkit.service:Components#getComponentByType
			 * @methodOf TADkit.service:Components
			 * @kind function
			 *
			 * @description
			 * Get component from components Object by Type (required),
			 *
			 * @param {number} id Component ID (Note: not component index).
			 * @returns {Object} Component if found.
			 */
			getComponentByType: function (type) {
				var self = this;
				var component, defaultComponent, found;
				if (type !== undefined || type !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.type === type) {
							component = components.loaded[i];
							found = i;
							$log.debug("Component type '" + type + "' found!");
						}
						if (components.loaded[i].object.type === "default") {
							defaultComponent = components.loaded[i];
						}
					}
				}
				if (!found) {
					component = defaultComponent;
					$log.warn("Component type '" + type + "' not found: returning default.");
				}
				self.init(component);
				return component;
			}
		};
	}
})();