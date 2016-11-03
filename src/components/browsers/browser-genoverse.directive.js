(function() {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name TADkit.directive:tkComponentBrowserGenoverse
	 * @restrict EA
	 *
	 * @description
	 * Genoverse browser directive that is replaced on complie
	 * by real component directive from supplied object type.
	 * e.g. from a array of components objects
	 *
	 * @example
	 * `<div tk-component-track-biodalliance ng-repeat='component in components'></div>`
	 *
	 */
	angular
		.module('TADkit')
		.directive('tkComponentBrowserGenoverse', tkComponentBrowserGenoverse);

	function tkComponentBrowserGenoverse(VERBOSE, $log, GenoverseService) {
		return {
			restrict: 'E',
			templateUrl: 'assets/templates/browser.html',
			link: function(scope, element, attrs) {
				var config = "{container:'#" + scope.component.object.idIndex + "'";
				config += ",genome:'grch38'";
				config += ",chr:1";// + scope.component.view.viewpoint.chrom;
				config += ",start:" + scope.component.view.viewpoint.chromStart;
				config += ",end:" + scope.component.view.viewpoint.chromEnd;
				config += ",plugins:['fileDrop']";
				config += ",tracks:[";
					config += "Genoverse.Track.Scalebar,";
					config += "Genoverse.Track.extend({name:'Sequence',controller:Genoverse.Track.Controller.Sequence,model:Genoverse.Track.Model.Sequence.Ensembl,view:Genoverse.Track.View.Sequence,100000:false,resizable:'auto'}),";
					config += "Genoverse.Track.Gene,";
					config += "Genoverse.Track.extend({name:'RegulatoryFeatures',url:'http://rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=regulatory;content-type=application/json',resizable:'auto',model:Genoverse.Track.Model.extend({dataRequestLimit:5000000}),setFeatureColor:function(f){f.color='#AAA';}}),";
					config += "Genoverse.Track.dbSNP";
					config += "]}";

				GenoverseService.load(config).then(function(Genoverse) {
					$log.debug(window.Genoverse);
				});		
			}
		};
	}
})();