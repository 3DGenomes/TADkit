(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/project/loader/");
		
		$stateProvider
		.state('main', {
			controller: 'MainController',
			abstract: true,
			url: '',
			templateUrl: 'assets/templates/main.html',
			resolve: {
				'initialData': function(App) {
					return new App();
				}
			}
		})
		.state('project', {
			parent: 'main',
			url: '/project',
			data: {
				cssClassnames: 'main'
			},
			views: {
				'topbar@main': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'sidebar-left@main': {
					templateUrl: 'assets/templates/sidebar.project.html',
					controller: 'ProjectController'
				},
				'content@main': {
					templateUrl: 'assets/templates/project-content.html',
					controller: 'ProjectContentController'
				},
				'sidebar-right@main': {
					templateUrl: 'assets/templates/sidebar.user.html',
					controller: 'SidebarUserController'
				}
			}
		})
		.state('loader', {
			parent: 'project',
			url: '/loader/:loadDataset',
			data: {
				cssClassnames: 'loader'
			},
			views: {
				'topbar@main': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'content@main': {
					templateUrl: 'assets/templates/project-loader.html',
					controller: 'ProjectLoaderController'
				},
				'sidebar-right@main': {
					templateUrl: 'assets/templates/sidebar.user.html',
					controller: 'SidebarUserController'
				}
			}
		})
		.state('dataset', {
			parent: 'project',
			url: '/dataset',
			data: {
				cssClassnames: 'dataset'
			},
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-dataset.html',
					controller: 'ProjectDatasetController'
				}
			}
		})
		.state('layer', {
			parent: 'project',
			url: '/layer',
			data: {
				cssClassnames: 'layer'
			},
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-layer.html',
					controller: 'ProjectController'
				}
			}
		})
		.state('storyboard', {
			parent: 'project',
			url: '/storyboard',
			data: {
				cssClassnames: 'storyboard'
			},
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-storyboard.html',
					controller: 'ProjectController'
				}
			}
		})
		.state('browser', {
			parent: 'project',
			url: '/browser',
			views: {
				'sidebar-left@main': {
					templateUrl: 'assets/templates/sidebar.browser.html',
					controller: 'SidebarBrowserController'
				},
				'content@main': {
					templateUrl: 'assets/templates/storyboard.html',
					controller: 'StoryboardController'
				}
			}
		})
		.state('data-import', {
			parent: 'browser',
			url: '/data/import',
			views: {
				'modal@main': {
					templateUrl: 'assets/templates/data-import.html',
					controller: 'DataImportController'
				}
			}
		})
		.state('404', {
			url: '/404',
			templateUrl: 'assets/templates/404.tpl.html',
			controller: 'AppController'
		});
	}
})();