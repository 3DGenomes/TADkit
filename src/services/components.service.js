(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Components', Components);

	function Components($q, $http, uuid4) {
		var components = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-components.json";
				if( components.loaded.length > 0 ) {
					deferral.resolve(components);
				} else {
					$http.get(source)
					.success( function(data) {
						components.loaded = data;
						console.log("Components (" + data.length + ") loaded from " + source);
						deferral.resolve(components);
					});
				}
				return deferral.promise;
			},
			add: function(details) {
				details = details || ["","","","","","","",[]];
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
							padding : details[6],
							position : details[7]
						}
					},
					view : details[8]
				};
				components.loaded.push(component);
				components.current = components.loaded.length - 1;
				return components;
			},
			remove: function(index) {
				index = index || components.current.index;
				var component = components.loaded.indexOf(index);
				components.loaded.splice(component, 1);
				return components;
			},
			set: function(index) {
				if (index !== undefined || index !== false) components.current.index = index;
				var component = components.loaded[components.current.index];
				return component;
			},
			setViewpoint: function(startCoord, endCoord, scaleOrig) {
				startCoord = startCoord || 0;
				endCoord = endCoord || 4999999;
				var currentComponents = components.loaded;
				// console.log(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.startCoord = startCoord;
					component.view.viewpoint.endCoord = endCoord;
					if (component.object.type === "scene" || component.object.type === "scene-icon") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return components;
			},
			get: function() {
				return components;
			},
			getComponent: function(index) {
				if (index === undefined || index === false) index = components.current.index;
				var component = components.loaded[index];
				return component;
			},
			getComponentById: function (id) {
				var component, found;
				if (id !== undefined || id !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.id === id) {
							component = components.loaded[i];
							found = i;
							// console.log("Component '" + id + "' found!");
						}
					}
				}
				if (!found) {
					component = components.loaded[components.current.index];
					console.log("Component '" + id + "' not found: returning current.");
				}
				return component;
			},
			getComponentByType: function (type) {
				var component, defaultComponent, found;
				if (type !== undefined || type !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.type === type) {
							component = components.loaded[i];
							found = i;
							// console.log("Component type '" + type + "' found!");
						}
						if (components.loaded[i].object.type === "default") {
							defaultComponent = components.loaded[i];
						}
					}
				}
				if (!found) {
					component = defaultComponent;
					console.log("Component type '" + type + "' not found: returning default.");
				}
				return component;
			}
		};
	}
})();