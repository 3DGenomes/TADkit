(function() {
	'use strict';
	/**
	 * @ngdoc overview
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
	 * @requires threejs
	 * @requires genoverse
	 * @requires generic
	 * @requires ui
	 * @requires bioinformatics
	 * @requires modeling
	 * @requires visualization
	 */
	angular.module('TADkit',['TADkit.datasets','TADkit.layers','ui.router','ngMaterial','uuid4','d3js','threejs','genoverse','generic','ui','bioinformatics','modeling','visualization']);
})();