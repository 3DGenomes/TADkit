(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings () {

		var particles = false;
		var chromatin = true;
		var tadcolors = true;
		var genes = false;
		var contacts = false;
		var hp1 = false;
		var brm = false;
		var mrg15 = false;
		var pc = false;
		var h1 = false;
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
			toggleTAD: function () {
				tadcolors = this.toggle(tadcolors);
				return tadcolors;
			},
			getTAD: function () {
				return tadcolors;
			},
			toggleGenes: function () {
				genes = this.toggle(genes);
				return genes;
			},
			getGenes: function () {
				return genes;
			},
			toggleContacts: function () {
				contacts = this.toggle(contacts);
				return contacts;
			},
			getContacts: function () {
				return contacts;
			},
			toggleHP1: function () {
				hp1 = this.toggle(hp1);
				return hp1;
			},
			getHP1: function () {
				return hp1;
			},
			toggleBRM: function () {
				brm = this.toggle(brm);
				return brm;
			},
			getBRM: function () {
				return brm;
			},
			toggleMRG15: function () {
				mrg15 = this.toggle(mrg15);
				return mrg15;
			},
			getMRG15: function () {
				return mrg15;
			},
			togglePC: function () {
				pc = this.toggle(pc);
				return pc;
			},
			getPC: function () {
				return pc;
			},
			toggleH1: function () {
				h1 = this.toggle(h1);
				return h1;
			},
			getH1: function () {
				return h1;
			},
			switchColors: function () {
				
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
	}
})();