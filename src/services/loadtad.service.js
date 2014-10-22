(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('loadTAD', loadTAD);

	function loadTAD ($http, TAD, Assembly, Genes, Proteins, Contacts){

		var species = "";
		var slice = "X:0-4999999"; // Ensembl max :P
		// LOAD TAD
		var initialiseData = TAD.loadTAD()
		.then(function(promise){
			// LOAD ASSEMBLY 
			species = TAD.getSpeciesUrl();
			return Assembly.loadInfoAssembly(species);
		})
		.then(function(promise){
			// LOAD GENES
			slice = TAD.getSlice();
			return Genes.loadRegionGenes(species, slice);
		})
		.then(function(promise){
			// LOAD BIOTYPE COLORS
			return Assembly.loadBiotypeColors();
		})
		.then(function(promise){
			// LOAD PROTEINS
			return Proteins.loadProteins(species, slice);
		})
		.then(function(promise){
			// LOAD CONTACTS
			return Contacts.loadContacts();
		});
	
		return {
			promise:initialiseData,
			newTAD: function () {
				return null;
			},
		};
	}
})();