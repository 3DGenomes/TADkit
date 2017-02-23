(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelHicdataController', PanelHicdataController);

	function PanelHicdataController($scope,$window,Storyboards,Datasets) {

		$scope.slideoptions = {};
		$scope.slidevalue = "10;0.001";
		if(angular.isUndefined($scope.data)) return;
		//$scope.width = $scope.canvas_width = parseInt($scope.state.width)-2*parseInt($scope.state.margin); // strip PX units
		var scene_component = Storyboards.getComponentById('default-scene');
		$scope.width = $scope.state.width = $window.innerWidth - parseInt(scene_component.object.state.width) - 50 - 2*parseInt($scope.state.margin);
		$scope.height = $scope.state.height = $scope.canvas_height = parseInt($scope.state.height)-2*parseInt($scope.state.margin); // strip PX units
//		if($scope.data.n === 0) {
//			$scope.no_hic_data = true; 
//			$scope.slidevalue = "10;0.001";
//			$scope.slideoptions = {};
//			return;
//		} else  {
//			$scope.no_hic_data = false;
//		}
		
		var w = angular.element($window);
		$scope.$watch(
		  function () {
		    return $window.innerWidth;
		  },
		  function (value) {
		    $scope.width = $scope.state.width = $scope.canvas_width = value - parseInt(scene_component.object.state.width) - 50 - 2*parseInt($scope.state.margin);
		  	//$scope.$apply();
		  },
		  true
		);
		if($scope.data.n === 0) {
			var promise = Datasets.loadHic();
			promise.then(function(data) {
			    if(data.n === 0) {
					$scope.no_hic_data = true; 
					$scope.slidevalue = "10;0.001";
					$scope.slideoptions = {};
					return;
				} else  {
					$scope.no_hic_data = false;
				}
			    $scope.update_data(data);
			});
		}
        
		w.bind('resize', function(){
		  $scope.$apply();
		});

		//if(parseInt($scope.data.n)>$scope.width) {
		//	$scope.canvas_width = parseInt($scope.data.n); // strip PX units
		//}
		//if(parseInt($scope.data.n)>$scope.height) {
		//	$scope.canvas_height = parseInt($scope.data.n); // strip PX units
		//}
		//$scope.slidevalue = $scope.data.min+";"+$scope.data.max;
		$scope.slidevalue = "10;0.001";
		$scope.slideoptions = {       
		    //from: Math.round($scope.data.min*100)/100,
		    //to: Math.round($scope.data.max*100)/100,
			vertical: true,
		    from: 10,
		    to: 0.001,
		    //step: ($scope.data.max-$scope.data.min)/255,
		    step: 0.01,
		    round: 2,
		    skin: 'blue',
		    css: { 
		    	before: {"background-color": "red"},
		    	after: {"background-color": "red"}
		    },
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