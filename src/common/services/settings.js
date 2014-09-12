'use strict';

TADkit.factory('Settings', function() {
	var particles = false;
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
		}
	};
})
