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

	function Storyboards($log, $q, $http, uuid4, Settings, Components) {
		var storyboards = {
			loaded : [],
			current : {
				index: 0
			}
		};
		
		return {
			load: function() {
				var deferred = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-storyboards.json";
				if( storyboards.loaded.length > 0 ) {
					$log.warn("Storyboards already loaded.");
					 deferred.resolve(storyboards);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						storyboards.loaded = data;
						$log.debug("Storyboards (" + data.length + ") loaded from " + dataUrl);
						 deferred.resolve(storyboards);
					});
				}
				return deferred.promise;
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
			addComponent: function(overlay, storyboardId, options) {
				var self = this;
				storyboardId = storyboardId || "default";
				options = options || [];

				var settings = Settings.get();
				// Add a preconfigured conponent from Components
				// - update with options if necessary
				var componentTemplate = Components.getComponentByType(overlay.object.type);
				// New component for overlay
				var newComponent = angular.copy(componentTemplate);
					newComponent.object.uuid = uuid4.generate();
					newComponent.object.id = overlay.object.id;
					newComponent.object.title = overlay.object.id;
					newComponent.object.dataset = overlay.object.id;
					newComponent.view.settings.step = overlay.object.step;
					newComponent.view.settings.color = overlay.object.color;
					newComponent.view.viewpoint.chromStart = settings.current.chromStart;
					newComponent.view.viewpoint.chromEnd = settings.current.chromEnd;
					newComponent.view.viewpoint.scale = settings.views.scale;
					newComponent.view.viewtype = overlay.object.type + "-" + overlay.object.stepType;
					newComponent.data = overlay.data;
					newComponent.overlay = overlay;

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
					var component = self.getComponentById(id);
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
			setViewpoint: function(chromStart, chromEnd, scaleOrig) {
				chromStart = chromStart || 0;
				chromEnd = chromEnd || 4999999;
				var currentComponents = storyboards.loaded[storyboards.current.index].components;
				$log.debug(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-clusters") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return storyboards;
			},
			update: function(overlay) {
				var self = this;
				var components = self.getStoryboard().components;
				// Assign data and overlays for each component by type
				angular.forEach(components, function(component, index) {
					// if (component.object.dataset == "default") {
						var overlayProximities;
						// if (component.object.type == "scene") {
						// 	component.data = $scope.current.model.data;
						// 	 // component.proximities required for Scenes: overlay.colors Saturation
						// 	component.proximities = $scope.allProximities;
						// 	component.overlay = $scope.current.overlay;
						// 	component.overlay.state = {};
						// 	component.overlay.object.state.index = Overlays.getCurrentIndex();
						// } else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
						if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
							component.data = overlay.data;
							// component.overlay required for toggle
							component.overlay = overlay;
						}
						// } else if (component.object.type == "track-proximities") {
						// 	// ie only one... see note above for Calculating Proximities
						// 	// component.data for Scenes: overlay.colors Saturation
						// 	component.data = $scope.currentProximities;
						// 	// component.overlay required for toggle
						// 	//   and for Scenes: overlay.colors Hue
						// 	overlay = Overlays.getOverlayById("proximities");
						// 	component.overlay = overlay;
						// } else if (component.object.type == "track-restraints") {
						// 	// ie only one... see note above for Calculating Restraints
						// 	// component.data for Scenes: overlay.colors Saturation
						// 	component.data = $scope.currentRestraints;
						// 	// component.overlay required for toggle
						// 	//   and for Scenes: overlay.colors Hue
						// 	overlay = Overlays.getOverlayById("restraints");
						// 	component.overlay = overlay;
						// }
						// } else if (component.object.type == "track-wiggle") {
						// 	overlay = Overlays.getOverlayById(component.object.dataset);
						// 	component.data = overlay.data;
						// 	component.overlay = overlay; // required for toggle
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
							$log.debug("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					storyboard = storyboards.loaded[storyboards.current.index];
					storyboard.index = storyboards.current.index;
					$log.warn("Storyboard '" + id + "' not found: returning current.");
				}
				return storyboard;
			},
			getComponents: function() {
				var self = this;
				var components = self.getStoryboard().components;
				return components;
			},
			getComponentById: function (id) {
				var self = this;
				var component, found;
				var components = self.getStoryboard().components;
				if (id !== undefined || id !== false) {
					for (var i = components.length - 1; i >= 0; i--) {
						$log.debug(components[i].object.title);
						if (components[i].object.title === id) {
							component = components[i];
							component.index = i;
							found = true;
							$log.debug("Component '" + id + "' found");
						}
					}
				}
				if (!found) {
					component = components[0];
					$log.warn("Component '" + id + "' not found: returning first.");
				}
				$log.debug(component);
				return component;
			}
		};
	}
})();