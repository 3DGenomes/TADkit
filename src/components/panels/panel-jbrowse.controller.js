(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelJBrowseController', PanelJBrowseController);

	function PanelJBrowseController($scope, $mdDialog) {

		$scope.width = $scope.state.width; // strip PX units
		$scope.height = $scope.state.height; // strip PX units
		
		//$scope.jbrowsedataurl = 'http://172.16.54.4/JBrowse/data';
		$scope.jbrowsedataurl = 'data';
		$scope.iframe_src = '../JBrowse/index.html?data='+$scope.jbrowsedataurl+'&loc='+($scope.settings.current.chrom).replace('chr','')+':'+
			($scope.settings.current.chromStart-30000)+'..'+($scope.settings.current.chromEnd+30000)+'&tracklist=0&tracks=Genes,Chromatin%20Types'+
			'&highlight='+($scope.settings.current.chrom).replace('chr','')+':'+
			$scope.settings.current.chromStart+'..'+$scope.settings.current.chromEnd;
			//'&addBookmarks=%5B%7B%22start%22%3A'+$scope.settings.current.chromStart+
			//'%2C%22end%22%3A'+$scope.settings.current.chromEnd+'%2C%22color%22%3A%20%22rgba(190%2C50%2C50%2C0.5)%22%2C%22ref%22%3A%20%22'+
			//($scope.settings.current.chrom).replace('chr','')+'%22%7D%5D';
		
		$scope.updatePosition =  function(position) {
			//alert(position);
			if(position >= $scope.settings.current.chromStart && position <= $scope.settings.current.chromEnd) {
				$scope.settings.current.position = position;
			}
			if(position < $scope.settings.current.chromStart) {
				$scope.settings.current.position = $scope.settings.current.chromStart;
			}  
			if(position > $scope.settings.current.chromEnd) {
				$scope.settings.current.position = $scope.settings.current.chromEnd;
			}
			$scope.$apply();
		};
	}
})();