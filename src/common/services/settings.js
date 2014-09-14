'use strict';

TADkit.factory('Settings', function() {
	var particles = false;
	var chromatin = true;
	var sense = true;
	return {
		toggle: function (bool) {
			bool = !bool;
			return bool;
		},
		toggleParticles: function () {
			particles = this.toggle(particles);
			return particles;
		},
		getParticles: function () {
			return particles;
		},
		toggleChromatin: function () {
			chromatin = this.toggle(chromatin);
			return chromatin;
		},
		getChromatin: function () {
			return chromatin;
		},
		toggleSense: function () {
			sense = this.toggle(sense);
			console.log(sense);
			return sense;
		},
		getSense: function () {
			return sense;
		}
	};
})


TADkit.factory('test', function() {
	return "Here it is!";
})
