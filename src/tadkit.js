(function() {
	'use strict';

	/**
	 * @ngdoc module
	 * @name TADkit
	 * @module TADkit
	 * @description
	 * Main module for TADkit app.
	 *
	 * @example
	 * <example>
	 * 	<file name="index.html">
	 * 		<div ng-app="TADkit" route-css-classnames>
	 * 			<div data-ui-view id="main" class="fullheight"></div>
	 * 		</div>
	 * 	</file>
	 * </example>
	 *
	 * @requires TADkit.datasets
	 * @requires TADkit.layers
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires uuid4
	 * @requires d3js
	 */
	angular.module('TADkit',['ui.router','ngMaterial','uuid4','d3']);
	     
})();