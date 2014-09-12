TADkit.directive('track', function(){
	return {
		restrict:'E',
		scope:{ data:'=', id:'@', assemblylength:'=' },
		link:function(scope,elem,attrs){
			scope.$watch('data',function(newValue, oldValue){
				if (scope.id=="genes"){
					React.renderComponent(
						trackGenes({
							data: scope.data,
							target: scope.id,
							assemblyLength: scope.assemblylength,
							elem: elem[0]
						}),
						elem[0]
					);					
				} else if (scope.id=="interactions") {
					React.renderComponent(
						trackInteractions({
							data: scope.data,
							target: scope.id,
							assemblyLength: scope.assemblylength,
							elem: elem[0]
						}),
						elem[0]
					);
				} else {
					
				}
				if (newValue == oldValue) {console.log("Track data no change");}
				else {console.log("Track data updated");}
			})
		
		}
	}
})
			
