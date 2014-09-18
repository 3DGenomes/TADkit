TADkit.directive('track', function(){
	return {
		restrict:'E',
		scope:{
			data:'=',
			id:'@',
			assemblylength:'=',
			focusstart:'=',
			focusend:'=',
			sense:'='
		},
		link:function(scope,elem,attrs){
			// console.log(scope);
			scope.$watch('data',function(newValue, oldValue){
				if (scope.id=="genes"){
					React.renderComponent(
						trackGenes({
							data: scope.data,
							target: scope.id,
							assemblyLength: scope.assemblylength,
							focusStart: scope.focusstart,
							focusEnd: scope.focusend,
							sense: scope.sense,
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
							focusLength: scope.focuslength,
							sense: scope.sense,
							elem: elem[0]
						}),
						elem[0]
					);
				} else if (scope.id=="slider") {
					React.renderComponent(
						trackSlider({
							data: scope.data,
							target: scope.id,
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
			
