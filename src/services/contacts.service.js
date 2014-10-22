(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Contacts', Contacts);

	function Contacts ($q, $http, convertColors) {
		var contacts = "";
		return {
			loadContacts: function() {
				var deferral = $q.defer();
				$http.get('assets/json/kartes_example_X_1559-1660.json')
				.success(function(data){
					contacts = data;
					console.log("Contacts retreived from file.");
					deferral.resolve(data);
				});
				return deferral.promise;
			},
			getContacts: function () {
				return contacts;
			},
			// getMinMax: function (array, type) {
			//   var out = [];
			//   array.forEach(function(el) { return out.push.apply(out, el[type]); }, []);
			//   return { min: Math.min.apply(null, out), max: Math.max.apply(null, out) };
			// },
			getColors: function(contacts, position, particlesCount, segments) {
				var colors = [];
				
				// Note that contacts are per particle
				//    whereas position is per fragment.
				//    Therefore push color to array * segments
				
				// Calculate in HSL (Hue, Saturation, Luminosity)
				// Adjust Luminosity based on: normalize(contacts.dist[position])
				var distMin = Infinity, distMax = -Infinity, contact;
				for( contact in contacts) {
					var dist = contacts[contact].dist;
				    if( dist < distMin) distMin = dist;
				    if( dist > distMax) distMax = dist;
				}
				var distRange = distMax - distMin;
				var contactsCount = contacts.length;
				var particlePosition = Math.floor(position/segments);
				// console.log("particlePosition (getCol): "+JSON.stringify(particlePosition));
				
				var colorHex = "#cccccc"; // Base color - ie if none found

				var currentContacts = [];
				for(var h=0; h<contactsCount; h++){
					var current = contacts[h];
					if ( current.a == particlePosition+1 ) {
						currentContacts.push(current);
					}
				}
				var currentContactsCount = currentContacts.length;
				
				// For every fragment [i]...
				for(var i=0; i<particlesCount; i++){
					// For every contact [j]...
					for(var j=0; j<currentContactsCount; j++){
						if ( i == particlePosition) {
							colorHex = "#ff0000";
						}
						// Look for Contacts at current particle + 1
						if ( currentContacts[j].b == i+1 ) {
							// Lumiosity by distance
							var contactDist = currentContacts[j].dist;
							 // Luminosity  hsl(300, 100, 25) to hsl(300, 100, 75) = 50
							var saturationRange = 40;
							var saturation = 10 + parseInt((contactDist * saturationRange) / distRange);
							// console.log(brightness);
							var luminosityRange = 50;
							var luminosity = 90 - parseInt((contactDist * luminosityRange) / distRange);
							// console.log(luminosity);
							// Color Purple
							var contactHSL = "hsl(300," + saturation + "," + luminosity + ")";
							// console.log(contactHSL);
							colorHex = new convertColors.hslToHex(contactHSL).process();
						}
					}
					for(var k=0; k<segments; k++){
						colors.push(colorHex);
					}
					colorHex = "#cccccc";
				}
				// console.log("current position: " + JSON.stringify(particlePosition));
				// console.log(colors);
				return colors;
			}
		};
	}
})();