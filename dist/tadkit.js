(function() {
	'use strict';

	// ANGULAR APP
	angular.module('TADkit',['ui.router','ngMaterial','flow','uuid4','d3']);
	     
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
		.factory('Contacts', Contacts);

	// constructor for cluster models ensemble
	function Contacts() {
		return function(positions, colors) {

			// var defaults = {
			// 	visible: true,
			// };	
			// settings = settings || {};
			// angular.extend(this, angular.copy(defaults), settings);

			var contacts;
			var geometry = new THREE.BufferGeometry();

			geometry.addAttribute( 'position', new THREE.DynamicBufferAttribute( positions, 3 ) );
			geometry.addAttribute( 'color', new THREE.DynamicBufferAttribute( colors, 3 ) );

			geometry.computeBoundingSphere();

			geometry.drawcalls.push( {
				start: 0,
				count: 0,
				index: 0
			} );

			var material = new THREE.LineBasicMaterial( {
				vertexColors: THREE.VertexColors,
				blending: THREE.AdditiveBlending,
				transparent: true
			} );

			contacts = new THREE.Line( geometry, material, THREE.LinePieces );

			contacts.name = "Contacts";
			return contacts;
		};
	}
	
	function getContacts(components) {

		var vertexpos = 0;
		var colorpos = 0;
		var numConnected = 0;

// particleCount, particlesData, numConnections, particlePositions, rHalf

		for ( var h = 0; h < particleCount; h++ )
			particlesData[ h ].numConnections = 0;

		for ( var i = 0; i < particleCount; i++ ) {

			// get the particle
			var particleData = particlesData[i];

			particlePositions[ i * 3     ] += particleData.velocity.x;
			particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
			particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

			if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
				particleData.velocity.y = -particleData.velocity.y;

			if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
				particleData.velocity.x = -particleData.velocity.x;

			if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
				particleData.velocity.z = -particleData.velocity.z;

			if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
				continue;

			// Check collision
			for ( var j = i + 1; j < particleCount; j++ ) {

				var particleDataB = particlesData[ j ];
				if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
					continue;

				var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
				var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
				var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
				var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

				if ( dist < effectController.minDistance ) {

					particleData.numConnections++;
					particleDataB.numConnections++;

					var alpha = 1.0 - dist / effectController.minDistance;

					positions[ vertexpos++ ] = particlePositions[ i * 3     ];
					positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
					positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];

					positions[ vertexpos++ ] = particlePositions[ j * 3     ];
					positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
					positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];

					colors[ colorpos++ ] = alpha;
					colors[ colorpos++ ] = alpha;
					colors[ colorpos++ ] = alpha;

					colors[ colorpos++ ] = alpha;
					colors[ colorpos++ ] = alpha;
					colors[ colorpos++ ] = alpha;

					numConnected++;
				}
			}
		}
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