(function() {
	'use strict';
	/**
	 * @ngdoc directive
	 * @name ui.directive:uiTooltip
	 * @scope
	 * @restrict EA
	 *
	 * @description
	 * UI Tooltip.
	 * use ng-cloak or style="display:none" on tag to ensure hidden onLoad
	 *
	 * @example
	 * `<ui-tooltip title="title" contents="contents" styling="styling" style="display:none" />`
	 * `<div ui-tooltip title="title" contents="contents" styling="styling" style="display:none"></div>`
	 *
	 */
	angular
		.module('ui')
		.directive('uiTooltip', uiTooltip);

	function uiTooltip() {    
		return {
			restrict: 'EA',
			scope: {
				title: '=',
				content: '=',
				styling: '='
			},
			templateUrl: 'modules/ui/ui-tooltip.html',
			link: function(scope, element, attrs) {
				if (scope.content) {
					// element.removeAttr("style");
					// element.css('display', 'block');

					var height = angular.element(element).prop('offsetHeight');
					scope.$watch(function() {
							height = angular.element(element).prop('offsetHeight');
							angular.element(element).css("top", "-" + height + "px");
					});

					// Tooltip styling
					element.css({
						"display" : "block",
						"background" : scope.styling.background,
						"color" : scope.styling.color,
						"border" : scope.styling.borderWidth + "px solid " + scope.styling.borderColor,
						"border-radius" : scope.styling.padding + "px",
						"padding" : scope.styling.padding + "px",
						"width" : scope.styling.width + "px",
					});

					// Arrow positioning applied to template via ng-style
					var center = (scope.styling.width * 0.5) - scope.styling.padding - scope.styling.borderWidth;
					scope.uiTooltipArrow = {
					    "bottom" : "-" + scope.styling.padding + "px",
					    "left" : center + "px",
					    "border-right" : scope.styling.padding + "px solid transparent",
					    "border-left" : scope.styling.padding + "px solid transparent",
					    "border-top" : scope.styling.padding + "px solid " + scope.styling.borderColor
					};
				}
			}
		};
	}
})();