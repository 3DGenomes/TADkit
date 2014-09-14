TADkit.directive('contact', function(){
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

			})
		}
	}
})
			
