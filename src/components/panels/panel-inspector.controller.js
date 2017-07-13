(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInspectorController', PanelInspectorController);

	function PanelInspectorController($scope, $mdDialog) {

		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = newValue;
		  		
			}
		});
		
		$scope.width = parseInt($scope.state.width); // strip PX units
		$scope.height = parseInt($scope.state.height); // strip PX units

		$scope.atPosition = function(feature) {
			if ($scope.$parent.settings.current.segmentUpper >= feature.start && $scope.$parent.settings.current.segmentLower <= feature.end) return true;
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
			if (!feature.name) {
				return feature.id;
			} else {
				return feature.name;
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
			$mdDialog.show(
				$mdDialog.alert()
					.title('Details')
					.content(item.description)
					.ariaLabel('Item details')
					.ok('Close')
					.targetEvent(event)
			);
		};
	}

})();