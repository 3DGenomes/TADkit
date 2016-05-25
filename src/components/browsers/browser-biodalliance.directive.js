(function() {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name TADkit.directive:tkComponentBrowserBiodalliance
	 * @restrict EA
	 *
	 * @description
	 * Dummy components directive that is replaced on complie
	 * by real component directive from supplied object type.
	 * e.g. from a array of components objects
	 *
	 * @example
	 * `<div tk-component-track-biodalliance ng-repeat='component in components'></div>`
	 *
	 */
	angular
		.module('TADkit')
		.directive('tkComponentBrowserBiodalliance', tkComponentBrowserBiodalliance);

	function tkComponentBrowserBiodalliance(VERBOSE, $log) {
		return {
			restrict: 'E',
			templateUrl: 'components/browsers/browser.html',
			link: function(scope, element, attrs) {
				console.log(scope.component.view.viewpoint.chromStart);

				var browser = new Browser({
					pageName: element[0].firstChild.id, // Target element ID.

					chr: '1',
					viewStart: scope.component.view.viewpoint.chromStart,
					viewEnd: scope.component.view.viewpoint.chromEnd,
					cookieKey: 'human',

					coordSystem: {
						speciesName: 'Human',
						taxon: 9606,
						auth: 'NCBI',
						version: '36',
						ucscName: 'hg18'
					},

					

					sources: [{
						name: 'Genome',
						uri: 'http://www.derkholm.net:8080/das/hg18comp/',
						tier_type: 'sequence',
						provides_entrypoints: true
					}, {
						name: 'Genes',
						desc: 'Gene structures from Ensembl 54',
						uri: 'http://www.derkholm.net:8080/das/hsa_54_36p/',
						collapseSuperGroups: true,
						provides_karyotype: true,
						provides_search: true
					}, {
						name: 'Repeats',
						uri: 'http://www.derkholm.net:8080/das/hsa_54_36p/',
						stylesheet_uri: 'http://www.derkholm.net/dalliance-test/stylesheets/ens-repeats.xml'
					}, {
						name: 'MeDIP raw',
						uri: 'http://www.derkholm.net:8080/das/medipseq_reads'
					}, {
						name: 'MeDIP-seq',
						uri: 'http://www.ebi.ac.uk/das-srv/genomicdas/das/batman_seq_SP/'
					}]
				});
			}
		};
	}
})();