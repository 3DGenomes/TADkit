(function() {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name TADkit.directive:tkComponentBrowserJsorolla
	 * @restrict EA
	 *
	 * @description
	 * OpenCB/jsorolla/	genome-viewer directive that is replaced on complie
	 * by real component directive from supplied object type.
	 * e.g. from a array of components objects
	 *
	 * @example
	 * `<div tk-component-track-browser-jsorolla ng-repeat='component in components'></div>`
	 *
	 */
	angular
		.module('TADkit')
		.directive('tkComponentBrowserJsorolla', tkComponentBrowserJsorolla);

	function tkComponentBrowserJsorolla(VERBOSE, $log, JsorollaService) {
		return {
			restrict: 'E',
			templateUrl: 'assets/templates/browser.html',
			link: function(scope, element, attrs) {

				// var target =  element[0].firstElementChild.id;
				var target = scope.component.object.idIndex + "-holder";

				var componentMargin = parseInt(scope.component.view.settings.margin);
				var margin = {
						top: parseInt(scope.component.view.settings.padding.top),
						right: parseInt(scope.component.view.settings.padding.right),
						bottom: parseInt(scope.component.view.settings.padding.bottom),
						left: parseInt(scope.component.view.settings.padding.left)
					},
					scale = 4,
					trackHeight = parseInt(scope.component.view.settings.heightInner),
					nodeHeight = trackHeight * 0.5,
					verticalOffset = (trackHeight - nodeHeight) * 0.5,
					nodePadding = 0,
					nodeColor = scope.component.view.settings.color;

				var component = element[0].parentNode;
				var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
					height = trackHeight - margin.top - margin.bottom;

				var genomeViewer = null;
				
				function speciesCB2JS() {
					// convert Cellbase SPECIES to Jsorola SPECIES...
					var species = { "text": "Species", "items": [] };
					angular.forEach(SPECIES, function(kingdom, index) {
						var newKingdom = {"text": index, "items": kingdom };
						species.items.push(newKingdom);
					});
					return species;
				}

				JsorollaService.load().then(function() {
					var kingdom = "metazoa";
					var species = {};
					var availibleSpecies = speciesCB2JS();
					var speciesName = scope.component.view.viewpoint.species.toLowerCase();
					for (var i = availibleSpecies.items.length - 1; i >= 0; i--) {
						var kingdomSpecies = availibleSpecies.items[i].items;
						for (var j = kingdomSpecies.length - 1; j >= 0; j--) {
							var speciesTest = kingdomSpecies[j];
							var lowerName = speciesTest.scientificName.toLowerCase();
							if (lowerName == speciesName) {
								species = speciesTest;
								$log.info( "Cellbase: Found species: " + lowerName + " (id: " + speciesTest.id + ")" );
							}
						}
					}

					if (!species) {
						species = availibleSpecies.metazoa.items[1]; // second in list of Metazoa == Drosophila Melanogaster
						$log.warn( "Cellbase: Species not found! Returning: " + species.scientificName );
					}

					var region = new Region({
						chromosome: scope.component.view.viewpoint.chrom,
						start: scope.component.view.viewpoint.chromStart,
						end: scope.component.view.viewpoint.chromEnd
					});

					var CELLBASE_HOST = 'https://wwwdev.ebi.ac.uk/cellbase/webservices/rest';

					genomeViewer = new GenomeViewer({
						cellBaseHost: CELLBASE_HOST,
						cellBaseVersion: 'v3',
						target: target,
						width: width,
						region: region,
						availableSpecies: availibleSpecies,
						species: species.id,
						sidePanel: false,
						autoRender: true,
						resizable: true,
				//        quickSearchResultFn:quickSearchResultFn,
				//        quickSearchDisplayKey:,
						karyotypePanelConfig: {
							collapsed: false,
							collapsible: true
						},
						chromosomePanelConfig: {
							collapsed: false,
							collapsible: true
						},
						navigationBarConfig: {
							componentsConfig: {
				//                restoreDefaultRegionButton:false,
				//                regionHistoryButton:false,
				//                speciesButton:false,
				//                chromosomesButton:false,
				//                karyotypeButton:false,
				//                chromosomeButton:false,
				//                regionButton:false,
				//                zoomControl:false,
				//                windowSizeControl:false,
				//                positionControl:false,
				//                moveControl:false,
				//                autoheightButton:false,
				//                compactButton:false,
				//                searchControl:false
							}
						},
						handlers: {
							'region:change': function (e) {
								console.log(e);
							}
						}
				//        chromosomeList:[]
				//            trackListTitle: ''
				//            drawNavigationBar = true;
				//            drawKaryotypePanel: false,
				//            drawChromosomePanel: false,
				//            drawOverviewTrackListPanel: false

					});

					$log.debug(genomeViewer);
					$log.info("Browser directive loaded");
				});		
			}
		};
	}
})();