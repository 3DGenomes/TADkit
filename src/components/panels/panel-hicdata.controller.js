(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelHicdataController', PanelHicdataController);

	function PanelHicdataController($scope) {

		$scope.width = $scope.canvas_width = parseInt($scope.state.width); // strip PX units
		$scope.height = $scope.canvas_height = parseInt($scope.state.height); // strip PX units
		
		if(parseInt($scope.data.n)>$scope.width) {
			$scope.canvas_width = parseInt($scope.data.n); // strip PX units
			$scope.canvas_height = parseInt($scope.data.n); // strip PX units
		}
		//$scope.slidevalue = $scope.data.min+";"+$scope.data.max;
		$scope.slidevalue = "10;0.001";
		$scope.slideoptions = {       
		    //from: Math.round($scope.data.min*100)/100,
		    //to: Math.round($scope.data.max*100)/100,
		    from: 10,
		    to: 0.001,
		    //step: ($scope.data.max-$scope.data.min)/255,
		    step: 0.01,
		    round: 2,
		    skin: 'blue',
		    modelLabels: function(value) {
		    	if(value==10) {
		    		return '';
		    	}
		    	if(value<=0.001) {
		    		return 'ln('+Math.round($scope.data.max*100)/100+')';
		    	}
		    	var b = Math.log(10000)/($scope.data.max-0.001);
        		var a = 10/Math.exp(b*$scope.data.max);        	
        		var val = $scope.data.max - Math.log(value/a)/b;
        		//if(datamin!==0) datamin=Math.log(datamin/a)/b;
        		//if(datamax!==0) datamax=Math.log(datamax/a)/b;
		        return 'ln(' + Math.round(val*100)/100 + ')';
		    },
		    callback: function(value, released) {
		    	if(released) {
		    		$scope.settings.slidevalue = $scope.slidevalue;
		    		$scope.$apply();
		    	}
		    }
		  };
		
	}

})();