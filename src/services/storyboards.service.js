(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Storyboards', Storyboards);

	function Storyboards($q, $http, uuid4) {
		var storyboards = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-storyboards.json";
				if( storyboards.loaded.length > 0 ) {
					deferral.resolve(storyboards);
				} else {
					$http.get(dataUrl)
					.success( function(data) {
						storyboards.loaded = data;
						console.log("Storyboards (" + data.length + ") loaded from " + dataUrl);
						deferral.resolve(storyboards);
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
			addComponent: function(storyboardId, component, options) {
				// Add a preconfigured conponent from Components - update with options if necessary
				var self = this;
				storyboardId = storyboardId || "default";
				options = options || [""];
				var storyboard = self.getStoryboardById(storyboardId);
				storyboard.components.push(component);
				return storyboard;
			},
			defaultComponents: function(storyboardId) {
				var self = this;
				storyboardId = storyboardId || "default";
				var storyboard = self.getStoryboardById(storyboardId);
				while (storyboard.components.length > 6) { // remove all except defaults
					storyboard.components.pop();
				}
				return storyboard;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded.indexOf(index);
				storyboards.loaded.splice(storyboard, 1);
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
				// console.log(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-icon") {
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
							// console.log("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					storyboard = storyboards.loaded[storyboards.current.index];
					storyboard.index = storyboards.current.index;
					console.log("Storyboard '" + id + "' not found: returning current.");
				}
				// console.log(storyboard);
				return storyboard;
			}
		};
	}
})();