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

				var speciesName = scope.component.view.viewpoint.species.toLowerCase();
				var chromosome = scope.component.view.viewpoint.chrom;
				var chromStart = scope.component.view.viewpoint.chromStart;
				var chromEnd = scope.component.view.viewpoint.chromEnd;

				JsorollaService.load().then(function() {
					var genomeViewer;

					var AVAILABLE_SPECIES;
					// var CELLBASE_HOST = 'https://wwwdev.ebi.ac.uk/cellbase';
					// var CELLBASE_HOST = 'https://www.ebi.ac.uk/cellbase';
					var CELLBASE_HOST = "http://bioinfodev.hpc.cam.ac.uk/cellbase";
					// var CELLBASE_HOST = "http://bioinfo.hpc.cam.ac.uk/cellbase";

					var CELLBASE_VERSION = "v3";

					var region = new Region({ chromosome: chromosome, start: chromStart, end: chromEnd });

					getSpecies(function(s) {
						AVAILABLE_SPECIES = s;
						run();
					});

					function getSpecies(callback) {
						CellBaseManager.get({
							host: CELLBASE_HOST,
							category: "meta",
							subCategory: "species",
							success: function(r) {
								var taxonomies = r.response[0].result[0];
								for (var taxonomy in taxonomies) {
									var newSpecies = [];
									for (var i = 0; i < taxonomies[taxonomy].length; i++) {
										var species = taxonomies[taxonomy][i];
										for (var j = 0; j < species.assemblies.length; j++) {
											var s = Utils.clone(species);
											s.assembly = species.assemblies[j];
											delete s.assemblies;
											newSpecies.push(s);
										}
									}
									taxonomies[taxonomy] = newSpecies;
								}
								callback(taxonomies);
							}
						});
					}

					function run() {
						var species;
						for (var kingdom in AVAILABLE_SPECIES) {
							var kingdomSpecies = AVAILABLE_SPECIES[kingdom];
							for (var j = kingdomSpecies.length - 1; j >= 0; j--) {
								var speciesTest = kingdomSpecies[j];
								if (speciesTest.scientificName.toLowerCase() == speciesName) {
									species = speciesTest;
									$log.info( "Cellbase: Found species: " + speciesTest.scientificName + " (id: " + speciesTest.id + ")" );
								}
							}
						}
						if (!species) {
							species = AVAILABLE_SPECIES.metazoa.items[1]; // second in list of Metazoa == Drosophila Melanogaster
							$log.warn( "Cellbase: Species not found! Returning: " + species.scientificName );
						}

						genomeViewer = new GenomeViewer({
							cellBaseHost : CELLBASE_HOST,
							cellBaseVersion : CELLBASE_VERSION,
							target : target,
							width : width + 18, // for hardocded scroll margin in genome-viewer.js line 25527
							region : region,
							availableSpecies : AVAILABLE_SPECIES,
							species : species,
							sidePanel : false,
							autoRender : true,
							resizable : true,
							// quickSearchResultFn : quickSearchResultFn,
							// quickSearchDisplayKey: false,
							karyotypePanelConfig: {
								collapsed : false,
								collapsible : false
							},
							chromosomePanelConfig : {
								collapsed : false,
								collapsible : false
							},
							navigationBarConfig : {
								componentsConfig : {
								// restoreDefaultRegionButton : false,
								// regionHistoryButton : false,
								// speciesButton : false,
								// chromosomesButton : false,
								// karyotypeButton : false,
								// chromosomeButton : false,
								// regionButton : false,
								// zoomControl : false,
								// windowSizeControl : false,
								// positionControl : false,
								// moveControl : false,
								// autoheightButton : false,
								// compactButton : false,
								// searchControl : false
								}
							},
							handlers : {
								'region:change' : function (e) {
									// console.log(e);
								}
							},
							// chromosomeList : [],
							trackListTitle : "",
							drawNavigationBar : false,
							drawKaryotypePanel : false,
							drawChromosomePanel : false,
							drawOverviewTrackListPanel : false
						});

						var tracks = [];

						// var sequence = new FeatureTrack({
						// 	title: 'Sequence',
						// 	height: 25,
						// 	visibleRegionSize: 200,

						// 	renderer: new SequenceRenderer(),
						// 	dataAdapter: new CellBaseAdapter({
						// 		category: "genomic",
						// 		subCategory: "region",
						// 		resource: "sequence",
						// 		params: {},
						// 		species: genomeViewer.species,
						// 		cacheConfig: {
						// 			chunkSize: 100
						// 		}
						// 	})
						// });
						// tracks.push(sequence);

						var gene = new GeneTrack({
							title : undefined,
							minHistogramRegionSize : 20000000,
							maxLabelRegionSize : 10000000,
							minTranscriptRegionSize : 200000,
							height : 100,

							renderer: new GeneRenderer({
								handlers: {
									'feature:click' : function(event) {
										// console.log("Gene track clicked");
										// console.log(event);
									}
								}
							}),

							dataAdapter : new CellBaseAdapter({
								category : "genomic",
								subCategory : "region",
								resource : "gene",
								species : genomeViewer.species,
								params : {
									exclude : 'transcripts'
									// exclude : "transcripts.tfbs,transcripts.xrefs,transcripts.exons.sequence"
								},
								cacheConfig : {
									chunkSize : 100000
								}
							})
						});
						tracks.push(gene);

						// var renderer = new FeatureRenderer(FEATURE_TYPES.gene);
						// renderer.on({
						// 	'feature:click': function(event) {
						// 		// feature click event example
						// 		console.log(event)
						// 	}
						// });
						// var geneOverview = new FeatureTrack({
						// 	title: 'Gene overview',
						// 	minHistogramRegionSize: 20000000,
						// 	maxLabelRegionSize: 10000000,
						// 	height: 100,

						// 	renderer: renderer,

						// 	dataAdapter: new CellBaseAdapter({
						// 		category: "genomic",
						// 		subCategory: "region",
						// 		resource: "gene",
						// 		params: {
						// 			exclude: 'transcripts,chunkIds'
						// 		},
						// 		species: genomeViewer.species,
						// 		cacheConfig: {
						// 			chunkSize: 100000
						// 		}
						// 	})
						// });
						// genomeViewer.addOverviewTrack(geneOverview);

						// var snp = new FeatureTrack({
						// 	title: 'SNP',
						// 	featureType: 'SNP',
						// 	minHistogramRegionSize: 12000,
						// 	maxLabelRegionSize: 3000,
						// 	height: 120,
						// 	renderer: new FeatureRenderer(FEATURE_TYPES.snp),
						// 	dataAdapter: new CellBaseAdapter({
						// 		category: "genomic",
						// 		subCategory: "region",
						// 		resource: "snp",
						// 		params: {
						// 			exclude: 'transcriptVariations,xrefs,samples'
						// 		},
						// 		species: genomeViewer.species,
						// 		cacheConfig: {
						// 			chunkSize: 10000
						// 		}
						// 	})
						// });
						// tracks.push(snp);

						// var customTrack = new FeatureTrack({
						// 	title: 'custom track',
						// 	minHistogramRegionSize: 12000,
						// 	maxLabelRegionSize: 3000,
						// 	height: 120,

						// 	renderer: new FeatureRenderer(),

						// 	dataAdapter: new FeatureTemplateAdapter({
						// 	  multiRegions: true,
						// 	  histogramMultiRegions: false,
						// 	  uriTemplate: 'https://dcc.icgc.org/api/browser/gene?segment={region}&resource=gene',
						// 	  cacheConfig: {
						// 		chunkSize: 100000
						// 	  }
						// 	})
						// });
						// tracks.push(customTrack);

						genomeViewer.addTrack(tracks);
						genomeViewer.draw();

						$log.debug(genomeViewer);
						$log.info("Browser directive loaded");
					}
				});
			}
		};
	}
})();