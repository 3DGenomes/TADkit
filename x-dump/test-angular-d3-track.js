// ANGULAR APP
var APP =  angular.module('APP',[]);

	APP.service('TADMetadata', function() {
	  this.setMetadata = function(metadata) {
      TADMetadata = metadata;
					console.log("Metadata set!");	
	  };
	  this.getMetadata = function() {
	        return TADMetadata;
	  };
	})

	APP.controller('tadmodelController',['$http','$scope','TADMetadata',
	  function($http,$scope,TADMetadata){
	    $http.get('json/tad.json').
	    success(function(d){
        TADMetadata.setMetadata(d.metadata);
				console.log(TADMetadata.getMetadata());
	      // $scope.data = d
	    })
	}])
			
	APP.controller('sequenceController',['$http','$scope',
    function($http,$scope){
			// var metadata = TADMetadata.getMetadata();
			// var EmsemblRequestLimit = 5000000;
			// var TADSlice = metadata.chromosome + ":" + (metadata.end + 1 - EmsemblRequestLimit) + "-" + metadata.end;
      // $http.get('http://beta.rest.ensembl.org/feature/region/" + metadata.species + "/" + TADSlice + "?feature=gene;content-type=application/json').
      $http.get('json/drosophila_melanogaster-genes.json').
      success(function(d){
        $scope.data = d
      })
  }])

	APP.directive('track',function(){
    return {
      restrict:'E',
      scope:{data:'=',id:'@'},
      link:function(scope,elm,attrs){
        scope.$watch('data',function(n,o){
          React.renderComponent(
              sequencetrack({data:scope.data,target:scope.id}),
              elm[0])
        })
      }
    }
  })
  