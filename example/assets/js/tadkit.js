(function() {
	'use strict';

	// ANGULAR APP
	angular.module('TADkit',['ui.router','angularFileUpload','ngMaterial','flow','uuid4','d3']);
	     
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TopbarController', TopbarController);

	function TopbarController($state, $scope, $mdSidenav) {
		$scope.$state = $state;
		if ($state.includes('main.project')){
			$scope.projectTitle = $scope.users[0].projects[0].object.title;
		}

		$scope.toggleLeft = function() {
			$mdSidenav('left').toggle();
		};

		$scope.toggleRight = function() {
			$mdSidenav('right').toggle();
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('colorsFromINI', colorsFromINI);

	function colorsFromINI(colorConvert) {

		return {
			parse: function(data) {
				var regex = {
					section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
					param: /^\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_]+)/,
					comment: /^\s*#.*$/
				};
				var value = {};
				var lines = data.split(/\r\n|\r|\n/);
				var section = null;
				lines.forEach(function(line){
					if(regex.comment.test(line) || line === ""){
						return;
					}
					var match;
					if(regex.param.test(line)){
						match = line.match(regex.param);
						if(section){
							var hexColor = colorConvert.nameToHex( match[2] );
							value[section][match[1]] = hexColor;
						}else{
							value[match[1]] = match[2];
						}
					}else if(regex.section.test(line)){
						match = line.match(regex.section);
						value[match[1]] = {};
						section = match[1];
					}else if(line.length === 0 && section){
						section = null;
					}
				});
				return value;
			}
		};
	}
})();

(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http, uuid4) {
		var settings = {};

		return {
			load: function() {
				var deferral = $q.defer();
				var source = "assets/json/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					deferral.resolve(settings);
				} else {
					$http.get(source)
					.success( function(data) {
						settings = data;
						console.log("Settings loaded from " + source);
						deferral.resolve(settings);
					});
				}
				return deferral.promise;
			},
			add: function(setting) {
				// // rewrite for Object
				// settings.push(settingID);
				return settings;
			},
			remove: function(setting) {
				// // rewrite for Object
				// var index = settings.indexOf(settingID);
				// settings.splice(index, 1);
				return settings;
			},
			getState: function(setting) {
				var settingState = settings[settingID].state;
				return settingState;
			},
			get: function() {
				return settings;
			},
			toggle: function(selected) {
				// settings = $filter('filter')(settings, {name: '!settingID'}) // USE THIS???
				angular.forEach(settings, function(name, setting) {
					if (selected == name.id) {
						name.state = !name.state;
					}
				});
				return settings;
			}
		};
	}
})();