(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkProjectDropzone', tkProjectDropzone);

	function tkProjectDropzone($state, $parse) {    
		return {
			restrict: 'A',
			// template: '<div>tkProjectDropzone is functioning</div>', // uncomment to test if directive is functioning
			link: function (scope, element, attrs) {

				var expression = attrs.dropzone;
				var accesor = $parse(expression);

				var onDragOver = function(e) {
					e.preventDefault();
					element.addClass("dragOver");
				};

				var onDragEnd = function(e) {
					e.preventDefault();
					element.removeClass("dragOver");
				};

				// OJO! UNTESTED CODE
				// var onDrop = function(e) {
				// 	e.stopPropagation();
				// 	e.preventDefault();
				// 	var files = e.dataTransfer.files;
				// 	for (var i = 0; i <= files.length; i++) {
				// 		var f = files[i];
				// 		var reader = new FileReader();
				// 		reader.readAsArrayBuffer(f);
				// 		reader.onload = (function(theFile) {
				// 			return function(e) {
				// 				var newFile = { name : theFile.name,
				// 					type : theFile.type,
				// 					size : theFile.size,
				// 					lastModifiedDate : theFile.lastModifiedDate
				// 				};
				// 				scope.addfile(newFile);
				// 			};
				// 		})(f);
				// 	}
				// };

				var loadFile = function (file) {
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						// HERE: call the parsed function correctly (with scope AND params object)
						accesor(scope, {$fileContent:onLoadEvent.target.result});
						scope.addDataset(onLoadEvent.target.result);
						// $state.go('dataset');
					});
				};
				reader.readAsText(file);
				console.log("File loaded...");
				};

				element.bind("dragover", onDragOver)
							 .bind("dragleave", onDragEnd)
							 .bind("drop", function (e) {
									 onDragEnd(e);
									 loadFile(e.dataTransfer.files[0]);
							 });

				scope.$watch(expression, function () {
						element.attr("src", accesor(scope));
				});

				// element.bind("drop", onDrop);

			}
		};
	}
})();