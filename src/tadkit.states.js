(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/project/loader");
		
		$stateProvider
		.state('home', {
			controller: 'HomeController',
			url: '/home',
			views: {
				'': {
					templateUrl: 'assets/templates/home.html',
					controller: 'HomeController'
				},
				'topbar@home': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'sidebaruser@home': {
					templateUrl: 'assets/templates/sidebar.user.html',
					controller: 'SidebarUserController'
				}
			}
		})
		.state('main', {
			controller: 'MainController',
			abstract: true,
			url: '',
			templateUrl: 'assets/templates/main.html',
			resolve:{
				'initialData': function(initMain) {
					return initMain();
				}
			}
		})
		.state('project', {
			parent: 'main',
			url: '/project',
			views: {
				'topbar@main': {
					templateUrl: 'assets/templates/topbar.html',
					controller: 'TopbarController'
				},
				'sidebar-left@main': {
					templateUrl: 'assets/templates/sidebar.project.html',
					controller: 'SidebarProjectController'
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
			url: '/loader',
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
		// .state('upload', {
		// 	parent: 'project',
		// 	url: '/upload',
		// 	views: {
		// 		'topbar@main': {
		// 			templateUrl: 'assets/templates/topbar.html',
		// 			controller: 'TopbarController'
		// 		},
		// 		'content@main': {
		// 			templateUrl: 'assets/templates/project-upload.html',
		// 			controller: 'ProjectUploadController'
		// 		},
		// 		'sidebar-right@main': {
		// 			templateUrl: 'assets/templates/sidebar.user.html',
		// 			controller: 'SidebarUserController'
		// 		}
		// 	}
		// })
		.state('dataset', {
			parent: 'project',
			url: '/dataset',
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-dataset.html',
					controller: 'ProjectDatasetController'
				}
			}
		})
		.state('overlay', {
			parent: 'project',
			url: '/overlay',
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-overlay.html',
					controller: 'ProjectOverlayController'
				}
			}
		})
		.state('storyboard', {
			parent: 'project',
			url: '/storyboard',
			views: {
				'content@main': {
					templateUrl: 'assets/templates/project-storyboard.html',
					controller: 'ProjectStoryboardController'
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
			},
			// resolve: {
			// 	'initialData': function(initBrowser) {
			// 		return initBrowser();
			// 	}
			// }
		})
			.state('overlay-acquire', {
				parent: 'browser',
				url: '/overlay/acquire',
				views: {
					'modal@main': {
						templateUrl: 'assets/templates/overlay-acquire.html',
						controller: 'OverlayController'
					}
				},
				// resolve: {
				// 	'initialData': function(initBrowser) {
				// 		return initBrowser();
				// 	}
				// }
			})
			.state('overlay-filter', {
				parent: 'browser',
				url: '/overlay/filter',
				views: {
					'modal@main': {
						templateUrl: 'assets/templates/overlay-filter.html',
						controller: 'OverlayController'
					}
				},
				// resolve: {
				// 	'initialData': function(initBrowser) {
				// 		return initBrowser();
				// 	}
				// }
			})
			.state('overlay-represent', {
				parent: 'browser',
				url: '/overlay/represent',
				views: {
					'modal@main': {
						templateUrl: 'assets/templates/overlay-represent.html',
						controller: 'OverlayController'
					}
				},
				// resolve: {
				// 	'initialData': function(initBrowser) {
				// 		return initBrowser();
				// 	}
				// }
			})
		.state('404', {
			url: '/404',
			templateUrl: 'assets/templates/404.tpl.html',
			controller: 'AppController'
		});
	}
})();