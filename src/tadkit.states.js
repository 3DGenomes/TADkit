(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/project/loader");
		
		$stateProvider
		// .state('home', {
		// 	url: '/',
		// 	views: {
		// 		'': {
		// 			templateUrl: 'assets/templates/home.html',
		// 			controller: 'HomeController'
		// 		},
		// 		'topbar@home': {
		// 			templateUrl: 'assets/templates/topbar.html',
		// 			controller: 'TopbarController'
		// 		},
		// 		// 'sidebar-left': {
		// 		// 	templateUrl: 'assets/templates/sidebar.project.html',
		// 		// 	controller: 'SidebarProjectController'
		// 		// },
		// 		// 'sidebar-right': {
		// 		// 	templateUrl: 'assets/templates/sidebar.user.html',
		// 		// 	controller: 'SidebarUserController'
		// 		// }
		// 		'loader@home': {
		// 			templateUrl: 'assets/templates/home-loader.html',
		// 			controller: 'HomeController'
		// 		}
		// 	}
		// })
		.state('main', {
			controller: 'MainController',
			abstract: true,
			url: '',
			templateUrl: 'assets/templates/main.html',
			resolve: {
				'initialData': function(initMain) {
					return initMain();
				}
			}
		})
		.state('project', {
			parent: 'main',
			url: '/project?conf',
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
			},
			resolve: {
		         loadfromparam: ['$q','$http', '$stateParams', 'Users', 'Datasets', function($q, $http, $stateParams, Users, Datasets) {
		        	 	
		        	 	if (!$stateParams.conf) return;
		        	 	
		        	 	var config_file;
			 			var deferral = $q.defer();
			 			
			 			$http.get($stateParams.conf)
			 			.then( function(conf) {
			 				var dataset;
			 				var url_conf = $stateParams.conf;
			 				if(typeof conf.data.dataset !== 'undefined') {
			 					if(conf.data.tracks) {
			 						Users.setTracks(conf.data.tracks);
			 					}
			 					dataset = conf.data.dataset;
			 				} else if(typeof conf.data.models !== 'undefined') {
			 					dataset = conf.data;
			 				}
			 				var loading = Datasets.load(dataset);
			 				return $q.all([ loading ])
			 				.then(function(results){
			 					console.log("Dataset loaded: " + conf.data.dataset);
			 					deferral.resolve(conf.data.dataset);
			 				});
			 				
			 			});
			 			return deferral.promise;
		         }]
		    }
		})
		.state('loader', {
			parent: 'project',
			//url: '/loader/:loadDataset',
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
			}
		})
		.state('overlay-import', {
			parent: 'browser',
			url: '/overlay/import',
			views: {
				'modal@main': {
					templateUrl: 'assets/templates/overlay-import.html',
					controller: 'OverlayImportController'
				}
			},
		})
		.state('dataset-import', {
			parent: 'dataset',
			url: '/dataset/import/:func',
			views: {
				'modal@main': {
					templateUrl: 'assets/templates/dataset-import.html',
					controller: 'DataImportController'
				}
			},
		})
		.state('data-import', {
			parent: 'browser',
			url: '/data/import/:func',
			views: {
				'modal@main': {
					templateUrl: 'assets/templates/data-import.html',
					controller: 'DataImportController'
				}
			},
		})
		.state('data-mining', {
			parent: 'browser',
			url: '/data/mining/:func',
			views: {
				'modal@main': {
					templateUrl: 'assets/templates/data-mining.html',
					controller: 'DataMiningController'
				}
			},
		})
		.state('404', {
			url: '/404',
			templateUrl: 'assets/templates/404.tpl.html',
			controller: 'AppController'
		});
	}
})();