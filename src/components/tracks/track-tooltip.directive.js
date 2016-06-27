(function() {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name TADkit.directive:tkTooltip
	 * @scope
	 * @restrict EA
	 *
	 * @description
	 * Track Tooltip.
	 *
	 * @example
	 * `<tk-tooltip title="title" contents="contents"/>`
	 * `<div tk-tooltip title="title" contents="contents"></div>`
	 *
	 */
	angular
		.module('TADkit')
		.directive('tkTooltip', tkTooltip);

	function tkTooltip($timeout) {    
		return {
			restrict: 'EA',
			scope: {
				title: '=',
				content: '=',
				sorting: '=',
				styling: '='
			},
			templateUrl: 'assets/templates/track-tooltip.html',
			link: function(scope, element, attrs) {
				if (scope.content) {

					scope.title.replace('_name','');
					var height = angular.element(element).prop('offsetHeight');

					scope.$watch(function() {
							height = angular.element(element).prop('offsetHeight');
							angular.element(element).css("top", "-" + height + "px");
					});

					var width = scope.styling.width;
					var padding = scope.styling.padding;
					var center = (width * 0.5) - (padding * 0.5);
					var background = scope.styling.background;

					// STYLES applied to template via ng-style
					element.css({
						"position" : "absolute",
						"display" : "block",
						"background" : background,
						"color" : "white",	
						"border-radius" : padding + "pxñ    ",
						"padding" : padding + "px",
						"width" : width + "px",
						"opacity" : 0,
						"z-index" : 2,
					});
					scope.tkTooltipTitle = {
					    "font-weight" : "bold",
					    "margin-bottom" : "10px",
					    "text-transform" : "capitalize"
					};
					scope.tkTooltipContent = {
						"font-size" : "0.7rem"
					};
					scope.tkTooltipList = {
					};
					scope.tkTooltipTerm = {
						"float" : "left",
						"clear" : "left",
						"width": "50px",
						"font-weight": "bold"
					};
					scope.tkTooltipDescription = {
						"margin" : "0 0 0 50px",
						"padding" : "0 0 0.2em 0"
					};
					scope.tkTooltipArrow = {
					    "position" : "absolute",
					    "bottom" : "-" + padding + "px",
					    "left" : center + "px",
					    "width" : 0,
					    "height" : 0, 
					    "border-right" : padding + "px solid transparent",
					    "border-left" : padding + "px solid transparent",
					    "border-top" : padding + "px solid " + background,
					    "font-size" : 0,
					    "line-height" : 0
					};
				}
			}
		};
	}
})();