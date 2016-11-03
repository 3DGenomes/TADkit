(function() {
	'use strict';
	/**
	 * @ngdoc service
	 * @name TADkit.service:Storyboards
	 * @description Storyboards of Projects.
	 *
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$log
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$q
	 * @requires https://code.angularjs.org/1.3.16/docs/api/ng/service/$http
	 * @requires https://github.com/monicao/angular-uuid4
	 * @requires TADkit.service:Settings
	 * @requires TADkit.service:Components
	 *
	 */
	angular
		.module('TADkit')
		.factory('Storyboards', Storyboards);

	function Storyboards(VERBOSE, $log, $q, $http, uuid4, Settings, Components) {
		var storyboards = {
			loaded : [],
			current : {
				index: 0
			}
		};
		
		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-storyboards.json";
				if( storyboards.loaded.length > 0 ) {
<<<<<<< HEAD:src/services/storyboards.service.js
					console.log("Storyboards already loaded.");
					deferral.resolve(storyboards);
=======
					$log.warn("Storyboards already loaded.");
					 deferred.resolve(storyboards);
>>>>>>> upstream/develop:src/core/storyboards.service.js
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						storyboards.loaded = data;
<<<<<<< HEAD:src/services/storyboards.service.js
						console.log("Storyboards (" + data.length + ") loaded from " + dataUrl);
						deferral.resolve(storyboards);
=======
						$log.debug("Storyboards (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(storyboards);
>>>>>>> upstream/develop:src/core/storyboards.service.js
					});
				}
				return deferral.promise;
			},
			add: function(details) {
				details = details || [""];
				var storyboard = {
					metadata : {
						version : 1.0,
						type : "storyboard",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						email : details[2],
						group : details[3],
						permissions : details[4]
					},
					data : details[5]
				};
				storyboards.loaded.push(storyboard);
				storyboards.current = storyboards.loaded.length - 1;
				return storyboards;
			},
			addComponent: function(layer, storyboardId, options) {
				var self = this;
				storyboardId = storyboardId || "default";
				options = options || [];

				var settings = Settings.get();
				// Add a preconfigured conponent from Components
				// - update with options if necessary
				var componentTemplate = Components.getComponentByType(layer.object.type);
				// New component for layer
				var newComponent = angular.copy(componentTemplate);
					newComponent.object.uuid = uuid4.generate();
					newComponent.object.id = layer.object.id;
					newComponent.object.title = layer.object.id;
					newComponent.object.dataset = layer.object.id;
					newComponent.view.settings.step = layer.object.step;
					newComponent.view.settings.color = layer.object.color;
					newComponent.view.viewpoint.species = settings.current.species;
					newComponent.view.viewpoint.chrom = settings.current.chrom;
					newComponent.view.viewpoint.chromStart = settings.current.chromStart;
					newComponent.view.viewpoint.chromEnd = settings.current.chromEnd;
					newComponent.view.viewpoint.scale = settings.views.scale;
					newComponent.view.viewtype = layer.object.type + "-" + layer.object.stepType;
					newComponent.data = layer.data;
					newComponent.layer = layer;

				var storyboard = self.getStoryboardById(storyboardId);
				storyboard.components.push(newComponent);
				return newComponent;
			},
			defaultComponents: function(storyboardId) {
				var self = this;
				storyboardId = storyboardId || "current";
				var storyboard;
				if (storyboardId == "current") {
					storyboard = self.getStoryboard();
				} else {
					storyboard = self.getStoryboardById(storyboardId);					
				}
				while (storyboard.components.length > 6) { // remove all except defaults
					$log.warn("Popping to default components...");
					storyboards.loaded[storyboards.current.index].components.pop();
				}
				return storyboards;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded.indexOf(index);
				storyboards.loaded.splice(storyboard, 1);
				return storyboards;
			},
			removeComponentById: function(id) {
				var self = this;
				if (id !== undefined || id !== false) {
					var storyboard = self.getStoryboard();
					storyboard.components.splice(component.index, 1);
				}
				return storyboards;
			},
			set: function(index) {
				if (index !== undefined || index !== false) storyboards.current.index = index;
				var storyboard = storyboards.loaded[storyboards.current.index];
				return storyboard;
			},
			setComponents: function() {
				var self = this;
				var storyboard = self.getStoryboard();
				var components = Components.get(storyboard.componentList);
				storyboard.components = components;
				return components;
			},
			setViewpoint: function() {
				var settings = Settings.get();
				var currentComponents = storyboards.loaded[storyboards.current.index].components;
				if (VERBOSE) $log.debug(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = settings.views.scale || 1;
					component.view.viewpoint.species = settings.current.species;
					component.view.viewpoint.chrom = settings.current.chrom;
					component.view.viewpoint.chromStart = settings.current.chromStart;
					component.view.viewpoint.chromEnd = settings.current.chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-clusters") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return storyboards;
			},
			update: function(layer) {
				var self = this;
				var components = self.getStoryboard().components;
				// Assign data and layers for each component by type
				angular.forEach(components, function(component, index) {
					// if (component.object.dataset == "default") {
						var layerProximities;
						// if (component.object.type == "scene") {
						// 	component.data = $scope.current.model.data;
						// 	 // component.proximities required for Scenes: layer.colors Saturation
						// 	component.proximities = $scope.allProximities;
						// 	component.layer = $scope.current.layer;
						// 	component.layer.state = {};
						// 	component.layer.object.state.index = Layers.getCurrentIndex();
						// } else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
						if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
							component.data = layer.data;
							// component.layer required for toggle
							component.layer = layer;
						}
						// } else if (component.object.type == "track-proximities") {
						// 	// ie only one... see note above for Calculating Proximities
						// 	// component.data for Scenes: layer.colors Saturation
						// 	component.data = $scope.currentProximities;
						// 	// component.layer required for toggle
						// 	//   and for Scenes: layer.colors Hue
						// 	layer = Layers.getLayerById("proximities");
						// 	component.layer = layer;
						// } else if (component.object.type == "track-restraints") {
						// 	// ie only one... see note above for Calculating Restraints
						// 	// component.data for Scenes: layer.colors Saturation
						// 	component.data = $scope.currentRestraints;
						// 	// component.layer required for toggle
						// 	//   and for Scenes: layer.colors Hue
						// 	layer = Layers.getLayerById("restraints");
						// 	component.layer = layer;
						// }
						// } else if (component.object.type == "track-wiggle") {
						// 	layer = Layers.getLayerById(component.object.dataset);
						// 	component.data = layer.data;
						// 	component.layer = layer; // required for toggle
						// } else {
						// 	// slider and other types of component...
						// }
					// }
				});
			},
			get: function() {
				return storyboards;
			},
			getStoryboard: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded[index];
				return storyboard;
			},
			getStoryboardById: function (id) {
				var storyboard, found;
				if (id !== undefined || id !== false) {
					for (var i = storyboards.loaded.length - 1; i >= 0; i--) {
						if (storyboards.loaded[i].object.id === id) {
							storyboard = storyboards.loaded[i];
							storyboard.index = i;
							found = true;
							$log.debug("Layer \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					storyboard = storyboards.loaded[storyboards.current.index];
					storyboard.index = storyboards.current.index;
					$log.warn("Storyboard '" + id + "' not found: returning current.");
				}
				// console.log(storyboard);
				return storyboard;
			},
			getComponents: function() {
				var self = this;
				var components = self.getStoryboard().components;
				return components;
			}
		};
	}
})();