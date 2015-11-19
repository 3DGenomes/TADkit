(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Textures', Textures);

	function Textures($q) {
		var textures = {
			loaded: []
		};

		return {
			load: function(filenames) {
				console.log(filenames);
				
				var self = this;
				var imagesToLoad = []; // push async functions into list for subsequent processing
				angular.forEach(filenames, function(filename, key) {
					var newImage = true;
					for (var i = textures.loaded.length - 1; i >= 0; i--) {
						if (textures.loaded[key] == filename) newImage = false;
					}
					if (newImage) {

						var loadImage = self.add(filename);

						imagesToLoad.push(loadImage);
					}
				});

				return $q.all(imagesToLoad)
				.then(function(results) {
					if (results.length > 0) console.log("Images loaded: " + results);
					return results;
				});
			},
			add: function(filename) {
				console.log("Texture added!");
			},
			remove: function(filename) {
				console.log("Texture removed!");
			}
		};
	}
})();