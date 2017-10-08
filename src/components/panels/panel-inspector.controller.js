(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInspectorController', PanelInspectorController);

	function PanelInspectorController($scope, $mdDialog, Settings) {

		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = newValue;
		  		
			}
		});
		
		$scope.width = parseInt($scope.state.width); // strip PX units
		$scope.height = parseInt($scope.state.height); // strip PX units

		var scale;
		if(angular.isUndefined($scope.data.object.bp_per_nm)) 
			scale = $scope.data.object.resolution * 0.01;
		else
			scale = $scope.data.object.resolution * $scope.data.object.bp_per_nm;
		$scope.atPosition = function(feature) {
			if ($scope.$parent.settings.current.segmentUpper >= feature.start && $scope.$parent.settings.current.segmentLower <= feature.end) return true;
			return false;
		};
		$scope.atLeftPosition = function(feature) {
			if(angular.isUndefined($scope.settings.current.markers_position)) return;
			var segment_span = ($scope.$parent.settings.current.segmentUpper - $scope.$parent.settings.current.segmentLower)/2;

			if ($scope.settings.current.markers_position[1]+segment_span >= feature.start && $scope.settings.current.markers_position[1]-segment_span <= feature.end) return true;
			return false;
		};
		$scope.atRightPosition = function(feature) {
			if(angular.isUndefined($scope.settings.current.markers_position)) return;
			var segment_span = ($scope.$parent.settings.current.segmentUpper - $scope.$parent.settings.current.segmentLower)/2;
			
			if ($scope.settings.current.markers_position[0]+segment_span >= feature.start && $scope.settings.current.markers_position[0]-segment_span <= feature.end) return true;
			return false;
		};
		$scope.formatRegionName = function(regionName) {
			if (regionName == "Chromosome") {
				return regionName;
			} else {
				return "chr" + regionName;
			}
		};
		
		$scope.featureTitle = function(feature) {
			if(!angular.isUndefined(feature.name)) return feature.name;
			if(!angular.isUndefined(feature.id)) return feature.id;
			if(!angular.isUndefined(feature.value)) return feature.value;
		};
		$scope.interactionDistance = function() {
			if ( !angular.isUndefined($scope.settings.current.markers_position && $scope.data.length>0)) {
				var LeftPart = Settings.getParticle($scope.settings.current.markers_position[1]);
				var RightPart = Settings.getParticle($scope.settings.current.markers_position[0]);

				var xd = $scope.data.data[(LeftPart-1)*3] - $scope.data.data[(RightPart-1)*3];
				var yd = $scope.data.data[(LeftPart-1)*3+1] - $scope.data.data[(RightPart-1)*3+1];
				var zd = $scope.data.data[(LeftPart-1)*3+2] - $scope.data.data[(RightPart-1)*3+2];
				
				var dist = Math.round(Math.sqrt( xd*xd + yd*yd + zd*zd ));
				return dist;
			} else {
				return -1;
			}
		};
		$scope.dataset_info = '<div class="component-caption" layout="column" layout-align="left center">'+
				'<h2>'+$scope.data.object.title+'</h2><table>'+
					'<tr><td><b>Species:</b></td><td>'+$scope.data.object.species+'</td></tr>'+
					'<tr><td><b>Region:</b></td><td>'+$scope.data.object.region+'</td></tr>'+
					'<tr><td><b>UUID:</b></td><td>'+$scope.data.object.uuid+'</td></tr>'+
					'<tr><td><b>Resolution:</b></td><td>'+$scope.data.object.resolution+'</td></tr>'+
					'<tr><td><b>Bins:</b></td><td>'+($scope.data.data.length/3)+'</td></tr>'+
					'<tr><td><b>Chromatin radius:</b></td><td> 5 nm</td></tr>'+
					'<tr><td><b>Chromatin radius scale:</b></td><td>'+$scope.data.object.radius_scale+'x</td></tr>'+
				'</table>'+
			'</div>';
		
		$scope.showInfo = function(info) {
			$mdDialog.show({
			      parent: angular.element(document.body),
			      template: '<md-dialog md-theme="default" aria-label="Information">' +
			        '  <md-dialog-content class="md-default-theme">' + info +
			        '<div class="md-actions"><md-button ng-click="closeDialog();" class="md-primary md-button md-default-theme"><span class="ng-binding ng-scope">Close</span></md-button></div>' +
			        '  </md-dialog-content>' +
			        '</md-dialog>',
			      locals: {

			      },
			      controller: DialogController
			    });
		};

		function DialogController($scope, $mdDialog) {
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			};
		}

		$scope.getDetails = function(item, event) {
			var output = '<div class="component-caption" layout="column" layout-align="left center">'+
			'<table>';
			for (var property in item) {
				if (['name','id','value','score','strand','start','end'].indexOf(property) >= 0) 
					output += '<tr><td><b>'+property+':</b></td><td>'+item[property]+'</td></tr>';
			}
			output += '</table>'+
				'</div>'; 
			$scope.showInfo(output);
		};
	}

})();