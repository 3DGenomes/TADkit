(function() {
	'use strict';

	// ANGULAR APP
	angular.module('TADkit',['ui.router','ngMaterial','uuid4','d3','angularAwesomeSlider','angularResizable','ui.grid','ui.grid.resizeColumns']);
	     
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($locationProvider, $mdThemingProvider) {
		// Removing # from URL with HTML5 History API and
		// add <base href="/myapp/"></base> in index.html
		// Comment to leave # in case of server rewrites.
		// $locationProvider.html5Mode(true);
		var VreMap = $mdThemingProvider.extendPalette('cyan', {
		    '500': '#006080'
		  });
		// VRE second #0099cc
		$mdThemingProvider.definePalette('VreMap', VreMap);
		// Material Design Themes
		$mdThemingProvider.theme('default')
			//for tadkit
			.primaryPalette('green')
			.accentPalette('lime', {
				'default': '500'
			})
			//for vre
			//.primaryPalette('VreMap')
			//.accentPalette('blue')
   			.warnPalette('red')
			.backgroundPalette('grey');
		$mdThemingProvider.theme('darkKit').dark();

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.run(run);

	function run($rootScope) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			console.log( 'Resolve Error: ', error);
		});
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.config(config);

	function config($stateProvider, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise("/project/loader");
		$httpProvider.interceptors.push('myHttpInterceptor');
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
			 				var loading = [];
			 				if(dataset instanceof Array) {
		 						for(var i = 0; i < dataset.length; i++) loading.push(Datasets.load(dataset[i]));
		 					} else loading.push(Datasets.load(dataset));
			 				return $q.all(loading)
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
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponent', tkComponent);

	function tkComponent($compile) {
		return {
			restrict: 'EA',
			// controller: 'StoryboardController',
			link: function(scope, element, attrs) {
				// console.log(scope);

				var strTemplate = '<data-tk-component-' + scope.component.object.type + ' ' +
					'id="{{component.object.id}}-' + scope.$index + '" ' +
					'type="component.object.type" ' +
					'title="{{component.object.title}}" ' +
					'state="component.object.state" ' + /* for scene until can check for DOM loaded */
					'settings="settings" ' +
					'view="component.view" ' +
					'currentparticle="currentParticle"' +
					'currentposition="currentPosition"' +
					'currentmodel="current.model" ' +
					'currentoverlay="current.overlay" ' +
					'data="component.data" ' +
					'proximities="component.proximities" ' +
					'overlay="component.overlay"' +
					'toggleoverlay="toggleOverlay(index)" ' +
					'style="margin: {{component.object.state.margin}}; background-color: {{component.view.settings.background}}" ' +
					'class="component ' + scope.component.object.type + '">' +
					'</data-tk-component-' + scope.component.object.type + '>';

				element.replaceWith($compile(strTemplate)(scope));
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelHicdataController', PanelHicdataController);

	function PanelHicdataController($scope,$window,Storyboards,Datasets) {

		$scope.slideoptions = {};
		$scope.slidevalue = "10;0.001";
		if(angular.isUndefined($scope.data)) return;
		var scene_component = Storyboards.getComponentById('Chromatin');
		var scene_width = 0;
		var scene_height = 0;
		if(typeof scene_component !== 'undefined') {
			$scope.settings.views.scene_width = scene_width = parseInt(scene_component.object.state.width);
			$scope.settings.views.scene_height = scene_height = parseInt(scene_component.object.state.height);
		}
		$scope.width = $scope.state.width = $window.innerWidth - scene_width - 50 - 2*parseInt($scope.state.margin);
		$scope.canvas_width = 2*$scope.width;
		$scope.height = $scope.state.height =  parseInt($scope.state.height)-2*parseInt($scope.state.margin); // strip PX units
		$scope.canvas_height = $scope.canvas_width;
//		if($scope.data.n === 0) {
//			$scope.no_hic_data = true; 
//			$scope.slidevalue = "10;0.001";
//			$scope.slideoptions = {};
//			return;
//		} else  {
//			$scope.no_hic_data = false;
//		}
		
		$scope.settings.current.datasets = Datasets.get();
		
		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};
		
		var w = angular.element($window);
		$scope.$watch(
		  function () {
		    return $window.innerWidth;
		  },
		  function (value) {
		    $scope.width = $scope.state.width = value - scene_width - 50 - 2*parseInt($scope.state.margin);
		  	$scope.canvas_width = 2*$scope.width;
		  	//$scope.$apply();
		  },
		  true
		);
		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = $window.innerWidth - newValue - 50 - 2*parseInt($scope.state.margin);
		  		$scope.canvas_width = 2*$scope.width;
		  		$scope.state.offsetx = parseInt($scope.state.offsetx) - (oldValue-newValue);
		  		//$scope.update_width();
			}
		});
		$scope.$watch('settings.views.scene_height', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.height = $scope.state.height =  parseInt(newValue)-2*parseInt($scope.state.margin)+1; 
				$scope.update_height();
			}
		});
		if($scope.data.n === 0) {
			var promise = Datasets.loadHic();
			if(promise) {
				promise.then(function(data) {
				    if(data.n === 0) {
						$scope.no_hic_data = true; 
						$scope.slidevalue = "10;0.001";
						$scope.slideoptions = {};
						return;
					} else  {
						$scope.no_hic_data = false;
					}
				    $scope.update_data(data);
				});
			}
		}
        
		w.bind('resize', function(){
		  $scope.$apply();
		});

		//if(parseInt($scope.data.n)>$scope.width) {
		//	$scope.canvas_width = parseInt($scope.data.n); // strip PX units
		//}
		//if(parseInt($scope.data.n)>$scope.height) {
		//	$scope.canvas_height = parseInt($scope.data.n); // strip PX units
		//}
		//$scope.slidevalue = $scope.data.min+";"+$scope.data.max;
		$scope.slidevalue = "10;0.001";
		$scope.slideoptions = {
			from: 10,
		    to: 0.001,
		    step: 0.01,
		    round: 2,
		    skin: 'blue',
		    modelLabels: function(value) {
		    	if(value==10) {
		    		return '';
		    	}
		    	if(value<=0.001) {
		    		return 'ln('+Math.round($scope.data.max*100)/100+')';
		    	}
		    	var b = Math.log(10000)/($scope.data.max-0.001);
        		var a = 10/Math.exp(b*$scope.data.max);        	
        		var val = $scope.data.max - Math.log(value/a)/b;
        		//if(datamin!==0) datamin=Math.log(datamin/a)/b;
        		//if(datamax!==0) datamax=Math.log(datamax/a)/b;
		        return 'ln(' + Math.round(val*100)/100 + ')';
		    },
		    callback: function(value, released) {
		    	if(released) {
		    		$scope.settings.slidevalue = $scope.slidevalue;
		    		$scope.$apply();
		    	}
		    }
		};
		$scope.diffslidevalue = 0;
		$scope.diffslideoptions = {
			from: 0,
		    to: 10,
		    step: 0.01,
		    skin: 'blue',
		    modelLabels: function(value) {
		    	return value/10;
		    },
		    callback: function(value, released) {
		    	if(released) {
		    		$scope.settings.slidevalue = $scope.diffslidevalue/10;
		    		$scope.$apply();
		    	}
		    }
		};
		$scope.selDataset1 = 0;
		$scope.selDataset2 = 1;
		$scope.refreshDataset = function() {
	    	if($scope.on_diff_hic) {
	    		$scope.settings.current.selDataset1 = $scope.selDataset1;
	    		$scope.settings.current.selDataset2 = $scope.selDataset2;
	    		$scope.refreshDiff();
	    		$scope.rendered = false;
	    		$scope.update();
	    		$scope.update_marks();
	    	}
	    };
		/*
		$scope.slideoptions = {       
		    //from: Math.round($scope.data.min*100)/100,
		    //to: Math.round($scope.data.max*100)/100,
			vertical: false,
		    from: 10,
		    to: 0.001,
		    //step: ($scope.data.max-$scope.data.min)/255,
		    step: 0.01,
		    round: 2,
		    skin: 'blue',
		    css: { 
		    	before: {"background-color": "red"},
		    	after: {"background-color": "red"}
		    },
		    modelLabels: function(value) {
		    	if(value==10) {
		    		return '';
		    	}
		    	if(value<=0.001) {
		    		return 'ln('+Math.round($scope.data.max*100)/100+')';
		    	}
		    	var b = Math.log(10000)/($scope.data.max-0.001);
        		var a = 10/Math.exp(b*$scope.data.max);        	
        		var val = $scope.data.max - Math.log(value/a)/b;
        		//if(datamin!==0) datamin=Math.log(datamin/a)/b;
        		//if(datamax!==0) datamax=Math.log(datamax/a)/b;
		        return 'ln(' + Math.round(val*100)/100 + ')';
		    },
		    callback: function(value, released) {
		    	if(released) {
		    		$scope.settings.slidevalue = $scope.slidevalue;
		    		$scope.$apply();
		    	}
		    } 
		  };*/
		
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelHicdata', tkComponentPanelHicdata);

	function tkComponentPanelHicdata(d3Service, $timeout, Overlays, ColorConvert, uuid4, Networks, Hic_data) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'=',
				currentoverlay: '='
			},
			templateUrl: 'assets/templates/panel-hicdata.html',
			link:function(scope, element, attrs){
				
				//if(scope.data.n<=0) return; 
				if(angular.isUndefined(scope.data)) return;
				
				scope.rendered = false;
				scope.imageObject=new Image();
				scope.show_tads = (scope.data.tads.length !== 0);
				scope.on_diff_hic = false;
				scope.on_filter = false;
				scope.mini_scale = 1;
				scope.rect = {
					w: 0,
					h: 0,
					x: 0,
					y: 0
				};
				
				var scaleMultiplier = 0.8;
			    var startDragOffset = {};
			    var mouseDown = false;
			    var mouseMove = false;
			    var mini_startDragOffset = {};
			    var mini_mouseDown = false;
			    var mini_mouseMove = false;
			    var mini_translatePos = {
					x: 0,
					y: 0
				};
			    scope.settings.current.igv_position = {
					start0: 0,
					start1: 0,
					end2: 0,
					y: 0,
					flag: 1
				};
			    var originalOverlayIndex = Overlays.getCurrentIndex();
			    var currentOverlay = {
		    		color: []
			    };
			    
			    var slidevalue = scope.slidevalue;
				var brush;
				var mini_svg, svg, hic_svg, handle, position, contact_marker, 
					contact_marker_value, mini_frame, mini_hic, mini_sel;
				var polygon_tads = [];
				scope.highlighted_tad = -1;
				var canvas;
				
				
				// Last updated November 2011
				// By Simon Sarris
				// www.simonsarris.com
				// sarris@acm.org
				//
				// Free to use and distribute at will
				// So long as you are nice to people, etc

				function Transform() {
				  this.reset();
				}

				Transform.prototype.reset = function() {
				  this.m = [1,0,0,1,0,0];
				};

				Transform.prototype.multiply = function(matrix) {
				  var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
				  var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];

				  var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
				  var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];

				  var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
				  var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

				  this.m[0] = m11;
				  this.m[1] = m12;
				  this.m[2] = m21;
				  this.m[3] = m22;
				  this.m[4] = dx;
				  this.m[5] = dy;
				};

				Transform.prototype.invert = function() {
				  var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
				  var m0 = this.m[3] * d;
				  var m1 = -this.m[1] * d;
				  var m2 = -this.m[2] * d;
				  var m3 = this.m[0] * d;
				  var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
				  var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
				  this.m[0] = m0;
				  this.m[1] = m1;
				  this.m[2] = m2;
				  this.m[3] = m3;
				  this.m[4] = m4;
				  this.m[5] = m5;
				};

				Transform.prototype.rotate = function(rad) {
				  var c = Math.cos(rad);
				  var s = Math.sin(rad);
				  var m11 = this.m[0] * c + this.m[2] * s;
				  var m12 = this.m[1] * c + this.m[3] * s;
				  var m21 = this.m[0] * -s + this.m[2] * c;
				  var m22 = this.m[1] * -s + this.m[3] * c;
				  this.m[0] = m11;
				  this.m[1] = m12;
				  this.m[2] = m21;
				  this.m[3] = m22;
				};

				Transform.prototype.translate = function(x, y) {
				  this.m[4] += this.m[0] * x + this.m[2] * y;
				  this.m[5] += this.m[1] * x + this.m[3] * y;
				};

				Transform.prototype.scale = function(sx, sy) {
				  this.m[0] *= sx;
				  this.m[1] *= sx;
				  this.m[2] *= sy;
				  this.m[3] *= sy;
				};

				Transform.prototype.transformPoint = function(px, py) {
				  var x = px;
				  var y = py;
				  px = x * this.m[0] + y * this.m[2] + this.m[4];
				  py = x * this.m[1] + y * this.m[3] + this.m[5];
				  return [px, py];
				};
				// end of code for nice person
				
				var t = new Transform();
				var ti = new  Transform();
                
				scope.render = function(data_max, data_min) {
		            //canvas = document.getElementById("hic_canvas");
		            if(scope.data.n === 0) return;
		            canvas = angular.element(document.querySelector('#hic_canvas'))[0];
		            if (canvas.getContext) {
		                console.log("Drawing hic matrix");
		                var ctx = canvas.getContext("2d");
		                //ctx.imageSmoothingEnabled = false;
		                //ctx.mozImageSmoothingEnabled = false;
		                ctx.imageSmoothingEnabled = false;
				  
		                //clear the canvas
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                
		                var val, x , y = 0;
		                var Logmin = 0;
		                var Logmax = 0;
		                if(scope.data.max > 0 && scope.data.min > 0) {
		                	Logmax = Math.log(Math.abs(scope.data.max));
		                	Logmin = Math.log(Math.abs(scope.data.min));
		                } else if(scope.data.max < 0 && scope.data.min < 0) {
		                	Logmax = Math.log(Math.abs(scope.data.min));
		                	Logmin = Math.log(Math.abs(scope.data.max));
		                } else if(Math.abs(scope.data.max) < Math.abs(scope.data.min)) {
		                	Logmax = Math.log(Math.abs(scope.data.min));
		                } else {
		                	Logmax = Math.log(Math.abs(scope.data.max));
		                }
		                var container_width = parseInt(scope.state.width);
		                var container_height = parseInt(scope.state.height);
		                for(var i=0;i<scope.data.value.length;i++) {
		                	x = Math.floor(scope.data.pos[i]%scope.data.n);
							y = Math.floor(scope.data.pos[i]/scope.data.n);
		                	if(x >= parseInt(canvas.width) && y >= parseInt(canvas.height)) {
		                		break; // avoid overflow
		                	}
		                	//if(x >= (container_width-scope.translatePos.x)/scope.scale && y >= (container_height-scope.translatePos.y)/scope.scale) break;
		                	if(x < parseInt(canvas.width) && y < parseInt(canvas.height)) {
		                		if(scope.data.value[i]!==0) {
		                			//if(scope.data.max<=1) val = Math.floor((Math.log(scope.data.value[i])/Math.log(scope.data.max))*5);
		                			//else 
		                			//val = Math.floor((Math.log(scope.data.value[i])/Math.log(scope.data.max))*255);
		                			if(scope.data.value[i] <= data_max && scope.data.value[i] >= data_min)
		                				val = Math.floor( ((Math.log(Math.abs(scope.data.value[i]))-Logmin)/(Logmax-Logmin))*255 );
		                			else
		                				val = 0;
		                		} else {
		                			val = 0;
		                		}
		                		if(val>=0) {
		                			if(currentOverlay.color.length>0) {
		                				ctx.fillStyle = "rgba("+Math.round(255*currentOverlay.color[i].r)+","+Math.round(255*currentOverlay.color[i].g)+","+Math.round(255*currentOverlay.color[i].b)+","+val/255+")";
		                			} else {
			                			if(scope.data.value[i]>=0) ctx.fillStyle = "rgba(255,0,0,"+val/255+")";
			                			else ctx.fillStyle = "rgba(0,0,255,"+val/255+")";
		                			}
		                		}
		                		ctx.fillRect( x, y, 1 , 1 );
		                	}
		                }
		                
		                //let browser resize it
		                //scope.scale = (container_width-2*parseInt(scope.state.margin))/(Math.sqrt(2)*scope.data.n); 
		                scope.imageObject.src=canvas.toDataURL();
		                
		                if(scope.rendered) return;
		                	
		                d3Service.d3().then(function(d3) {
		                	
		                	scope.safeApply = function(fn) {
								var phase = this.$root.$$phase;
								if(phase == '$apply' || phase == '$digest') {
									if(fn && (typeof(fn) === 'function')) { fn(); }
								} else {
								this.$apply(fn);
								}
							};
		                	brush = d3.svg.brush();

			                //tads svg
			                var hic_data_container = angular.element(document.querySelector('#hic_data_container'));
							if(!svg) {
								svg = d3.select(hic_data_container[0]).append('svg');
							}
							svg.selectAll('*').remove();
							hic_svg = svg.attr('width', container_width-2*parseInt(scope.state.margin))
									.attr('height', container_height-2*parseInt(scope.state.margin))
									.style("position", "absolute")
									.style("top", 2*parseInt(scope.state.margin)+'px')
									.style("left", (2*parseInt(scope.state.margin))+'px')
									.append("g")
									.attr("id", "tads_svg");
							
							handle = hic_svg.append("circle")
								.attr("id", "circ_mark")
								.style("fill", "#fff")
								.style("stroke", "#ccc")
								.style("stroke-widt", 2)
								.attr("cx", ((scope.settings.current.particle-0.5)*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)))
								.attr("cy", container_height-2*parseInt(scope.state.margin))
								.attr("r", 4);

							position = hic_svg.append("text")
								.attr("id", "circ_position")
								.attr("x", ((scope.settings.current.particle-0.5)*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2))-2)
								.attr("y", container_height-2*parseInt(scope.state.margin)-5)
								.style("text-anchor", "bottom")
								.style("font-family", "sans-serif")
								.style("font-size", "10px")
								.style("color", "#333")
								.text(scope.settings.current.particle);

							var stroke_width = 0;
							var resolution, start_tad, end_tad = 0;
							var polygon_tad, start_tad_scaled, end_tad_scaled, tad_height; 
							polygon_tads = [];
							var max_score_tad = 0;
							var min_score_tad = 99;
							for(i=0;i<scope.data.tads.length;i++) {
								if(scope.data.tads[i][3] > max_score_tad) max_score_tad = scope.data.tads[i][3];
								if(scope.data.tads[i][3] < min_score_tad) min_score_tad = scope.data.tads[i][3];
							}
							for(i=0;i<scope.data.tads.length;i++) {
			                	stroke_width = (scope.data.tads[i][3]-min_score_tad)/(max_score_tad-min_score_tad)+0.1;
								// assuming tads given in absolute position
			                	resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
								start_tad = Math.round(((scope.data.tads[i][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                	end_tad = Math.round((scope.data.tads[i][2]-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                 	start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x*Math.sqrt(2)));
			                	polygon_tad = hic_svg.append("rect")
			                 		.attr("id",scope.data.tads[i][0])
			                 		.attr("start",(scope.data.tads[i][1]))
			                 		.attr("end",(scope.data.tads[i][2]))
			                 		.attr("score",(scope.data.tads[i][3]))
			                 		.style("fill", "white")
									.style("fill-opacity", 0)
									.style("stroke", "black")
									.style("stroke-width", stroke_width)
									.style("stroke-dasharray","3,3")
									.attr("class", "polygon_tad")
									.attr('width', end_tad-start_tad+1)
									.attr('height', end_tad-start_tad+1)
									.attr('display', 'block')
									.attr("x", 0)
								 	.attr("y", 0)
								 	.attr("transform", "translate(" + (start_tad_scaled) + ","+(container_height-2*parseInt(scope.state.margin))+") scale("+scope.scale+") rotate(-45 0 0)");
			                		
			                	polygon_tad.append("svg:title").text("Start:"+scope.data.tads[i][1]+",End:"+scope.data.tads[i][2]+",Score:"+scope.data.tads[i][3]);
			                	polygon_tads.push(polygon_tad);
			       
			                }
							
							//marker
							contact_marker = hic_svg.append("rect")
		                 		.attr("id","contact_marker")
		                 		.style("fill", "transparent")
								.style("stroke", "red")
								.style("stroke-width", 1)
								.attr('width', 1)
								.attr('height', 1)
								.attr('display', 'block')
								.attr("x", 0)
							 	.attr("y", 0);
							contact_marker_value = hic_svg.append("text")
								.attr("id", "contact_marker_value")
								.attr("x", 0)
								.attr("y", 0)
								.style("text-anchor", "bottom")
								.style("font-family", "sans-serif")
								.style("font-size", "10px")
								.style("color", "#333")
								.text("0");
							
							//mini hic
							var mini_width = (container_width-2*parseInt(scope.state.margin))/5;
							var mini_height = (container_height-2*parseInt(scope.state.margin))/5;
							if(!mini_svg) {
								mini_svg = d3.select(hic_data_container[0]).append('svg');
							}
							mini_svg.selectAll('*').remove();
							mini_frame = mini_svg
									.attr('width', mini_width)
									.attr('height', mini_height)
									.style("position", "absolute")
									.style("top", '20px')
									.style("left", '20px')
									.style("border", '1px solid black')
									.append("g")
									.attr("id", "mini_svg");
							
		                	mini_hic = mini_frame.append("rect")
						    	.style("fill", "rgba(0, 0, 255, 0.3)")
								.style("stroke", "rgba(0, 0, 255, 0.3)")
								.attr('width', (mini_width-2*58/5)/Math.sqrt(2))
								.attr('height', (mini_width-2*58/5)/Math.sqrt(2))
								.attr('display', 'block')
								.attr("x", 0)
								.attr("y", 0)
								.attr("transform", "translate("+(58/5)+"," + mini_height + ") rotate(-45 0 0)");
						    
		                	scope.mini_scale = (mini_width-2*58/5)/scope.data.n;
		                	
						    mini_sel = mini_frame.append("rect")
								.attr('width', mini_width)
								.attr('height', mini_height)
								.style("fill", "rgba(0, 0, 255, 0.3)")
								.style("stroke", "blue")
								.attr('display', 'block')
								.attr("class","draggable")
								.attr("x", 0)
								.attr("y", 0)
								.attr("posx", 0)
								.attr("posy", 0);   
							
			                svg.on("mousedown", function(){
						        mouseDown = true;
						        startDragOffset.x = d3.event.clientX - scope.translatePos.x;
						        //startDragOffset.y = d3.event.clientY- scope.translatePos.y;
						    });
			                
						    svg.on("mouseup", function(){
						    	if(!mouseMove) {
						    		var markers_position = [-1,-1];
						    		
						    		var mouseCoords = d3.mouse(this);   
						    		var otransformCoords = ti.transformPoint(mouseCoords[0],mouseCoords[1]);
						    		var transformCoords = otransformCoords; 
						            if(transformCoords[0]<0 || transformCoords[1]<0 || transformCoords[0]>scope.data.n || transformCoords[0]>scope.data.n) {
						            	contact_marker.attr('display', 'none');
						            	contact_marker_value.attr('display', 'none');
						            	scope.settings.current.markers_position = markers_position;
						            	scope.$apply(scope.settings.current.markers_position);
						            } else {
						            	contact_marker
						            		.attr("x", mouseCoords[0])
						            		.attr("y", mouseCoords[1])
						            		.attr('width', scope.data.n*scope.scale)
						            		.attr('height', scope.data.n*scope.scale)
						            		.attr("transform", "rotate(45 "+mouseCoords[0]+" "+mouseCoords[1]+")")
						            		.attr('display', 'block');
						            	
						            	var pos = Math.floor(transformCoords[0])+ Math.floor(transformCoords[1])*scope.data.n;
						            	var value_index = scope.data.pos.indexOf(pos);
						            	var value_text = 0;
						            	if(value_index >= 0) value_text = scope.data.value[value_index];
						            	Hic_data.setInteractionFreq(value_text);
						            	contact_marker_value
						            		.attr("x", mouseCoords[0])
						            		.attr("y", mouseCoords[1]-10)
						            		.text(value_text)
						            		.attr('display', 'block');
						            	
						            	//if(scope.settings.current.chromosomeIndexes.length<=2) {
						            		markers_position = scope.transformCoords(transformCoords);
							            	scope.settings.current.markers_position = markers_position;
							            	scope.$apply(scope.settings.current.markers_position);
							            //}
						            }
						            
						    	}
						    	mouseMove = false;
						        mouseDown = false;
						        
						    });
						 
						    svg.on("mouseover", function(){
						        mouseDown = false;
						    });
						 
						    svg.on("mouseout", function(){
						        mouseDown = false;
						    });
						    
						    
						    mini_sel.on("mousedown", function(){
						    	
						        mini_mouseDown = true;
						        mini_startDragOffset.x = d3.event.clientX;
						        mini_startDragOffset.y = d3.event.clientY;
						    });
						 
						    mini_sel.on("mouseup", function(){
						    	scope.mini_mouse_up();
						    });
						    
						    scope.mini_mouse_up = function(){
						    	if(mini_mouseMove) {
						    		mini_translatePos.x = d3.event.clientX - mini_startDragOffset.x;
						            mini_translatePos.y = d3.event.clientY - mini_startDragOffset.y;
						            
						            var posx = parseInt(mini_sel.attr("posx"))+mini_translatePos.x;
						            var posy = parseInt(mini_sel.attr("posy"))+mini_translatePos.y;
						            
						            scope.getRangefromRect(posx,posy,parseInt(mini_sel.attr("posx")));
						            
						            mini_sel.attr("posx",posx);
						            scope.settings.current.igv_position.flag = !scope.settings.current.igv_position.flag;
						            scope.$apply(scope.settings.current.igv_position);
						            scope.update();
									scope.update_marks();						    		
						    	}
						    	mini_mouseMove = false;
						        mini_mouseDown = false;
						    };
		                
						    mini_sel.on("mouseover", function(){
						        mini_mouseDown = false;
						    });
						 
						    mini_sel.on("mouseout", function(){
						        scope.mini_mouse_up();
						    });
						    
						    mini_sel.on("mousemove", function(){
						    	if(mini_mouseDown) {
						    		mini_translatePos.x = d3.event.clientX - mini_startDragOffset.x;
						            mini_translatePos.y = d3.event.clientY - mini_startDragOffset.y;
						            mini_mouseMove = true;
						            
						            var posx = parseInt(mini_sel.attr("posx"))+mini_translatePos.x;
						            var posy = parseInt(mini_sel.attr("posy"))+mini_translatePos.y;
					            	
						            var mini_height = (scope.state.height-2*parseInt(scope.state.margin))/5;
				            		
						            if(posy < mini_height-parseInt(mini_sel.attr("height"))) {
						            	mini_sel.attr("transform", "translate(" + (posx) + "," + (posy) + ")");
						            } else {
						            	mini_sel.attr("transform", "translate(" + (posx) + "," + (mini_height-parseInt(mini_sel.attr("height"))) + ")");
					            	}
						            /*var mini_x, mid_point;
					            	if (typeof scope.settings.current.leftborder != 'undefined') {
					            		mini_x = scope.settings.current.leftborder/5 + mini_translatePos.x;
					            		mid_point = ((parseInt(scope.state.width)-2*parseInt(scope.state.margin))/10);
					            		if(mini_x < mid_point && mini_x > -mid_point) {
						            		mini_hic.attr("transform", "translate(" + (mini_x) + "," + parseInt(scope.state.height)/5 + ") scale("+scope.scale/5+") rotate(-45 0 0)");
						            		mini_hic.attr("posx",mini_x);
						            		mini_hic.attr("posy",parseInt(scope.state.height)/5);
						            		
						            		scope.settings.current.igv_position = mini_translatePos.x*5;
									        scope.$apply(scope.settings.current.igv_position);
					            		}
					            	}*/
						    		
						    	}
						    });
						    
						    /*svg.on("mousemove", function(){
						        if (mouseDown) {
						            scope.translatePos.x = d3.event.clientX - startDragOffset.x;
						            //scope.translatePos.y = d3.event.clientY - startDragOffset.y;
						            mouseMove = true;
						            
						            //scope.update();
						            var x_orig = parseFloat(handle.attr("cx"));
						            
						            //scope.update();
						            var part = (x_orig-parseInt(scope.state.offsetx)-scope.translatePos.x)/(scope.scale*Math.sqrt(2));
						            var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
						            var pos = scope.settings.current.hic_position + (part-scope.settings.current.particle)*resolution;
						            if(pos >= scope.settings.current.chromStart[scope.settings.current.chromIdx] && pos <= scope.settings.current.chromEnd[scope.settings.current.chromIdx]) {
							            scope.settings.current.hic_position = pos;
							            scope.$apply(scope.settings.current.hic_position);
							            //scope.update_marks();
						            }
						            
						            
					            	
						        }
						    });*/
							
						});

		                scope.rendered = true;
		                scope.imageObject.onload = function () {
		                	scope.update();
		                	scope.update_marks();
		                };
		            }
		            
		        };
		        scope.$watch('state.width', function(newWidth, oldWidth) {
		        	if(newWidth !== oldWidth){
		        		scope.rendered = false;
		                scope.render(scope.data.max, scope.data.min);
		        	}
		        });
//		        scope.$watch('settings.current.particle', function(newParticle, oldParticle) {
//					if ( newParticle !== oldParticle) {
//						if (typeof scope.settings.current.leftborder != 'undefined') {
//							var rect = hic_data_container.getBoundingClientRect();
//							scope.translatePos.x = scope.settings.current.leftborder-rect.left;
//						}
//						scope.update();
//						scope.update_marks(); 
//					}
//				});
		        
		        scope.getRectfromRange = function(container, dest_y, dest_margin){
		        	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					var mini_height = (scope.state.height-2*parseInt(scope.state.margin))/5;
					//var offsety = scope.getHeightfromPos();
					
					scope.rect.w = (container.width/(scope.scale*Math.sqrt(2)))*scope.mini_scale;
					scope.rect.h = (container.height/(scope.scale*Math.sqrt(2)))*scope.mini_scale;
	                if(scope.settings.current.igv_position.y == 0) {
	                	scope.rect.y = mini_height - (scope.rect.h);
	                } else if (parseInt(scope.rect.h) != parseInt(mini_sel.attr("height"))){
	                	scope.rect.y = dest_y + parseInt(mini_sel.attr("height")) - scope.rect.h;
	                } else {
	                	scope.rect.y = dest_y;
	                }
	                
	                var offsety = 0;
	                if(scope.settings.current.igv_position.y>0) {
	                	offsety = (scope.settings.current.igv_position.y-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution;
	                	offsety = (offsety)*scope.mini_scale/2;
	                	
	                	scope.rect.x = parseInt(mini_sel.attr("posx"))+parseInt(mini_sel.attr("width"))/2-parseInt(scope.rect.w)/2;
	                	//scope.rect.x = -((scope.settings.current.leftborder+32)/(scope.scale*Math.sqrt(2)))*scope.mini_scale+dest_margin+offsety;
	                } else {
	                	scope.rect.x = -((scope.settings.current.leftborder+32)/(scope.scale*Math.sqrt(2)))*scope.mini_scale+dest_margin+offsety;
						
	                }
					return;
	                
		        };
		        
		        scope.getRangefromRect = function(posx,posy,posx0){
		        	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					var mini_height = (scope.state.height-2*parseInt(scope.state.margin))/5;
					var posgy, posgx, posgx2;
					var start, end;
	            	if(posy < mini_height-scope.rect.h-5 && scope.settings.current.chromosomeIndexes.length < 2) {
	            		posgy = ((mini_height-(posy+scope.rect.h))*2)/(scope.mini_scale);
		            	scope.settings.current.igv_position.y = posgy*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	
		            	start = posx-58/5-(mini_height-(posy+scope.rect.h));
		            	scope.settings.current.igv_position.start1 = (start/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	end = (posx-58/5+scope.rect.w)+(mini_height-(posy+scope.rect.h));
		            	scope.settings.current.igv_position.end2 = (end/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	
		            	mini_sel.attr("posy",posy);
		            } else {
		            	scope.settings.current.igv_position.y = 0;
		            	mini_sel.attr("posy",mini_height-scope.rect.h);
		            	scope.settings.current.igv_position.start1 = ((posx-58/5)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            	
	            	}
	            	scope.settings.current.igv_position.start0 = ((posx0-58/5+2)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
	            	//posgx = ((posx-58/5)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            //scope.settings.current.igv_position.x = posgx;
		            //posgx2 = ((posx-58/5+scope.rect.w)/(scope.mini_scale))*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
		            //scope.settings.current.igv_position.x2 = posgx2;
		            return;
	                
		        };
		        
		        scope.getHeightfromPos = function(){
		        	var posy = 0;
	                var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					if(scope.settings.current.igv_position.y>0) {
	                	posy = (scope.settings.current.igv_position.y-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution;
	                }
					return posy*scope.scale/Math.sqrt(2);
	                
		        };
		        
		        scope.$watch('settings.current.leftborder', function(newPos, oldPos) {
					if ( newPos !== oldPos && scope.data.n > 0) {
						var rect = hic_data_container.getBoundingClientRect();
						
						var offsety = scope.getHeightfromPos();
						scope.translatePos.x = scope.settings.current.leftborder-rect.left-offsety;
						
						var scale = (scope.settings.current.rightborder-scope.settings.current.leftborder)/(Math.sqrt(2)*scope.data.n);
						if(Math.abs(scope.scale-scale)>0.1) {
							scope.scale = scale;
						}
						//scope.settings.current.hic_position = scope.settings.current.position;
						scope.update();
						scope.update_marks();
					}
				});
		        
		        scope.$watch('settings.slidevalue', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue && !angular.isUndefined(newvalue)) {
		        		if(scope.on_filter) {
			        		var slide_value = newvalue.split(";");
			        		var datamin = parseFloat(slide_value[0]);
			        		var datamax = parseFloat(slide_value[1]);
			        		var b = Math.log(10000)/(scope.data.max-0.001);
			        		var a = 10/Math.exp(b*scope.data.max);
			        		if(datamin!==0) datamin=Math.log(datamin/a)/b;
			        		if(datamax!==0) datamax=Math.log(datamax/a)/b;
			        		scope.render(scope.data.max-datamax,scope.data.max-datamin);
		        		} else if(scope.on_diff_hic) {
		        			scope.refreshDiff();
		        			scope.render(scope.data.max,scope.data.min);
		        		}
		        		
		        	}
				});
		        scope.$watch('settings.current.chromosomeIndexes', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue && !angular.isUndefined(newvalue)) {
		        		scope.data = Hic_data.get();
		        		polygon_tads = [];
		        		scope.update_data(scope.data);
		        	}
		        });	
		        
		        scope.transformCoords = function(transformCoords){
		        	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
	            	var x_mark, y_mark;
	            	scope.settings.current.markers_chr = [scope.settings.current.chromosomeIndexes[0],scope.settings.current.chromosomeIndexes[0]];
	            	var chr_bins = 0;
	            	var i = 0;
	            	while(chr_bins<transformCoords[0]) {
	            		x_mark = (transformCoords[0]-chr_bins)*resolution+(scope.settings.current.chromStart[i]);
	            		chr_bins += Math.round(scope.settings.current.chromEnd[i]/resolution)-Math.round(scope.settings.current.chromStart[i]/resolution); 
	            		i++;
	            	}
	            	scope.settings.current.markers_chr[0] = scope.settings.current.chromosomeIndexes[i-1];
	            	chr_bins = 0;
	    			i = 0;
	            	while(chr_bins<transformCoords[1]) {
	            		y_mark = (transformCoords[1]-chr_bins)*resolution+(scope.settings.current.chromStart[i]);
	            		chr_bins += Math.round(scope.settings.current.chromEnd[i]/resolution)-Math.round(scope.settings.current.chromStart[i]/resolution); 
	            		i++;
	            	}
	            	scope.settings.current.markers_chr[1] = scope.settings.current.chromosomeIndexes[i-1];
	            	
	            	return [x_mark,y_mark];
                };
                
		        // UPDATE
				scope.update = function() {
					
					
	                if(!scope.rendered)	scope.render(scope.data.max, scope.data.min);
					var canvas = document.getElementById("hic_canvas");
					var container_height = parseInt(scope.state.height);
					if (canvas.getContext) {
		                var ctx = canvas.getContext("2d");
		                ctx.clearRect(0,0, canvas.width, canvas.height);
		                ctx.save();
		                //ctx.translate(scope.translatePos.x, container_height-10);
		                //ctx.rotate(-Math.PI/4);
		                //ctx.scale(scope.scale, scope.scale);
		                t.reset();
		                var offsety = scope.getHeightfromPos();
		            	t.translate(scope.translatePos.x+parseInt(scope.state.offsetx), container_height+offsety);
		            	t.rotate(-Math.PI/4);
		            	t.scale(scope.scale, scope.scale);
		            	ti.m  = t.m.slice();
		                ti.invert();
		                var m = t.m;
		                ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
		                ctx.drawImage(scope.imageObject,0,0);
            			ctx.restore();
		            }
				};

				scope.update_marks =  function() {
					if (typeof handle == 'undefined') return;
					var x = (((scope.settings.current.particle-1)+0.5)*Math.sqrt(2))*scope.scale+(scope.translatePos.x)+parseInt(scope.state.offsetx);
					handle.attr("cx",x);
					position.attr("x",x).text(scope.settings.current.particle);
					
					contact_marker.attr('display', 'none');
	            	contact_marker_value.attr('display', 'none');
	            	
	            	
	            	var rect = hic_data_container.getBoundingClientRect();
	            	
	            	scope.getRectfromRange(rect, parseInt(mini_sel.attr("posy")), 58/5);
	            	
	            	if (typeof scope.settings.current.leftborder != 'undefined') {
	            		mini_sel.attr("width", scope.rect.w);
	            		mini_sel.attr("height", scope.rect.h);
	            		mini_sel.attr("posy", scope.rect.y);
	            		mini_sel.attr("transform", "translate(" + (scope.rect.x) + "," + (scope.rect.y) + ")");
	            		mini_sel.attr("posx", scope.rect.x);
	            		
	            	}
				        
	            	var offsety = scope.getHeightfromPos();
					var container_width = parseInt(scope.state.width);
	                var container_height = parseInt(scope.state.height);
	                handle.attr("cy",container_height-2*parseInt(scope.state.margin)+offsety);
	                position.attr("y",container_height-2*parseInt(scope.state.margin)+offsety);
					var resolution, start_tad, end_tad = 0;
					var start_tad_scaled, end_tad_scaled;
					if(scope.show_tads) {
						for(var i=0;i<polygon_tads.length;i++) {
							resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
							start_tad = Math.round(((scope.data.tads[i][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
							start_tad_scaled = Math.round((start_tad*Math.sqrt(2))*scope.scale+(scope.translatePos.x)+parseInt(scope.state.offsetx));
							
							polygon_tads[i]
								.attr("transform", "translate(" + (start_tad_scaled) + ","+(container_height-2*parseInt(scope.state.margin)+offsety)+") rotate(-45 0 0) scale("+scope.scale+")");
							if(i != scope.highlighted_tad) polygon_tads[i].style("fill-opacity", 0.5);
							if(scope.settings.current.position>=parseInt(polygon_tads[i].attr("start")) && scope.settings.current.position<=parseInt(polygon_tads[i].attr("end"))){
								scope.highlighted_tad = i; 
							}	
						}
					}
				};
				
//				scope.update_width =  function() {
//					scope.settings.current.hic_position += 1;
//				};

				scope.update_height =  function() {
					scope.rendered = false;
					scope.update();
					scope.update_marks();
				};
					
				scope.$watch('highlighted_tad', function(newvalue,oldvalue) {
		        	if ( newvalue !== oldvalue) {
		        		if(newvalue ==-1) {
		        			polygon_tads[oldvalue].style("fill-opacity", 0.5);
		        			return true;
		        		}
		        		polygon_tads[newvalue].style("fill-opacity", 0);
		        		var start_tad_segment, end_tad_segment, i;
		        		if(oldvalue>-1) {
			        		polygon_tads[oldvalue].style("fill-opacity", 0.5);
			        		start_tad_segment = Math.round((parseInt(polygon_tads[oldvalue].attr("start")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
			        		end_tad_segment = Math.ceil((parseInt(polygon_tads[oldvalue].attr("end")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
		        		}
		        		start_tad_segment = Math.round((parseInt(polygon_tads[newvalue].attr("start")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
		        		end_tad_segment = Math.ceil((parseInt(polygon_tads[newvalue].attr("end")) - scope.settings.current.chromStart[scope.settings.current.chromIdx])/scope.settings.current.segmentLength);
		        		scope.settings.current.tad_selected = newvalue;
		        	}
				});
				scope.translatePos = {
					x: 0,
				    y: 0
				};
			 
			    scope.scale = 1.0;
	
			    scope.increasezoom = function() {
			    	scope.scale /= scaleMultiplier;
			        scope.update();
			        scope.update_marks();
			    };
			 
			    scope.reducezoom = function() {
			    	scope.scale *= scaleMultiplier;
			        scope.update();
			        scope.update_marks();
			    };
			    
			    scope.toggle = function(newValue){
			        scope.show_tads = newValue;
			        for(var i=0;i<polygon_tads.length;i++) {							
						if(scope.show_tads) {
							polygon_tads[i].attr('display', 'block');
						} else {
							polygon_tads[i].attr('display', 'none');
							scope.highlighted_tad = -1; 
							scope.settings.current.tad_selected = -1;
							//scope.settings.current.end_tad_selected = -1;
						}
			        }
			        scope.update_marks();
			    };
			    scope.settings.current.selDataset1 = 0;
				scope.settings.current.selDataset2 = 1;
				scope.diffslidevalue = 0;
			    scope.togglediff = function(newValue){
					scope.on_diff_hic = newValue;
					if(scope.on_diff_hic && scope.on_filter) {
						scope.on_filter = false;
					}
			    };
			    scope.togglefilter = function(item){
			    	if(item == 'filter') {
			    		scope.on_filter = !scope.on_filter;
			    		if(scope.on_filter) {
			    			if(scope.on_diff_hic) {
			    				scope.on_diff_hic = false;
			    				scope.diffslidevalue = scope.settings.slidevalue;
			    			}
			    			scope.settings.slidevalue = scope.slidevalue; 
			    		}
			    	}
			    	else if(item == 'diff_hic') {
			    		scope.on_diff_hic = !scope.on_diff_hic;
			    		if(scope.on_diff_hic) {
			    			if(scope.on_filter) {
			    				scope.on_filter = false;
			    				scope.slidevalue = scope.settings.slidevalue;
			    			}
			    			scope.settings.slidevalue = scope.diffslidevalue; 
			    			scope.refreshDiff();
			    		} else {
			    			scope.data = Hic_data.get();
			        		polygon_tads = [];
			        		scope.update_data(scope.data);
			    		}
			    	}
				
			    };
			    scope.refreshDiff = function() {
			    	var val = parseFloat(scope.settings.slidevalue);
			    
			    	var chromStart = [];
					var chromEnd = [];
	            	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
					var chromIdx;
					var offset = 0;
					for (var l = 0 ; l < scope.settings.current.datasets.loaded[scope.settings.current.selDataset1].object.chrom.length; l++) {
						chromIdx = scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.datasets.loaded[scope.settings.current.selDataset1].object.chrom[l]);
						if(chromIdx > -1) {
							chromStart.push(Math.round((scope.settings.current.chromStart[l]-scope.settings.current.chromStart[0])/resolution)+offset);
							chromEnd.push(Math.round((scope.settings.current.chromEnd[l]-scope.settings.current.chromStart[0])/resolution)+offset);
						}
						offset += Math.round(scope.settings.current.chromEnd[l]/resolution)-Math.round(scope.settings.current.chromStart[l]/resolution);
					}
			    	
			    	//new_value[i] = (1-val)*scope.settings.current.datasets.loaded[scope.selDataset1].hic_data.data[pos]-val*scope.settings.current.datasets.loaded[scope.selDataset2].hic_data.data[pos];
			    	var new_data = Hic_data.getDiff(scope.settings.current.datasets.loaded[scope.settings.current.selDataset1].hic_data,
			    								scope.settings.current.datasets.loaded[scope.settings.current.selDataset2].hic_data,
			    								val,
			    								chromStart,
			    								chromEnd);
			    	scope.data = new_data;
			    };
			    scope.update_data = function(data){
			    	scope.data = data;
			    	var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					//var first_n = Math.round((scope.settings.current.chromEnd[0]-scope.settings.current.chromStart[0])/resolution)+1;
					scope.scale = (scope.settings.current.rightborder-scope.settings.current.leftborder)/(Math.sqrt(2)*scope.data.n);
			    	if (typeof scope.settings.current.leftborder != 'undefined') {
			    		var offsety = Math.sqrt(2)*scope.getHeightfromPos();
						var rect = hic_data_container.getBoundingClientRect();
						scope.translatePos.x = scope.settings.current.leftborder-rect.left-offsety;
					}
			    	scope.rendered = false;
	                scope.render(data.max, data.min);
	                scope.update();
	                scope.update_marks();
			    }; 
			    scope.exportCanvasAsPNG = function(fileName) {
			    	
			    	var MIME_TYPE = "image/png";
			        var dlLink = document.createElement('a');
			        dlLink.download = fileName;
			        dlLink.href = scope.imageObject.src;
			        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

			        document.body.appendChild(dlLink);
			        dlLink.click();
			        document.body.removeChild(dlLink);
			    };
			    scope.$watch('currentoverlay.colors.chromatin', function( newColors, oldColors ) {
					if ( newColors !== oldColors) {
						currentOverlay = {
					    		color: []
							};
						var currentOverlayIndex = Overlays.getCurrentIndex();
						if(currentOverlayIndex != originalOverlayIndex) {
							var col = { r:0, g:0, b:0};
							var coln = { r:0, g:0, b:0};
							var colori, colorj, i, x, y, k, luma, newChromatinColor, newChromatinColori, newChromatinColorj;
							for(i = 0;i < scope.data.value.length;i++) {
			                	x = Math.floor(scope.data.pos[i]%scope.data.n);
								y = Math.floor(scope.data.pos[i]/scope.data.n);
								colori = x * scope.settings.current.particleSegments;
								colorj = y * scope.settings.current.particleSegments;
								col = { r:1, g:1, b:1};
								newChromatinColor =  new THREE.Color();
								for (k = 0; k < scope.settings.current.particleSegments; k++) {
									coln = { r:1, g:1, b:1};
									if(newColors[colori+k] == 'gray' || newColors[colorj+k] == 'gray') {
										newChromatinColori =  new THREE.Color('white');
										newChromatinColorj =  new THREE.Color('white');
									} else {
										if(ColorConvert.testIfHex(newColors[colori+k]) || newColors[colori+k].indexOf('#')===0) {
											newChromatinColori =  new THREE.Color(newColors[colori+k]);	 
										} else {
											newChromatinColori =  new THREE.Color(ColorConvert.nameToHex(newColors[colori+k]));
										}
										if(ColorConvert.testIfHex(newColors[colorj+k]) || newColors[colorj+k].indexOf('#')===0) {
											newChromatinColorj =  new THREE.Color(newColors[colorj+k]);
										} else {
											newChromatinColorj =  new THREE.Color(ColorConvert.nameToHex(newColors[colorj+k]));
										}
									}
									
									coln.r = (newChromatinColori.r + newChromatinColorj.r)/2; 
									coln.g = (newChromatinColori.g + newChromatinColorj.g)/2;
									coln.b = (newChromatinColori.b + newChromatinColorj.b)/2;
									luma = 0.2126 * coln.r + 0.7152 * coln.g + 0.0722 * coln.b; // per ITU-R BT.709
									if(luma < 0.2126 * col.r + 0.7152 * col.g + 0.0722 * col.b) {
										col.r = coln.r;
										col.g = coln.g;
										col.b = coln.b;
									}
									
								}
									
								//newChromatinColor =  new THREE.Color(col.r/scope.settings.current.particleSegments,col.g/scope.settings.current.particleSegments,col.b/scope.settings.current.particleSegments);
								newChromatinColor =  new THREE.Color(col.r,col.g,col.b);
								currentOverlay.color.push(newChromatinColor);
								
							}
							
						}
						
						scope.render(scope.data.max,scope.data.min);
						
					}
				});
			    
			    
			    
			    $timeout(function () {
			    	scope.update();
			    	//if(scope.show_tads) scope.toggleOverlay(newOverlay);
                });
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelIgvjsControllerBeta', PanelIgvjsControllerBeta);

	function PanelIgvjsControllerBeta($scope, $window, $timeout, $mdDialog, Overlays,Storyboards, uuid4, Track_data, d3Service, Datasets, Users, Settings) {

		$scope.showInfo = function(info) {
			$mdDialog.show({
			      parent: angular.element(document.body),
			      template: '<md-dialog md-theme="default" aria-label="Information">' +
			        '  <md-dialog-content class="md-default-theme">' + info +
			        '<div class="md-actions"><md-button ng-click="closeDialog();" class="md-primary md-button md-default-theme"><span class="ng-binding ng-scope">Close</span></md-button></div>' +
			        '  </md-dialog-content>' +
			        '</md-dialog>',
			      locals: {

			      },
			      controller: DialogController
			    });
		};

		function DialogController($scope, $mdDialog) {
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			};
		}
		
		if(angular.isUndefined($scope.settings.current.speciesUrl) || angular.isUndefined($scope.view.settings.species_data[$scope.settings.current.speciesUrl])) {
			$scope.settings.current.speciesUrl = Datasets.setSpeciesUrl();
			if(angular.isUndefined($scope.settings.current.speciesUrl) || angular.isUndefined($scope.view.settings.species_data[$scope.settings.current.speciesUrl])) {
				var output = '<div class="component-caption" layout="column" layout-align="left center">No species specified in the dataset</div>'; 
				$timeout(function() {$scope.showInfo(output);});
				return;
			}
		}

		var scene_component = Storyboards.getComponentById('Chromatin');
		var scene_width = 0;
		if(typeof scene_component !== 'undefined') {
			scene_width = parseInt(scene_component.object.state.width);
		} else {
			var inspector_component = Storyboards.getComponentById('Inspector');
			var inspector_width = 0;
			if(typeof inspector_component !== 'undefined') {
				inspector_width = parseInt(inspector_component.object.state.width);
			}
			scene_width = inspector_width;
		}
		$scope.width = $scope.state.width = $window.innerWidth - scene_width - 50 - 2*parseInt($scope.state.margin);
		$scope.height = $scope.state.height =  parseInt($scope.state.height)-2*parseInt($scope.state.margin); // strip PX units
		
		//$scope.width = $scope.state.width; // strip PX units
		//$scope.height = $scope.state.height; // strip PX units
		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = $window.innerWidth - newValue - 50 - 2*parseInt($scope.state.margin);
				$scope.myIgv.repaint();
//		  		$scope.myIgv.genomicStateList.forEach(function (genomicState) {
//            		$scope.myIgv.updateWithLocusIndex( genomicState );
//        		});
			}
		});

		var w = angular.element($window);
		$scope.$watch(
		  function () {
		    return $window.innerWidth;
		  },
		  function (value) {
		    $scope.width = $scope.state.width = value - scene_width - 50 - 2*parseInt($scope.state.margin);
		  	//$scope.$apply();
		  },
		  true
		);
		
		var originalOverlay = Overlays.getCurrentIndex();
		var track_data = Track_data.get();
		var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
		var igvjs_start = (($scope.settings.current.chromStart[$scope.settings.current.chromIdx])-1*resolution);
		if(igvjs_start<0) igvjs_start = 0;
		var chrom = ($scope.settings.current.chrom);
		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
		
		/*
		Configuration of igvjs object

		$scope.view.settings.species_data: configuration array containing the location of the reference genome. 
			It can be a file or url where the browser will fetch the data.
		$scope.view.settings.showNav: true/false whether to show the navigation panel in igvjs 
		$scope.view.settings.showCyto: true/false wheter to show cytoband panel in igvjs
		*/
		if(typeof $scope.settings.current.assemblyUrl === 'undefined' || typeof $scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl] === 'undefined') {
			$scope.settings.current.assemblyUrl = Object.keys($scope.view.settings.species_data[$scope.settings.current.speciesUrl])[0]; 
		}
			
		var igv_reference;
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].fastaURL) {
			igv_reference = {
				id: $scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].id,
				fastaURL:$scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].fastaURL,
				cytobandURL:null
			};
			$scope.view.settings.showNav = true;
			if($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].cytobandURL) {
				igv_reference.cytobandURL = $scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].cytobandURL;
				$scope.view.settings.showCyto = false;
			} else {
				$scope.view.settings.showCyto = false;
			}
		} else {
			igv_reference = {
				id: $scope.settings.current.speciesUrl
			};
			$scope.view.settings.showNav = true;
		}
		$scope.settings.current.tracks = Users.getTracks();
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].tracks) {
			$scope.settings.current.tracks = $scope.settings.current.tracks.concat($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].tracks);
		}
		
		
		/* 
		div dom element where to include igvjs browser
		*/
		$scope.igvDiv = angular.element(document.querySelector('#igvDiv'))[0];
		/* 
		igvjs options. See igvjs docs for details
		*/
		$scope.igvOptions = {
		            showNavigation: $scope.view.settings.showNav,
		            showRuler: true,
		            showIdeogram: $scope.view.settings.showCyto,
		            showKaryo: $scope.view.settings.showCyto,
		            flanking: 100000,
		            reference: igv_reference,
					locus: chrom+':'+igvjs_start+'-'+($scope.settings.current.chromEnd[$scope.settings.current.chromIdx]),
					tracks: $scope.settings.current.tracks.slice()
		        };
			
		$scope.updatePosition =  function(position, leftborder, rightborder) {
			//console.log(position);
			var span_region = 0;
			var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
			for(var i = 0; i<$scope.settings.current.chromosomeIndexes.length;i++) {
				span_region += $scope.settings.current.chromEnd[i] - $scope.settings.current.chromStart[i];			
			}
			span_region += $scope.settings.current.chromStart[0];
			if(position >= $scope.settings.current.chromStart[$scope.settings.current.chromIdx] && position <= span_region) {
				$scope.settings.current.position = position;
			}
			if(position < $scope.settings.current.chromStart[$scope.settings.current.chromIdx]) {
				$scope.settings.current.position = $scope.settings.current.chromStart[$scope.settings.current.chromIdx];
			}  
			if(position > span_region) {
				$scope.settings.current.position = span_region;
			}
			if($scope.settings.current.leftborder != leftborder || $scope.settings.current.rightborder != rightborder) {
				$scope.settings.current.leftborder = leftborder;
				$scope.settings.current.rightborder = rightborder;
			}
			$scope.hideTadkitMarkers();
			$scope.updateTadkitTAD();
			
			$timeout(function() {$scope.$apply();});
		};
		$scope.applyOverlay =  function(track,features) {
			var self = this;
			var overlays = Overlays.get();
			for(var i=0;i<overlays.loaded.length;i++) {
				if (overlays.loaded[i].object.title === track) {
					$scope.toggleOverlay(overlays.loaded[i].object.state.index);
					return true;
				}
			}
			
			var igvJsOverlay =
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : overlays.loaded.length,
									"title" : track,
									"source" : "igvJs track",
									"url" : "local",
									"description" : "igvJs track overlay", 
									"type" : "igvJs",
									"format" : "variable",
									"components" : 2,
									"name" : track,
									"state" : {
										"index" : 0, // make real index???
										"overlaid" : false
									}
								},
								"palette" : [],
								"data" : [],
								"colors" : {
									"particles" : [],
									"chromatin" : [],
									"network" : {
										"RGB" : [],
										"alpha" : []
									}
								}
							};
			var totallength;
			var k, max_val, min_val;
			var j = 0;
			var l = 0;
			
			for(k=0;k<$scope.settings.current.segmentsCount;k++) {
				igvJsOverlay.colors.chromatin[k] = "gray";
			}

			var featureColor = [];
			var scored_color = false;
			var motifcolor;
			var feature;
			var nbrmotif;
			var tmpfeature = [];
			angular.forEach(features, function(feature) {
				if(typeof feature.color == 'undefined') {
					if(typeof feature.score !== 'undefined') featureColor.push(feature.score);
					if(typeof feature.value !== 'undefined') featureColor.push(feature.value);
					scored_color = true;
				} else {
					featureColor.push(feature.color);
				}
			});
			if(scored_color) {
				var hexEnd = '#0000ff';
				var hexStart = '#ffffff';
				var first_start = 0;
				var n = 0;
				l = 0;
				while(n<featureColor.length) {
					totallength = 0;
					motifcolor = 0;
					nbrmotif = 0;
					first_start = features[n].start;
					while(totallength < 1 && n < featureColor.length) {
						feature = features[n];
						totallength = (feature.end - first_start)/$scope.settings.current.segmentLength;
						motifcolor = motifcolor + parseFloat(featureColor[n]);
						nbrmotif++;
						n++;
					}
					tmpfeature.push(motifcolor);
				}
				max_val = Math.max.apply(Math, tmpfeature);
				min_val = Math.min.apply(Math, tmpfeature);
				
				n = 0;
				l = 0;
				while(n<featureColor.length) {
					totallength = 0;
					motifcolor = 0;
					first_start = features[n].start;
					while(totallength < 1 && n < featureColor.length) {
						feature = features[n];
						totallength = (feature.end - first_start)/$scope.settings.current.segmentLength;
						motifcolor = motifcolor + parseFloat(featureColor[n]);
						n++;
					}
					featureColor[l] = d3.interpolateHcl(hexStart, hexEnd)((motifcolor-min_val)/(max_val-min_val));
					j = Math.round((first_start - $scope.settings.current.chromStart[$scope.settings.current.chromIdx])/$scope.settings.current.segmentLength);
					for(k=j;k<(j+Math.round(totallength)) && k<$scope.settings.current.segmentsCount;k++) {
						igvJsOverlay.colors.chromatin[k] = featureColor[l];
					}
					l++;
				}
			} else {
				angular.forEach(features, function(feature) {
					j = Math.round((feature.start - $scope.settings.current.chromStart[$scope.settings.current.chromIdx])/$scope.settings.current.segmentLength);
					totallength = Math.round((feature.end - feature.start)/$scope.settings.current.segmentLength);
					for(k=j;k<(j+totallength) && k<$scope.settings.current.segmentsCount;k++) {
						igvJsOverlay.colors.chromatin[k] = featureColor[l];
					}
					l++;
				});
			}
			var newOverlay = Overlays.addDirect(igvJsOverlay);
			var overlay = overlays.loaded[newOverlay];
			
			overlay.colors.particles = [];
			//overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, $scope.settings.current.edgesCount);
			//overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, $scope.settings.current.edgesCount);
			overlay.colors.network.RGB = [];
			overlay.colors.network.alpha = [];
			$scope.toggleOverlay(newOverlay);
			//Overlays.setOverlaid(newOverlay);
			//Overlays.set(newOverlay);
			//$scope.currentoverlay = Overlays.set(newOverlay);
		};
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.currentoverlay = Overlays.getOverlay();
			} else {
				Overlays.setOverlaid(originalOverlay);
				Overlays.set(originalOverlay);
				$scope.currentoverlay = Overlays.getOverlay();
			}
			//$scope.$apply($scope.currentoverlay.colors.chromatin);
			//$scope.toggleColor($scope.currentoverlay.colors.chromatin);
			$scope.toggleColor($scope.currentoverlay);
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};
		$scope.removeOverlay =  function(track) {
			var overlays = Overlays.get();
			angular.forEach(overlays.loaded, function(overlay) {
				if (overlay.object.title === track) {
					$scope.toggleOverlay(overlay.object.state.index);
				}

			});
		};
		/* 
		Creation of igvjs javascript object
		*/
		$scope.myIgv = igv.createBrowser($scope.igvDiv, $scope.igvOptions);
		
		// Disable search input
		//$scope.myIgv.$searchInput.off('change');
        
		// Hide search icon
		//var search_icon = angular.element(document.querySelector('.igv-search-container'))[0];
		//$(search_icon).hide();
		// Show center guide by default. The centerguide will be tadkit position in the 2D and 3D
		$scope.myIgv.centerGuide.$centerGuideToggle.click();
		
		
		/*
		Create div indicating selected tad in the browser.
		#tad-highlight-tadkit should be styled in the main css
		*/
		var d = angular.element("<div id=\"tad-highlight-tadkit\" style=\"width='0px;';display=none;\"></div>");
		var trackContainer = angular.element($scope.myIgv.trackContainerDiv);
		trackContainer.append(d);
		
		var dl = angular.element("<div id=\"trackbar-tadkit-left-mark\" style=\"display=none\"></div>");
		trackContainer.append(dl);
		var dr = angular.element("<div id=\"trackbar-tadkit-right-mark\" style=\"display=none\"></div>");
		trackContainer.append(dr);
		
		/*
		Main function moving and resizing the #tad-highlight-tadkit depending on the current tad
		*/
		$scope.updateTadkitTAD = function() {
        	if(typeof($scope.settings.current.tad_selected) != 'undefined' && $scope.settings.current.tad_selected!=-1) {
        		/* Look for the referenceFrame of the reference sequence.
        		referenceFrame contains:
        			start: the genomic position corresponding to the left border of the browser
        			bpPerPixel: corresponding base pairs per 1 pixel
        		*/
        		var genomicState = _.first($scope.myIgv.genomicStateList);
            	var referenceFrame = genomicState.referenceFrame;
        		// Compute left position and width of the #tad-highlight-tadkit
        		if(typeof(referenceFrame) != 'undefined') {
	            	//trackPane.style.backgroundColor = "rgba(0,0,0,0.05)";
	            	var start_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][1];
	            	var end_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][2];
	            	
	            	var leftpos = Math.round((start_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
	                d.css("left",Math.floor(leftpos+50) + "px");
	                var rightpos = Math.round((end_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
	                d.css("width",Math.floor(rightpos-leftpos) + "px");
	                d.css("display","block");
        		}
        		
                
            } else {
            	//trackPane.style.backgroundColor = "";
            	d.css("width","0px");
            	d.css("display","none");
            	
            }
        };

        $scope.myIgv.zoomHandlers = {
                in: {
                    click: function (e) {
                        $scope.myIgv.zoomIn();
                    }
                },
                out:{
                    click: function (e) {
                        $scope.myIgv.zoomOut();
                    }
                }
            };
        
        $scope.synchronizeViewports = function() {

        	var genomicState,
        		mainGenomicState,
        		offset,
	            viewportWidth,
	            referenceFrame,
	            resolution,
	            start,
	            end,
	            second_loci;
	    	
        	resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
        	mainGenomicState = $scope.myIgv.genomicStateList[0];
        	viewportWidth = igv.browser.viewportContainerWidth()/mainGenomicState.locusCount;
        	offset = (mainGenomicState.referenceFrame.bpPerPixel * viewportWidth) + mainGenomicState.referenceFrame.start;
        	offset -= ($scope.settings.current.chromEnd[0]-$scope.settings.current.chromStart[0]);
        	
        	second_loci=0;
        	if($scope.settings.current.chromosomeIndexes.length>1) second_loci=1;
        	
        	genomicState = $scope.myIgv.genomicStateList[1];
	    	referenceFrame = genomicState.referenceFrame;
        
    		referenceFrame.bpPerPixel = mainGenomicState.referenceFrame.bpPerPixel;
    		start = ($scope.settings.current.chromStart[second_loci]-1*resolution + offset);
    		start = Math.max(0, start);
    		referenceFrame.start = start;

	    	for(var t=0;t<$scope.myIgv.trackViews.length;t++) {
    			$scope.myIgv.trackViews[t].update();
    		}
	    	//$scope.myIgv.update();
        };
        
//        $scope.$watch('settings.current.igv_position.x', function(newPos, oldPos) {
//            if(!angular.equals(newPos, oldPos)) {
//            	//$scope.myIgv.goto(($scope.settings.current.chrom),newPos);
//            	if ($scope.myIgv.loadInProgress()) {
//                    return;
//                }
//            	$scope.moveViewport(0,$scope.settings.current.leftborder-newPos);
//            	if($scope.myIgv.genomicStateList[0].locusCount>1) $scope.moveViewport(1,$scope.settings.current.leftborder-newPos);
//            }
//        });
        
        $scope.moveViewport = function(locusIndex,offset) {
        	
        	var genomicState = $scope.myIgv.genomicStateList[locusIndex];
        	var referenceFrame = genomicState.referenceFrame;
        	var viewportWidth = igv.browser.viewportContainerWidth()/genomicState.locusCount;
        	// clamp left
            referenceFrame.start = Math.max(0, referenceFrame.start);

            // clamp right
            var chromosome = $scope.myIgv.genome.getChromosome(referenceFrame.chrName);
            var maxEnd = chromosome.bpLength;
            var maxStart = maxEnd - viewportWidth * referenceFrame.bpPerPixel;

            if (referenceFrame.start > maxStart) {
                //referenceFrame.start = maxStart;
            	chromosome.bpLength += referenceFrame.start - maxStart;
            }
            
            referenceFrame.shiftPixels(offset);

        	$scope.myIgv.updateLocusSearchWithGenomicState($scope.myIgv.genomicStateList[locusIndex]);

            //$scope.myIgv.repaint();
        	$scope.myIgv.repaintWithLocusIndex(locusIndex);
        	
        	$scope.myIgv.fireEvent('trackdrag');
        
        };    
        
        $scope.settings.current.igvloading = $scope.myIgv.loadInProgress();
        
        $scope.setIgvTracks = function() {
        	var start0, start1, end2, y;
        	start0 = Math.max(0,Math.round($scope.settings.current.igv_position.start0));
        	start1 = Math.max(0,Math.round($scope.settings.current.igv_position.start1));
        	end2 = Math.round($scope.settings.current.igv_position.end2);
        	y = Math.round($scope.settings.current.igv_position.y);
        	
        	if ($scope.myIgv.loadInProgress()) {
                return;
            }
        	
        	var genomicState,
        		mainGenomicState,
        		offset,
	            viewportWidth,
	            referenceFrame,
	            resolution,
	            start,
	            end,
	            span_region;
	    	
        	
        	var igvjs_go = [];
			resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
			mainGenomicState = $scope.myIgv.genomicStateList[0];
			viewportWidth = igv.browser.viewportContainerWidth();
        	span_region = Math.round((mainGenomicState.referenceFrame.bpPerPixel * viewportWidth));
        	
        	if($scope.settings.current.chromosomeIndexes.length == 2) return;
        	
        	igvjs_go.push($scope.settings.current.chromosomeIndexes[0]);
        	if(!$scope.view.settings.leading_chr) igvjs_go[0] = igvjs_go[0].replace('chr','');
        	
        	if(mainGenomicState.locusCount>1) {
				if(y <= 0) {
					igvjs_go[0] += ':' + mainGenomicState.referenceFrame.start + '-' + (mainGenomicState.referenceFrame.start+Math.round(span_region));
					$scope.myIgv.parseSearchInput(igvjs_go.join(' '));
					angular.element($scope.myIgv.trackContainerDiv).css("pointer-events","initial");
					return;
				}
				//$scope.moveViewport(0,x);
				//$scope.moveViewport(1,-x);
			}
			if(y > 0 && $scope.settings.current.chromosomeIndexes.length < 2)  {
				
				//igvjs_go[0] += ':' + (mainGenomicState.referenceFrame.start-Math.round(mainGenomicState.referenceFrame.bpPerPixel*newPos)) + '-' + (mainGenomicState.referenceFrame.start-Math.round(mainGenomicState.referenceFrame.bpPerPixel*newPos)+Math.round(span_region/2));
				start = Math.round(start1+50*mainGenomicState.referenceFrame.bpPerPixel);
				end = Math.round(start1+50*mainGenomicState.referenceFrame.bpPerPixel+span_region/2);
				
				var chromosome = $scope.myIgv.genome.getChromosome(mainGenomicState.referenceFrame.chrName);
	            var maxEnd = chromosome.bpLength;
	            var maxStart = maxEnd - viewportWidth * mainGenomicState.referenceFrame.bpPerPixel;

	            if (start > maxStart) {
	                //referenceFrame.start = maxStart;
	            	chromosome.bpLength += start - maxStart;
	            }
	            //mainGenomicState.referenceFrame.start = Math.max(0,(x-start - (x-mainGenomicState.referenceFrame.start));
				igvjs_go[0] += ':' + (start) + '-' + (end);
				
				
				igvjs_go.push($scope.settings.current.chromosomeIndexes[0]);
				if(!$scope.view.settings.leading_chr) igvjs_go[1] = igvjs_go[1].replace('chr','');
				//igvjs_go[1] += ':' + (mainGenomicState.referenceFrame.start+Math.round(mainGenomicState.referenceFrame.bpPerPixel*newPos)) + '-' + (mainGenomicState.referenceFrame.start+Math.round(mainGenomicState.referenceFrame.bpPerPixel*newPos)+Math.round(span_region));
				start = Math.round(end2-75*mainGenomicState.referenceFrame.bpPerPixel-span_region/2);
				end = Math.round(end2-75*mainGenomicState.referenceFrame.bpPerPixel);
				igvjs_go[1] += ':' + (start) + '-' + (end);
				
				$scope.myIgv.parseSearchInput(igvjs_go.join(' '));
				$scope.hideIgvLabels(true);
				angular.element($scope.myIgv.trackContainerDiv).css("pointer-events","none");
				//$scope.moveViewport(1,-x);
				//offset = (x- mainGenomicState.referenceFrame.start)/mainGenomicState.referenceFrame.bpPerPixel;
	            //$scope.moveViewport(0,-offset);
			} else {
				offset = (start1 - start0)/mainGenomicState.referenceFrame.bpPerPixel;
	            $scope.moveViewport(0,offset);
			}
        };
        
        $scope.$watch('settings.current.igv_position.flag', function(newPos, oldPos) {
            if(!angular.equals(newPos, oldPos)) {
            	$scope.setIgvTracks();
            }    
        });
        
        $scope.$watch('settings.current.tracks', function(newTracks, oldTracks) {
            if(newTracks != oldTracks) {
            	$scope.myIgv.loadTrack(newTracks[newTracks.length-1]);
            	$scope.updateFeaturesList();
            }    
        });

        $scope.hideIgvLabels = function(label) {
        	var igvExtraDivs;
	    	var d;
	    	var txts = [];
	    	var parents = [];
	    	igvExtraDivs = document.getElementsByClassName('igv-viewport-content-ruler-div');

	    	for(d = 0; d<igvExtraDivs.length;d++) {
	    		txts.push(igvExtraDivs[d].innerHTML);
	    		parents.push(angular.element(igvExtraDivs[d]).parent());
	    		(igvExtraDivs[d]).style.display = "none";
	    	
	    	}
	    	if(label) {
		    	for(d = 0; d<txts.length;d++) {
		    		angular.element(igvExtraDivs[d]).remove();
		    		var newEle = angular.element("<div class='igv-viewport-content-ruler-div'>"+txts[d]+"</div>");
				    angular.element(parents[d]).append(newEle);
		    	}
	    	}
	    	igvExtraDivs = document.getElementsByClassName('igv-viewport-fa-close');
	    	for(d = 0; d<igvExtraDivs.length;d++) {
	    		(igvExtraDivs[d]).style.display = "none";
	    	}
        };
        
        $scope.$watch('settings.current.chromosomeIndexes', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				
				var igvjs_go = [];
				var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
				var span_region = $scope.settings.current.particlesCount*resolution;
				//var offset = 0;
				igvjs_go.push($scope.settings.current.chromosomeIndexes[0]);
				if(!$scope.view.settings.leading_chr) igvjs_go[0] = igvjs_go[0].replace('chr','');
				
				if($scope.settings.current.chromosomeIndexes.length!=2) { 
					igvjs_go[0] += ':' + ($scope.settings.current.chromStart[0]) + '-' + ($scope.settings.current.chromStart[0]+span_region);
					
			    } else {
			    	span_region = $scope.settings.current.chromEnd[0]-$scope.settings.current.chromStart[0];
			    	igvjs_go[0] += ':' + ($scope.settings.current.chromStart[0]) + '-' + ($scope.settings.current.chromStart[0]+span_region);
					
					igvjs_go.push($scope.settings.current.chromosomeIndexes[1]);
					if(!$scope.view.settings.leading_chr) igvjs_go[1] = igvjs_go[1].replace('chr','');
					igvjs_go[1] += ':' + ($scope.settings.current.chromStart[1]) + '-' + ($scope.settings.current.chromStart[1]+span_region);
					
				}
				
				$scope.myIgv.parseSearchInput(igvjs_go.join(' '));
				$scope.hideIgvLabels(true);
		    	Track_data.clear();
		    	$scope.updateFeaturesList();
		    	

            }    
        });            
        /*
         markers_position gets updated when we click on the 2D panel with the genomic positions that are interacting in the
         clicked position.
         Listen for left and right markers positions and then move them to the genomic position in the browser.
         */
        $scope.$watch('settings.current.markers_position', function( newValue, oldValue ) {
			if ( newValue !== oldValue) {
				if ( angular.isUndefined($scope.settings.current.markers_position) || newValue[0] === -1 || newValue[1] === -1) {
					$scope.hideTadkitMarkers();
	        	} else {
	        		if($scope.settings.current.chromosomeIndexes.length===2) $scope.synchronizeViewports();
	        		if($scope.settings.current.chromosomeIndexes.length > 2) return; 
	        		$scope.updateTadkitMarkers(newValue,$scope.settings.current.markers_chr);
	        		
	        	}
			}
		});
		$scope.$watch('myIgv.trackViews.length', function( newValue, oldValue ) {
			if ( newValue !== oldValue) {
				$scope.updateFeaturesList();  
			}
		});

        $scope.hideTadkitMarkers = function() {
        	dr.css("display","none");
        	dl.css("display","none");
        	$scope.settings.current.markers_position = undefined;
        };
        $scope.updateTadkitMarkers = function(markerspos,markerschrom) {

        	$scope.updateFeaturesList();

        	var genomicState = _.first($scope.myIgv.genomicStateList);
        	var referenceFrame = genomicState.referenceFrame;
        	var viewportWidth = igv.browser.viewportContainerWidth()/genomicState.locusCount;
        	var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
        	var offset = 0;
        	if($scope.settings.current.chromosomeIndexes.length == 2 && markerschrom[1] != $scope.settings.current.chromosomeIndexes[0]) {
        		offset = referenceFrame.bpPerPixel*Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);
        	}
    		var leftpx = (markerspos[1]+offset-referenceFrame.start)/referenceFrame.bpPerPixel; 
    		leftpx = Math.min(leftpx,viewportWidth);
        	dl.css("display","block");
        	dl.css("left",Math.floor(leftpx+50) + "px");
        	dl.css("position","absolute");
        	
        	offset = 0;
        	
        	var rightpx;
        	if(genomicState.locusCount>1) {
        		var nextgenomicState = $scope.myIgv.genomicStateList[1];
            	var nextreferenceFrame = nextgenomicState.referenceFrame;
            	
	        	if($scope.settings.current.chromosomeIndexes.length == 2 && markerschrom[0] != $scope.settings.current.chromosomeIndexes[0]) { 
        		
	        		//offset = referenceFrame.bpPerPixel*Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);
	        		offset = (referenceFrame.bpPerPixel * viewportWidth) + referenceFrame.start;
	        		offset -= nextreferenceFrame.start -($scope.settings.current.chromStart[1]);
	        		offset = Math.max(0, offset);
	        		rightpx = (markerspos[0]+offset-referenceFrame.start)/referenceFrame.bpPerPixel;
	        	} else {
	        		offset = referenceFrame.bpPerPixel * viewportWidth;
	        		rightpx = (markerspos[0]+offset-nextreferenceFrame.start)/nextreferenceFrame.bpPerPixel;
	        		rightpx = Math.max(rightpx,viewportWidth);
	        	}
        	} else {
        		rightpx = (markerspos[0]+offset-referenceFrame.start)/referenceFrame.bpPerPixel;
        	}
        	dr.css("display","block");
        	dr.css("left",Math.floor(rightpx+50) + "px");
        	dr.css("position","absolute");
        };

        $scope.getSummaryFeatures = function(i) {
        	
        	var feat, chrStart, feat_nbr, j, k;
    		var chrId = 0;
    		j = 0;
			chrStart = $scope.settings.current.chromStart[chrId];
			feat_nbr = 1;
			while(j < track_data[i].feature.length) {
				var tdata = [];
				feat = track_data[i].feature[j];
				if(feat.start >= chrStart &&  feat.end < chrStart+resolution && feat.chr == $scope.settings.current.chromosomeIndexes[chrId]) {
					while(feat.start >= chrStart &&  feat.end < chrStart+resolution && feat.chr == $scope.settings.current.chromosomeIndexes[chrId]) {
						tdata.push(feat);
						feat = track_data[i].feature[j];
						feat_nbr++;	
						j++;
						if(j >= track_data[i].feature.length) break;
					}
					
					if(tdata.length > 5 && typeof tdata[0].value != 'undefined') {
						var feat_max = { chr:feat.chr, start:chrStart, end:chrStart+resolution-1, value:0, count: 0};
						var feat_avg = { chr:feat.chr, start:chrStart, end:chrStart+resolution-1, value:0, count: 0};
						for(k = 0; k < tdata.length; k++) {
							if(typeof tdata[k].value != 'undefined') {
								feat_avg.value += tdata[k].value;
								if(feat_max.value < tdata[k].value) feat_max.value = tdata[k].value; 
							}
						}
						feat_avg.count = tdata.length;
						feat_max.count = tdata.length;
						feat_avg.value = feat_avg.value/tdata.length;
						track_data[i].max_feature.push(feat_max);
						track_data[i].avg_feature.push(feat_avg);
					} 
					chrStart += resolution;
					if(feat.chr.replace('chr','') != $scope.settings.current.chromosomeIndexes[chrId].replace('chr',''))
						chrId++;
				} else {
					j++;
				}
				
			}
			
    		
        };
        
        $scope.getFeatures = function(track_name, track_i) {
        	$scope.myIgv.trackViews.forEach(function (tV) {
		  		if(tV.track.name == track_name) {
		  			var i = 0;
		  			tV.browser.genomicStateList.forEach(function (genomicState) {
		  			//for(var i = 0; i<tV.browser.genomicStateList.length;i++) {
			  			//var genomicState = _.first(tV.browser.genomicStateList);
		  				//var genomicState = tV.browser.genomicStateList[i];
			        	var referenceFrame = genomicState.referenceFrame;
						// get features and add them in Track_data
		               	tV.track.getFeatures(referenceFrame.chrName, $scope.settings.current.chromStart[i], $scope.settings.current.chromEnd[i], referenceFrame.bpPerPixel).then(function (features) {
		                	if (features) {
		                		Array.prototype.unique = function() {
								    var a = this.concat();
								    for(var i=0; i<a.length; ++i) {
								        for(var j=i+1; j<a.length; ++j) {
								            if(a[i] === a[j])
								                a.splice(j--, 1);
								        }
								    }

								    return a;
								};
		                       	track_data[track_i].feature = track_data[track_i].feature.concat(features).unique();
		                       	$scope.getSummaryFeatures(track_i);
		                       	
		                    }
		               	}).catch(function (error) {
		                    if (error instanceof igv.AbortLoad) {
		                    	console.log("Aborted ---");
		                    } else {
		                        igv.presentAlert(error);
		                    }
		                });
		               	i++;
		  			});
				}
        	});
        };

        $scope.updateFeaturesList = function() {
        	$scope.myIgv.trackViews.forEach(function (tV) {
        		if(tV.track.id != 'ruler' && tV.track.id != 'sequence') {
        			var found = false;
        			for(var i=0;i<track_data.length;i++) {
        				if(track_data[i].track_name == tV.track.name) found=true;
        			}
        			if(!found) {
        				var tdata = {
							track_name: tV.track.name,
							feature: [],
							avg_feature: [],
							max_feature: []
						};
						track_data.push(tdata);
        				$scope.getFeatures(tV.track.name,track_data.length-1);
        			}
        		}
        	});
        };
        
        /*
        igvjs developers expose an event when the browser changes locus.
        We profit from it to update tadkit position in the 2D and 3D panels
        */
        //$scope.myIgv.on('locuschange', function (refFrame, label) {
        $scope.locuschange = function(refFrame, label) {
        	

        	$scope.updateFeaturesList();

        	var genomicState = _.first($scope.myIgv.genomicStateList);
        	var referenceFrame = genomicState.referenceFrame;
        	//var viewportWidth = Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);
        	var viewportWidth = Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);
//        	var viewport = igv.Viewport.viewportsWithLocusIndex(0);
//        	var viewportWidth = Math.floor($scope.myIgv.viewportContainerWidth());
//        	if(viewport.length>0) {
//        		var parts = [];
//				var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
//				var tot_part = 0;
//				for(var i = 0; i<$scope.settings.current.chromosomeIndexes.length;i++) {
//					parts.push(Math.round($scope.settings.current.chromEnd[i]/resolution)-Math.round($scope.settings.current.chromStart[i]/resolution)+1);
//					tot_part += parts[i];
//				}
//        		viewportWidth = viewportWidth*parts[0]/tot_part;
//        	}
        	
            // window center (base-pair units)
            var centerBP = referenceFrame.start + referenceFrame.bpPerPixel * (viewportWidth/2);
            var ps = (centerBP-referenceFrame.start);
            var resolution = $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
            var offsety = 0;
            if($scope.settings.current.igv_position.y>0)
            	offsety = Math.round($scope.settings.current.igv_position.y - $scope.settings.current.chromStart[$scope.settings.current.chromIdx]);
            var span_region = 0;
			for(var i = 0; i<$scope.settings.current.chromosomeIndexes.length;i++) {
				span_region += $scope.settings.current.chromEnd[i] - $scope.settings.current.chromStart[i];			
			}
			span_region += $scope.settings.current.chromStart[0];
			
            /* 
            We limit the left border of the browser so the center guide cannot go further
            than the start of our chromatin model*/
            if($scope.settings.current.chromStart[$scope.settings.current.chromIdx]>centerBP+offsety) {
				if($scope.settings.current.chromStart[$scope.settings.current.chromIdx]-ps-offsety<=0) {
					referenceFrame.start = 0;
					//referenceFrame.start = $scope.settings.current.chromStart[$scope.settings.current.chromIdx]-ps;
				} else {
					referenceFrame.start = $scope.settings.current.chromStart[$scope.settings.current.chromIdx]-ps-offsety;
				}
			}
			/* 
			We limit the right border of the browser so the center guide cannot go further
            than the end of our chromatin model.
			I haven't found other way than limiting artificially the length of the whole chromosome.
            */
			var igv_chrom = $scope.myIgv.genome.getChromosome(referenceFrame.chrName);
			//igv_chrom.bpLength = ($scope.settings.current.chromEnd[$scope.settings.current.chromIdx]+($scope.settings.current.chromEnd[$scope.settings.current.chromIdx]-referenceFrame.start));
			igv_chrom.bpLength = (span_region+(span_region-referenceFrame.start)-resolution+offsety);
			/*
			Finally inform tadkit about the center genomic position and the position in the screen
			of the left and right border of our model, so we can synchronize the 2D panel
			*/
			var px_start = ($scope.settings.current.chromStart[$scope.settings.current.chromIdx]-referenceFrame.start)/referenceFrame.bpPerPixel;
			//var px_end = ($scope.settings.current.chromEnd[$scope.settings.current.chromIdx]-referenceFrame.start)/referenceFrame.bpPerPixel;
			var px_end = (span_region-referenceFrame.start)/referenceFrame.bpPerPixel;
			
			$scope.updatePosition(centerBP, px_start+50 , px_end+50);
					
			
			
		//});
        };
        
        igv.Browser.prototype.updateLocusSearchWithGenomicState = function (genomicState) {

            var self = this,
                referenceFrame,
                secondreferenceFrame,
                ss,
                ee,
                str,
                end,
                chromosome;

            //if (0 === genomicState.locusIndex && 1 === genomicState.locusCount) {
            if (0 === genomicState.locusIndex) {

                if ('all' === genomicState.locusSearchString.toLowerCase()) {

                    this.$searchInput.val(genomicState.locusSearchString);
                } else {

                    referenceFrame = genomicState.referenceFrame;

                    if (this.$searchInput) {

                        end = referenceFrame.start + referenceFrame.bpPerPixel * (self.viewportContainerWidth()/genomicState.locusCount);

                        if (this.genome) {
                            chromosome = this.genome.getChromosome( referenceFrame.chrName );
                            if (chromosome) {
                                end = Math.min(end, chromosome.bpLength);
                            }
                        }

                        ss = igv.numberFormatter(Math.floor(referenceFrame.start + 1));
                        ee = igv.numberFormatter(Math.floor(end));
                        str = referenceFrame.chrName + ":" + ss + "-" + ee;
                        this.$searchInput.val(str);
                    }
                    
                    this.fireEvent('locuschange', [referenceFrame, str]);
                    $scope.locuschange(referenceFrame, str);
                }

            } else {
                this.$searchInput.val('');
            }

        };
        
        // List to store the status of the overlayed tracks
        $scope.tracksOverlaid = {};
        
        /* 
        This is a nasty override. Currently there is no way to inject a menu item in track menus.
        Therefore we override igv.trackMenuItemList to include a new item to overlay the track.
        It should be updated if it changes in new releases of igvjs.
        The injected code is properly marked. 
        */
        igv.trackMenuItemList = function (popover, trackView) {

            var menuItems = [],
                all;

            menuItems.push(igv.trackMenuItem(popover, trackView, "Set track name", function () {
                return "Track Name";
            }, trackView.track.name, function () {

                var alphanumeric = parseAlphanumeric(igv.dialog.$dialogInput.val());

                if (undefined !== alphanumeric) {
                    igv.setTrackLabel(trackView.track, alphanumeric);
                    trackView.update();
                }

                function parseAlphanumeric(value) {

                    var alphanumeric_re = /(?=.*[a-zA-Z].*)([a-zA-Z0-9 ]+)/,
                        alphanumeric = alphanumeric_re.exec(value);

                    return (null !== alphanumeric) ? alphanumeric[0] : "untitled";
                }

            }, undefined));

            menuItems.push(igv.trackMenuItem(popover, trackView, "Set track height", function () {
                return "Track Height";
            }, trackView.trackDiv.clientHeight, function () {

                var number = parseFloat(igv.dialog.$dialogInput.val(), 10);

                if (undefined !== number) {
    // If explicitly setting the height adust min or max, if neccessary.
                    if (trackView.track.minHeight !== undefined && trackView.track.minHeight > number) {
                        trackView.track.minHeight = number;
                    }
                    if (trackView.track.maxHeight !== undefined && trackView.track.maxHeight < number) {
                        trackView.track.minHeight = number;
                    }
                    trackView.setTrackHeight(number);
                    trackView.track.autoHeight = false;   // Explicitly setting track height turns off autoHeight

                }

            }, undefined));
            
            /*
            Start of injected code
            */
           // Init tracksOverlaid to false
           if (typeof $scope.tracksOverlaid[trackView.track.id] === "undefined") {
           	$scope.tracksOverlaid[trackView.track.id] = false;
           }
           // Creation of the DOM element of the menu item
           var apply3D, $e;

           apply3D = '<div class="igv-track-menu-item igv-track-menu-border-top">';
           if (false === $scope.tracksOverlaid[trackView.track.id]) {
           	apply3D = apply3D + '<i class="fa fa-check fa-check-shim fa-check-hidden"></i>Apply to 3D</div>';
           } else {
           	apply3D = apply3D + '<i class="fa fa-check fa-check-shim"></i>Apply to 3D</div>';
           }
           
           // Handler function when clicking the menu item
           var clickHandler = function(){
               if($scope.tracksOverlaid[trackView.track.id]) {
               	$scope.removeOverlay(trackView.track.id);
               	$scope.tracksOverlaid[trackView.track.id] = false;
               } else {
            	var genomicState = _.first(trackView.browser.genomicStateList);
               	var referenceFrame = genomicState.referenceFrame;   
               	// get features and pass them for overlay
               	trackView.track.getFeatures(referenceFrame.chrName, $scope.settings.current.chromStart[$scope.settings.current.chromIdx], $scope.settings.current.chromEnd[$scope.settings.current.chromIdx], referenceFrame.bpPerPixel).then(function (features) {
                       if (features) {
                       	$scope.applyOverlay(trackView.track.id,features);
                       }
               	}).catch(function (error) {
                       if (error instanceof igv.AbortLoad) {
                           console.log("Aborted ---");
                       } else {
                           igv.presentAlert(error);
                       }
                   });
               	$scope.myIgv.trackViews.forEach(function (tV) {
               		$scope.tracksOverlaid[tV.track.id] = (trackView.track.id == tV.track.id);
               	});
           	}
               // Hide menu
               popover.hide();
           };

           $e = $(apply3D);
           $e.click(clickHandler);

           // Add the new menu item to the track menu
           menuItems = menuItems.concat({ object: $e, init: undefined });
           /*
            End of injected code
            */

           all = [];
           if (trackView.track.menuItemList) {
               all = menuItems.concat(igv.trackMenuItemListHelper(trackView.track.menuItemList(popover)));
           }
           
           if (trackView.track.removable !== false) {

               all.push(
                   igv.trackMenuItem(popover, trackView, "Remove track", function () {
                       var label = "Remove " + trackView.track.name;
                       return '<div class="igv-dialog-label-centered">' + label + '</div>';
                   }, undefined, function () {
                       popover.hide();
                       trackView.browser.removeTrack(trackView.track);
                       // trackView.browser.removeTrackByName(trackView.track.name);
                   }, true)
               );
           }

           return all;

        };     
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelIgvjsController', PanelIgvjsController);

	function PanelIgvjsController($scope, $window, $timeout, Overlays,Storyboards, uuid4, Track_data, d3Service, Datasets, Users, Settings) {

		if(angular.isUndefined($scope.settings.current.speciesUrl)) {
			$scope.settings.current.speciesUrl = Datasets.setSpeciesUrl();
			if(angular.isUndefined($scope.settings.current.speciesUrl)) return;
		}

		var scene_component = Storyboards.getComponentById('Chromatin');
		var scene_width = 0;
		if(typeof scene_component !== 'undefined') {
			scene_width = parseInt(scene_component.object.state.width);
		} else {
			var inspector_component = Storyboards.getComponentById('Inspector');
			var inspector_width = 0;
			if(typeof inspector_component !== 'undefined') {
				inspector_width = parseInt(inspector_component.object.state.width);
			}
			scene_width = inspector_width;
		}
		$scope.width = $scope.state.width = $window.innerWidth - scene_width - 50 - 2*parseInt($scope.state.margin);
		$scope.height = $scope.state.height =  parseInt($scope.state.height)-2*parseInt($scope.state.margin); // strip PX units
		
		//$scope.width = $scope.state.width; // strip PX units
		//$scope.height = $scope.state.height; // strip PX units
		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = $window.innerWidth - newValue - 50 - 2*parseInt($scope.state.margin);
				$scope.myIgv.repaint();
//		  		$scope.myIgv.genomicStateList.forEach(function (genomicState) {
//            		$scope.myIgv.updateWithLocusIndex( genomicState );
//        		});
			}
		});

		var w = angular.element($window);
		$scope.$watch(
		  function () {
		    return $window.innerWidth;
		  },
		  function (value) {
		    $scope.width = $scope.state.width = value - scene_width - 50 - 2*parseInt($scope.state.margin);
		  	//$scope.$apply();
		  },
		  true
		);
		
		var originalOverlay = Overlays.getCurrentIndex();
		var track_data = Track_data.get();
		
		var igvjs_start = (($scope.settings.current.chromStart));
		if(igvjs_start<0) igvjs_start = 0;
		var chrom = ($scope.settings.current.chrom);
		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
		
		/*
		Configuration of igvjs object

		$scope.view.settings.species_data: configuration array containing the location of the reference genome. 
			It can be a file or url where the browser will fetch the data.
		$scope.view.settings.showNav: true/false whether to show the navigation panel in igvjs 
		$scope.view.settings.showCyto: true/false wheter to show cytoband panel in igvjs
		*/
		if(typeof $scope.settings.current.assemblyUrl === 'undefined' || typeof $scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl] === 'undefined') {
			$scope.settings.current.assemblyUrl = Object.keys($scope.view.settings.species_data[$scope.settings.current.speciesUrl])[0]; 
		}
			
		var igv_reference;
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].fastaURL) {
			igv_reference = {
				id: $scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].id,
				fastaURL:$scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].fastaURL,
				cytobandURL:null
			};
			$scope.view.settings.showNav = true;
			if($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].cytobandURL) {
				igv_reference.cytobandURL = $scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].cytobandURL;
				$scope.view.settings.showCyto = false;
			} else {
				$scope.view.settings.showCyto = false;
			}
		} else {
			igv_reference = {
				id: $scope.settings.current.speciesUrl
			};
			$scope.view.settings.showNav = true;
		}
		$scope.tracks = Users.getTracks();
		if($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].tracks) {
			$scope.tracks = $scope.tracks.concat($scope.view.settings.species_data[$scope.settings.current.speciesUrl][$scope.settings.current.assemblyUrl].tracks);
		}
		
		
		/* 
		div dom element where to include igvjs browser
		*/
		$scope.igvDiv = angular.element(document.querySelector('#igvDiv'))[0];
		/* 
		igvjs options. See igvjs docs for details
		*/
		$scope.igvOptions = {
		            showNavigation: $scope.view.settings.showNav,
		            showRuler: true,
		            showIdeogram: $scope.view.settings.showCyto,
		            showKaryo: $scope.view.settings.showCyto,
		            flanking: 100000,
		            reference: igv_reference,
					locus: chrom+':'+igvjs_start+'-'+($scope.settings.current.chromEnd),
					tracks: $scope.tracks.slice()
		        };
		
		
			
		$scope.updatePosition =  function(position, leftborder, rightborder) {
			//alert(position);
			if(position >= $scope.settings.current.chromStart && position <= $scope.settings.current.chromEnd) {
				$scope.settings.current.position = position;
			}
			if(position < $scope.settings.current.chromStart) {
				$scope.settings.current.position = $scope.settings.current.chromStart;
			}  
			if(position > $scope.settings.current.chromEnd) {
				$scope.settings.current.position = $scope.settings.current.chromEnd;
			}
			if($scope.settings.current.leftborder != leftborder || $scope.settings.current.rightborder != rightborder) {
				$scope.settings.current.leftborder = leftborder;
				$scope.settings.current.rightborder = rightborder;
			}
			$scope.hideTadkitMarkers();
			$scope.updateTadkitTAD();
			
			$timeout(function() {$scope.$apply();});
		};
		$scope.applyOverlay =  function(track,features) {
			var self = this;
			var overlays = Overlays.get();
			for(var i=0;i<overlays.loaded.length;i++) {
				if (overlays.loaded[i].object.title === track) {
					$scope.toggleOverlay(overlays.loaded[i].object.state.index);
					return true;
				}
			}
			
			var igvJsOverlay =
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : overlays.loaded.length,
									"title" : track,
									"source" : "igvJs track",
									"url" : "local",
									"description" : "igvJs track overlay", 
									"type" : "igvJs",
									"format" : "variable",
									"components" : 2,
									"name" : track,
									"state" : {
										"index" : 0, // make real index???
										"overlaid" : false
									}
								},
								"palette" : [],
								"data" : [],
								"colors" : {
									"particles" : [],
									"chromatin" : [],
									"network" : {
										"RGB" : [],
										"alpha" : []
									}
								}
							};
			var totallength;
			var k, max_val, min_val;
			var j = 0;
			var l = 0;
			
			for(k=0;k<$scope.settings.current.segmentsCount;k++) {
				igvJsOverlay.colors.chromatin[k] = "gray";
			}

			var featureColor = [];
			var scored_color = false;
			var motifcolor;
			var feature;
			var nbrmotif;
			var tmpfeature = [];
			angular.forEach(features, function(feature) {
				if(typeof feature.color == 'undefined') {
					if(typeof feature.score !== 'undefined') featureColor.push(feature.score);
					if(typeof feature.value !== 'undefined') featureColor.push(feature.value);
					scored_color = true;
				} else {
					featureColor.push(feature.color);
				}
			});
			if(scored_color) {
				var hexEnd = '#0000ff';
				var hexStart = '#ffffff';
				var first_start = 0;
				var n = 0;
				l = 0;
				while(n<featureColor.length) {
					totallength = 0;
					motifcolor = 0;
					nbrmotif = 0;
					first_start = features[n].start;
					while(totallength < 1 && n < featureColor.length) {
						feature = features[n];
						totallength = (feature.end - first_start)/$scope.settings.current.segmentLength;
						motifcolor = motifcolor + parseFloat(featureColor[n]);
						nbrmotif++;
						n++;
					}
					tmpfeature.push(motifcolor);
				}
				max_val = Math.max.apply(Math, tmpfeature);
				min_val = Math.min.apply(Math, tmpfeature);
				
				n = 0;
				l = 0;
				while(n<featureColor.length) {
					totallength = 0;
					motifcolor = 0;
					first_start = features[n].start;
					while(totallength < 1 && n < featureColor.length) {
						feature = features[n];
						totallength = (feature.end - first_start)/$scope.settings.current.segmentLength;
						motifcolor = motifcolor + parseFloat(featureColor[n]);
						n++;
					}
					featureColor[l] = d3.interpolateHcl(hexStart, hexEnd)((motifcolor-min_val)/(max_val-min_val));
					j = Math.round((first_start - $scope.settings.current.chromStart)/$scope.settings.current.segmentLength);
					for(k=j;k<(j+Math.round(totallength)) && k<$scope.settings.current.segmentsCount;k++) {
						igvJsOverlay.colors.chromatin[k] = featureColor[l];
					}
					l++;
				}
			} else {
				angular.forEach(features, function(feature) {
					j = Math.round((feature.start - $scope.settings.current.chromStart)/$scope.settings.current.segmentLength);
					totallength = Math.round((feature.end - feature.start)/$scope.settings.current.segmentLength);
					for(k=j;k<(j+totallength) && k<$scope.settings.current.segmentsCount;k++) {
						igvJsOverlay.colors.chromatin[k] = featureColor[l];
					}
					l++;
				});
			}
			var newOverlay = Overlays.addDirect(igvJsOverlay);
			var overlay = overlays.loaded[newOverlay];
			
			overlay.colors.particles = [];
			//overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, $scope.settings.current.edgesCount);
			//overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, $scope.settings.current.edgesCount);
			overlay.colors.network.RGB = [];
			overlay.colors.network.alpha = [];
			$scope.toggleOverlay(newOverlay);
			//Overlays.setOverlaid(newOverlay);
			//Overlays.set(newOverlay);
			//$scope.currentoverlay = Overlays.set(newOverlay);
		};
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.currentoverlay = Overlays.getOverlay();
			} else {
				Overlays.setOverlaid(originalOverlay);
				Overlays.set(originalOverlay);
				$scope.currentoverlay = Overlays.getOverlay();
			}
			//$scope.$apply($scope.currentoverlay.colors.chromatin);
			//$scope.toggleColor($scope.currentoverlay.colors.chromatin);
			$scope.toggleColor($scope.currentoverlay);
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};
		$scope.removeOverlay =  function(track) {
			var overlays = Overlays.get();
			angular.forEach(overlays.loaded, function(overlay) {
				if (overlay.object.title === track) {
					$scope.toggleOverlay(overlay.object.state.index);
				}

			});
		};
		/* 
		Creation of igvjs javascript object
		*/
		$scope.myIgv = igv.createBrowser($scope.igvDiv, $scope.igvOptions);
		
		// Disable search input
		//$scope.myIgv.$searchInput.off('change');
        
		// Hide search icon
		//var search_icon = angular.element(document.querySelector('.igv-fa-search'))[0];
		var search_icon = angular.element(document.querySelector('.igv-search-container'))[0];
		$(search_icon).hide();
		// Show center guide by default. The centerguide will be tadkit position in the 2D and 3D
		$scope.myIgv.centerGuide.$centerGuideToggle.click();
		
		/* 
		 Remove Karyo panel. With the igv config is not working very well with firefox
		 So we do it the hard way
		 *  */
		//$scope.myIgv.karyoPanel.$karyoPanelToggle.hide();
		var karyo = angular.element(document.querySelector('.igv-ideogram-content-div'))[0];
        karyo.remove();
        $scope.myIgv.karyoPanel = null;
        
		/*
		Create div indicating selected tad in the browser.
		#tad-highlight-tadkit should be styled in the main css
		*/
		var d = angular.element("<div id=\"tad-highlight-tadkit\" style=\"width='0px;';display=none;\"></div>");
		var trackContainer = angular.element($scope.myIgv.trackContainerDiv);
		trackContainer.append(d);
		
		var dl = angular.element("<div id=\"trackbar-tadkit-left-mark\" style=\"display=none\"></div>");
		trackContainer.append(dl);
		var dr = angular.element("<div id=\"trackbar-tadkit-right-mark\" style=\"display=none\"></div>");
		trackContainer.append(dr);
		
		/*
		Main function moving and resizing the #tad-highlight-tadkit depending on the current tad
		*/
		$scope.updateTadkitTAD = function() {
        	if(typeof($scope.settings.current.tad_selected) != 'undefined' && $scope.settings.current.tad_selected!=-1) {
        		var referenceFrame;
        		/* Look for the referenceFrame of the reference sequence.
        		referenceFrame contains:
        			start: the genomic position corresponding to the left border of the browser
        			bpPerPixel: corresponding base pairs per 1 pixel
        		*/
    			referenceFrame = $scope.myIgv.referenceFrame;
        		// Compute left position and width of the #tad-highlight-tadkit
        		if(typeof(referenceFrame) != 'undefined') {
	            	//trackPane.style.backgroundColor = "rgba(0,0,0,0.05)";
	            	var start_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][1];
	            	var end_tad = $scope.data.tad_data.tads[$scope.settings.current.tad_selected][2];
	            	
	            	var leftpos = Math.round((start_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
	                d.css("left",Math.floor(leftpos+50) + "px");
	                var rightpos = Math.round((end_tad-referenceFrame.start)/referenceFrame.bpPerPixel);
	                d.css("width",Math.floor(rightpos-leftpos) + "px");
	                d.css("display","block");
        		}
        		
                
            } else {
            	//trackPane.style.backgroundColor = "";
            	d.css("width","0px");
            	d.css("display","none");
            	
            }
        };

        $scope.myIgv.zoomHandlers = {
                in: {
                    click: function (e) {
                        $scope.myIgv.zoomIn();
                    }
                },
                out:{
                    click: function (e) {
                        $scope.myIgv.zoomOut();
                    }
                }
            };
        
        $scope.$watch('settings.current.hic_position', function(newPos, oldPos) {
            if(!angular.equals(newPos, oldPos) && newPos != $scope.settings.current.position) {
            	$scope.myIgv.goto(($scope.settings.current.chrom),newPos);
            }    
        });

        /*
         markers_position gets updated when we click on the 2D panel with the genomic positions that are interacting in the
         clicked position.
         Listen for left and right markers positions and then move them to the genomic position in the browser.
         */
        $scope.$watch('settings.current.markers_position', function( newValue, oldValue ) {
			if ( newValue !== oldValue) {
				if ( angular.isUndefined($scope.settings.current.markers_position) || newValue[0] === -1 || newValue[1] === -1) {
					$scope.hideTadkitMarkers();
	        	} else {
	        		$scope.updateTadkitMarkers(newValue);
	        	}
			}
		});
        $scope.hideTadkitMarkers = function() {
        	dr.css("display","none");
        	dl.css("display","none");
        	$scope.settings.current.markers_position = undefined;
        };
        $scope.updateTadkitMarkers = function(markerspos) {

        	$scope.updateFeaturesList();

        	var referenceFrame = $scope.myIgv.referenceFrame;
    		var leftpx = (markerspos[1]-referenceFrame.start)/referenceFrame.bpPerPixel; 
        	dl.css("display","block");
        	dl.css("left",Math.floor(leftpx+50) + "px");
        	dl.css("position","absolute");
        	
        	var rightpx = (markerspos[0]-referenceFrame.start)/referenceFrame.bpPerPixel; 
        	dr.css("display","block");
        	dr.css("left",Math.floor(rightpx+50) + "px");
        	dr.css("position","absolute");
        };

        $scope.getFeatures = function(track_name, track_i) {
        	$scope.myIgv.trackViews.forEach(function (tV) {
		  		if(tV.track.name == track_name) {
					var referenceFrame = tV.browser.referenceFrame;
	               	// get features and add them in Track_data
	               	tV.track.getFeatures(referenceFrame.chr, $scope.settings.current.chromStart, $scope.settings.current.chromEnd, referenceFrame.bpPerPixel).then(function (features) {
	                	if (features) {
	                       	track_data[track_i].feature = track_data[track_i].feature.concat(features);
	                    }
	               	}).catch(function (error) {
	                    if (error instanceof igv.AbortLoad) {
	                    	console.log("Aborted ---");
	                    } else {
	                        igv.presentAlert(error);
	                    }
	                });
				}
        	});
        };

        $scope.updateFeaturesList = function() {
        	$scope.myIgv.trackViews.forEach(function (tV) {
        		if(tV.track.id != 'ruler' && tV.track.id != 'sequence') {
        			var found = false;
        			for(var i=0;i<track_data.length;i++) {
        				if(track_data[i].track_name == tV.track.name) found=true;
        			}
        			if(!found) {
        				var tdata = {
							track_name: tV.track.name,
							pos: [],
							feature: []
						};
						track_data.push(tdata);
        				$scope.getFeatures(tV.track.name,track_data.length-1);
        			}
        		}
        	});
        };
        /*
        igvjs developers expose an event when the browser changes locus.
        We profit from it to update tadkit position in the 2D and 3D panels
        */
        $scope.myIgv.on('locuschange', function (refFrame, label) {
        	

        	$scope.updateFeaturesList();

        	var referenceFrame = $scope.myIgv.referenceFrame;
            //var viewportWidth = Math.floor($scope.myIgv.viewportContainerWidth()/genomicState.locusCount);
        	var viewportWidth = $scope.myIgv.trackViewportWidth();

            // window center (base-pair units)
            var centerBP = referenceFrame.start + referenceFrame.bpPerPixel * (viewportWidth/2);
            var ps = (centerBP-referenceFrame.start);
            /* 
            We limit the left border of the browser so the center guide cannot go further
            than the start of our chromatin model*/
            if($scope.settings.current.chromStart>centerBP) {
				if($scope.settings.current.chromStart-ps<=0) {
					//referenceFrame.start = 0;
					referenceFrame.start = $scope.settings.current.chromStart-ps;
				} else {
					referenceFrame.start = $scope.settings.current.chromStart-ps;
				}
			}
			/* 
			We limit the right border of the browser so the center guide cannot go further
            than the end of our chromatin model.
			I haven't found other way than limiting artificially the length of the whole chromosome.
            */
			var igv_chrom = $scope.myIgv.genome.getChromosome(referenceFrame.chr);
			igv_chrom.bpLength = ($scope.settings.current.chromEnd+($scope.settings.current.chromEnd-referenceFrame.start));
			
			/*
			Finally inform tadkit about the center genomic position and the position in the screen
			of the left and right border of our model, so we can synchronize the 2D panel
			*/
			var px_start = ($scope.settings.current.chromStart-referenceFrame.start)/referenceFrame.bpPerPixel;
			var px_end = ($scope.settings.current.chromEnd-referenceFrame.start)/referenceFrame.bpPerPixel;
			
			$scope.updatePosition(centerBP, px_start+50 , px_end+50);
					
			
			
		});
        
        // List to store the status of the overlayed tracks
        $scope.tracksOverlaid = {};
        
        /* 
        This is a nasty override. Currently there is no way to inject a menu item in track menus.
        Therefore we override igv.trackMenuItemList to include a new item to overlay the track.
        It should be updated if it changes in new releases of igvjs.
        The injected code is properly marked. 
        */
        igv.trackMenuItems = function (popover, trackView) {

            var menuItems = [],
                trackItems;

            menuItems.push(igv.dialogMenuItem(
                popover,
                trackView,
                "Set track name",
                function () {
                    return "Track Name";
                },
                trackView.track.name,
                function () {

                    var alphanumeric = parseAlphanumeric(igv.dialog.$dialogInput.val());

                    if (undefined !== alphanumeric) {
                        igv.setTrackLabel(trackView.track, alphanumeric);
                        trackView.update();
                    }

                    function parseAlphanumeric(value) {

                        var alphanumeric_re = /(?=.*[a-zA-Z].*)([a-zA-Z0-9 ]+)/,
                            alphanumeric = alphanumeric_re.exec(value);

                        return (null !== alphanumeric) ? alphanumeric[0] : "untitled";
                    }

                }, undefined));

            menuItems.push(igv.dialogMenuItem(
                popover,
                trackView,
                "Set track height",
                function () {
                    return "Track Height";
                },
                trackView.trackDiv.clientHeight,
                function () {

                    var number = parseFloat(igv.dialog.$dialogInput.val(), 10);

                    if (undefined !== number) {
                        // If explicitly setting the height adust min or max, if neccessary.
                        if (trackView.track.minHeight !== undefined && trackView.track.minHeight > number) {
                            trackView.track.minHeight = number;
                        }
                        if (trackView.track.maxHeight !== undefined && trackView.track.maxHeight < number) {
                            trackView.track.minHeight = number;
                        }
                        trackView.setTrackHeight(number);
                        trackView.track.autoHeight = false;   // Explicitly setting track height turns off autoHeight

                    }

                }, undefined));

            if (trackView.track.popupMenuItems) {

                trackItems = trackView.track.popupMenuItems(popover);

                if (trackItems && trackItems.length > 0) {

                    trackItems.forEach(function (trackItem, i) {

                        var str;

                        if (trackItem.name) {

                            str = (0 === i) ? '<div class=\"igv-track-menu-item igv-track-menu-border-top\">' : '<div class=\"igv-track-menu-item\">';
                            str = str + trackItem.name + '</div>';

                            menuItems.push({object: $(str), click: trackItem.click, init: trackItem.init});
                        } else {

                            if (0 === i) {
                                trackItem.object.addClass("igv-track-menu-border-top");
                                menuItems.push(trackItem);
                            }
                            else {
                                menuItems.push(trackItem);
                            }

                        }

                    });
                }
            }
            
            /*
            Start of injected code
            */
           // Init tracksOverlaid to false
           if (typeof $scope.tracksOverlaid[trackView.track.id] === "undefined") {
           	$scope.tracksOverlaid[trackView.track.id] = false;
           }
           // Creation of the DOM element of the menu item
           var apply3D, $e;

           apply3D = '<div class="igv-track-menu-item igv-track-menu-border-top">';
           if (false === $scope.tracksOverlaid[trackView.track.id]) {
           	apply3D = apply3D + '<i class="fa fa-check fa-check-shim fa-check-hidden"></i>Apply to 3D</div>';
           } else {
           	apply3D = apply3D + '<i class="fa fa-check fa-check-shim"></i>Apply to 3D</div>';
           }
           
           // Handler function when clicking the menu item
           var clickHandler = function(){
               if($scope.tracksOverlaid[trackView.track.id]) {
               	$scope.removeOverlay(trackView.track.id);
               	$scope.tracksOverlaid[trackView.track.id] = false;
               } else {
               	var referenceFrame = trackView.browser.referenceFrame;
               	// get features and pass them for overlay
               	trackView.track.getFeatures(referenceFrame.chr, $scope.settings.current.chromStart, $scope.settings.current.chromEnd, referenceFrame.bpPerPixel).then(function (features) {
                       if (features) {
                       	$scope.applyOverlay(trackView.track.id,features);
                       }
               	}).catch(function (error) {
                       if (error instanceof igv.AbortLoad) {
                           console.log("Aborted ---");
                       } else {
                           igv.presentAlert(error);
                       }
                   });
               	$scope.tracksOverlaid[trackView.track.id] = true;
           	}
               // Hide menu
               popover.hide();
           };

           $e = $(apply3D);
           $e.click(clickHandler);

           // Add the new menu item to the track menu
           menuItems = menuItems.concat({ object: $e, init: undefined });
           /*
            End of injected code
            */

            if (trackView.track.removable !== false) {

                menuItems.push(
                    igv.dialogMenuItem(
                        popover,
                        trackView,
                        "Remove track",
                        function () {
                            var label = "Remove " + trackView.track.name;
                            return '<div class="igv-dialog-label-centered">' + label + '</div>';
                        },
                        undefined,
                        function () {
                            popover.hide();
                            trackView.browser.removeTrack(trackView.track);
                        },
                        true)
                );

            }

            return menuItems;

        };
        

        
                
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelIgvjs', tkComponentPanelIgvjs);

	function tkComponentPanelIgvjs(Settings) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'=',
				overlay: '=',
				currentoverlay:'='
			},
			templateUrl: 'assets/templates/panel-igvjs.html',
			link:function(scope, element, attrs){	
				scope.$watch('settings.current.position', function(newPosition, oldPosition) {
					if ( newPosition !== oldPosition ) {
						scope.update();
					}
				});
				
				/*scope.$watch('settings.current.tad_selected', function( newValue, oldValue ) {
					if ( newValue === -1 || oldValue === -1) {
						scope.updateTadkitTAD();
		        	}
				});	*/		
				scope.update = function(data) {
					scope.settings.current.particle = Settings.getParticle();
					scope.settings.current.segment = Settings.getSegment();
					var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
					//scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
					scope.settings.current.segmentLower = (scope.settings.current.particle)*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
					//scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???
					scope.settings.current.segmentUpper = (scope.settings.current.particle+1)*resolution+scope.settings.current.chromStart[scope.settings.current.chromIdx];
					
				};

				scope.toggleColor = function(overlay) {
					scope.currentoverlay = overlay;
					//scope.currentoverlay.colors.chromatin = chromatin_colors;
					scope.$apply(scope.currentoverlay.colors.chromatin);
				};
				//http://rest.ensemblgenomes.org/overlap/region/drosophila_melanogaster/chrX:15590000-16600000?feature=gene;content-type=application/json"
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInfoboxController', PanelInfoboxController);

	function PanelInfoboxController($scope) {
		if($scope.current.dataset) {
			$scope.species = $scope.current.dataset.object.species;
			$scope.region = $scope.current.dataset.object.region;
		}
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelInfobox', tkComponentPanelInfobox);

	function tkComponentPanelInfobox() {
		return {
			restrict:'C',
			templateUrl: 'assets/templates/panel-infobox.html',
			link:function(scope, element, attrs){
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelInspectorController', PanelInspectorController);

	function PanelInspectorController($scope, $mdDialog, Settings, Proximities, Restraints, Overlays, Datasets, Hic_data) {

		$scope.$watch('settings.views.scene_width', function( newValue, oldValue ) {
			if ( newValue !== oldValue ) {
				// playback.autoRotate = !playback.autoRotate;
				$scope.width = $scope.state.width = newValue;
		  		
			}
		});
		
		$scope.width = parseInt($scope.state.width); // strip PX units
		$scope.height = parseInt($scope.state.height); // strip PX units

		var scale;
		if(angular.isUndefined($scope.data.object.bp_per_nm)) 
			scale = $scope.data.object.resolution * 0.01;
		else
			scale = $scope.data.object.resolution * $scope.data.object.bp_per_nm;
		
		$scope.selectedIndex = 0;
	      
		$scope.atPosition = function(feature) {
			if ($scope.$parent.settings.current.segmentUpper > feature.start && $scope.$parent.settings.current.segmentLower <= feature.end && feature.chr.replace('chr','')==$scope.settings.current.chrom.replace('chr','')) return true;
			return false;
		};
		$scope.atLeftPosition = function(feature) {
			if(angular.isUndefined($scope.settings.current.markers_position)) return;
			if(angular.isUndefined($scope.settings.current.markers_chr)) return;
			var resolution = $scope.data.object.resolution;
			var pos =  $scope.settings.current.markers_position[1];
			//for( var i = 0;  i < $scope.settings.current.chromosomeIndexes.indexOf($scope.settings.current.markers_chr[1]); i++ ) pos += ($scope.settings.current.chromEnd[i]-$scope.settings.current.chromStart[i]+resolution);
			var particle = Settings.getParticle(pos);
			var segmentLower = (particle-1)*resolution+$scope.settings.current.chromStart[$scope.settings.current.chromosomeIndexes.indexOf($scope.settings.current.markers_chr[1])];
			var segmentUpper = (particle)*resolution+$scope.settings.current.chromStart[$scope.settings.current.chromosomeIndexes.indexOf($scope.settings.current.markers_chr[1])];
			if (segmentUpper >= feature.start && segmentLower <= feature.end && 
					feature.chr.replace('chr','') == $scope.settings.current.markers_chr[1].replace('chr','') 
			) return true;
			return false;
		};
		$scope.atRightPosition = function(feature) {
			if(angular.isUndefined($scope.settings.current.markers_position)) return;
			if(angular.isUndefined($scope.settings.current.markers_chr)) return;
			var resolution = $scope.data.object.resolution;
			var pos =  $scope.settings.current.markers_position[0];
			//for( var i = 0;  i < $scope.settings.current.chromosomeIndexes.indexOf($scope.settings.current.markers_chr[0]); i++ ) pos += ($scope.settings.current.chromEnd[i]-$scope.settings.current.chromStart[i]+resolution);
			var particle = Settings.getParticle(pos);
			var segmentLower = (particle-1)*resolution+$scope.settings.current.chromStart[$scope.settings.current.chromosomeIndexes.indexOf($scope.settings.current.markers_chr[0])];
			var segmentUpper = (particle)*resolution+$scope.settings.current.chromStart[$scope.settings.current.chromosomeIndexes.indexOf($scope.settings.current.markers_chr[0])];
			if (segmentUpper >= feature.start && segmentLower <= feature.end && 
					feature.chr.replace('chr','') == $scope.settings.current.markers_chr[0].replace('chr','') 
			) return true;
			return false;
		};
		$scope.formatRegionName = function(regionName) {
			if (regionName == "Chromosome") {
				return regionName;
			} else {
				return "chr" + regionName;
			}
		};
		
		$scope.featureTitle = function(feature) {
			if(!angular.isUndefined(feature.name)) return feature.name;
			if(!angular.isUndefined(feature.id)) return feature.id;
			if(!angular.isUndefined(feature.value)) return feature.value;
		};
		$scope.interactionDistance = function() {
			if ( !angular.isUndefined($scope.settings.current.markers_position && $scope.currentmodel.data.length>0)) {
				var LeftPart = Settings.getParticle($scope.settings.current.markers_position[1]);
				var RightPart = Settings.getParticle($scope.settings.current.markers_position[0]);

				var xd = $scope.currentmodel.data[(LeftPart-1)*3] - $scope.currentmodel.data[(RightPart-1)*3];
				var yd = $scope.currentmodel.data[(LeftPart-1)*3+1] - $scope.currentmodel.data[(RightPart-1)*3+1];
				var zd = $scope.currentmodel.data[(LeftPart-1)*3+2] - $scope.currentmodel.data[(RightPart-1)*3+2];
				
				var dist = Math.round(Math.sqrt( xd*xd + yd*yd + zd*zd ));
				return dist;
			} else {
				return -1;
			}
		};
		
		$scope.showInfo = function(info) {
			$mdDialog.show({
			      parent: angular.element(document.body),
			      template: '<md-dialog md-theme="default" aria-label="Information">' +
			        '  <md-dialog-content class="md-default-theme">' + info +
			        '<div class="md-actions"><md-button ng-click="closeDialog();" class="md-primary md-button md-default-theme"><span class="ng-binding ng-scope">Close</span></md-button></div>' +
			        '  </md-dialog-content>' +
			        '</md-dialog>',
			      locals: {

			      },
			      controller: DialogController
			    });
		};

		function DialogController($scope, $mdDialog) {
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			};
		}

		$scope.getDetails = function(item, event) {
			var output = '<div class="component-caption" layout="column" layout-align="left center">'+
			'<table>';
			for (var property in item) {
				if (['name','id','chr','value','score','strand','start','end'].indexOf(property) >= 0) 
					output += '<tr><td><b>'+property+':</b></td><td>'+item[property]+'</td></tr>';
			}
			output += '</table>'+
				'</div>'; 
			$scope.showInfo(output);
		};
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelInspector', tkComponentPanelInspector);

	function tkComponentPanelInspector() {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				currentmodel: '=',
				settings:'='
			},
			templateUrl: 'assets/templates/panel-inspector.html',
			link:function(scope, element, attrs){
				// console.log(scope.data);
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('PanelJBrowseController', PanelJBrowseController);

	function PanelJBrowseController($scope, $mdDialog, Overlays, uuid4, Networks, d3Service) {

		$scope.width = $scope.state.width; // strip PX units
		$scope.height = $scope.state.height; // strip PX units

		var originalOverlay = Overlays.getCurrentIndex();
		
		var jbrowse_start = (($scope.settings.current.chromStart-30000));
		if(jbrowse_start<0) jbrowse_start = 0;
		var chrom = ($scope.settings.current.chrom);
		if(!$scope.view.settings.leading_chr) chrom = ($scope.settings.current.chrom).replace('chr','');
		//$scope.jbrowsedataurl = 'http://172.16.54.4/JBrowse/data';
		//$scope.jbrowsedataurl = $scope.view.settings.jbrowse_data+'_'+$scope.settings.current.speciesUrl;
		$scope.jbrowsedataurl = encodeURIComponent($scope.view.settings.species_data[$scope.settings.current.speciesUrl]);
		
		$scope.iframe_src = $scope.view.settings.jbrowse_path+'index.html?data='+$scope.jbrowsedataurl+'&loc='+chrom+':'+
		jbrowse_start+'..'+($scope.settings.current.chromEnd+30000)+'&tracks=Restraints&overview=0';
		//+'&highlight='+chrom+':'+$scope.settings.current.chromStart+'..'+$scope.settings.current.chromEnd;
		
			
		$scope.updatePosition =  function(position, leftborder, rightborder) {
			//alert(position);
			if(position >= $scope.settings.current.chromStart && position <= $scope.settings.current.chromEnd) {
				$scope.settings.current.position = position;
			}
			if(position < $scope.settings.current.chromStart) {
				$scope.settings.current.position = $scope.settings.current.chromStart;
			}  
			if(position > $scope.settings.current.chromEnd) {
				$scope.settings.current.position = $scope.settings.current.chromEnd;
			}
			if($scope.settings.current.leftborder != leftborder || $scope.settings.current.rightborder != rightborder) {
				$scope.settings.current.leftborder = leftborder;
				$scope.settings.current.rightborder = rightborder;
			}
			$scope.hideTadkitMarkers();
			$scope.$apply();
		};
		$scope.$watch('settings.current.markers_position', function( newValue, oldValue ) {
			if ( newValue !== oldValue) {
				if ( newValue[0] === -1 || newValue[1] === -1) {
					$scope.hideTadkitMarkers();
	        	} else {
	        		$scope.updateTadkitMarkers(newValue[0],newValue[1]);
	        	}
			}
		});
		$scope.applyOverlay =  function(track,features) {
			var self = this;
			var overlays = Overlays.get();
			for(var i=0;i<overlays.loaded.length;i++) {
				if (overlays.loaded[i].object.title === track) {
					$scope.toggleOverlay(overlays.loaded[i].object.state.index);
					return true;
				}
			}
			
			var jbrowseOverlay =
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : overlays.loaded.length,
									"title" : track,
									"source" : "JBrowse track",
									"url" : "local",
									"description" : "JBrowse track overlay", 
									"type" : "jbrowse",
									"format" : "variable",
									"components" : 2,
									"name" : track,
									"state" : {
										"index" : 0, // make real index???
										"overlaid" : false
									}
								},
								"palette" : [],
								"data" : [],
								"colors" : {
									"particles" : [],
									"chromatin" : [],
									"network" : {
										"RGB" : [],
										"alpha" : []
									}
								}
							};
			var totallength;
			var k, max_val, min_val;
			var j = 0;
			var l = 0;
			
			for(k=0;k<$scope.settings.current.segmentsCount;k++) {
				jbrowseOverlay.colors.chromatin[k] = "gray";
			}

			var featureColor = [];
			var scored_color = false;
			angular.forEach(features, function(feature) {
				if(typeof feature.get('color') == 'undefined') {
					featureColor.push(feature.get('score'));
					scored_color = true;
				} else {
					featureColor.push(feature.get('color'));
				}
			});
			if(scored_color) {
				var hexEnd = '#0000ff';
				var hexStart = '#ffffff';
				max_val = Math.max.apply(Math, featureColor);
				min_val = Math.min.apply(Math, featureColor);
				for(k=0;k<featureColor.length;k++) {
					featureColor[k] = d3.interpolateHcl(hexStart, hexEnd)((featureColor[k]-min_val)/(max_val-min_val));
				}
			}
			angular.forEach(features, function(feature) {
				j = Math.round((feature.get('start') - $scope.settings.current.chromStart)/$scope.settings.current.segmentLength);
				totallength = Math.round((feature.get('end') - feature.get('start'))/$scope.settings.current.segmentLength);
				for(k=j;k<(j+totallength) && k<$scope.settings.current.segmentsCount;k++) {
					jbrowseOverlay.colors.chromatin[k] = featureColor[l];
				}
				l++;
				//j += totallength;
			});
//			j += totallength;
//			for(i=j;i<$scope.settings.current.segmentsCount;i++) {
//				jbrowseOverlay.colors.chromatin[i] = "gray";
//			}
			var newOverlay = Overlays.addDirect(jbrowseOverlay);
			var overlay = overlays.loaded[newOverlay];
			
			overlay.colors.particles = [];
			overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, $scope.settings.current.edgesCount);
			overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, $scope.settings.current.edgesCount);

			$scope.toggleOverlay(newOverlay);
			//Overlays.setOverlaid(newOverlay);
			//Overlays.set(newOverlay);
			//$scope.currentoverlay = Overlays.set(newOverlay);
		};
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.currentoverlay = Overlays.getOverlay();
			} else {
				Overlays.setOverlaid(originalOverlay);
				Overlays.set(originalOverlay);
				$scope.currentoverlay = Overlays.getOverlay();
			}
			//$scope.$apply($scope.currentoverlay.colors.chromatin);
			//$scope.toggleColor($scope.currentoverlay.colors.chromatin);
			$scope.toggleColor($scope.currentoverlay);
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};
		$scope.removeOverlay =  function(track) {
			var overlays = Overlays.get();
			angular.forEach(overlays.loaded, function(overlay) {
				if (overlay.object.title === track) {
					$scope.toggleOverlay(overlay.object.state.index);
				}

			});
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentPanelJbrowse', tkComponentPanelJbrowse);

	function tkComponentPanelJbrowse(Settings) {
		return {
			restrict: 'EA',
			scope: { 
				id: '@',
				state: '=',
				view: '=',
				data: '=',
				settings:'=',
				overlay: '=',
				currentoverlay:'='
			},
			templateUrl: 'assets/templates/panel-jbrowse.html',
			link:function(scope, element, attrs){
				// console.log(scope.data);
//				angular.element(document.querySelector('#jbrowse-iframe'))[0].onload= function() {
//					var jbrowse_scope = angular.element(document.querySelector('#jbrowse-iframe')).scope();
//					jbrowse_scope.updateTadkitBar(scope.settings.current.position);
//				};				
				scope.$watch('settings.current.position', function(newPosition, oldPosition) {
					if ( newPosition !== oldPosition ) {
						scope.update();
					}
				});
				scope.$watch('settings.current.tad_selected', function( newValue, oldValue ) {
					if ( newValue === -1 || oldValue === -1) {
						var jbrowse_scope = angular.element(document.querySelector('#jbrowse-iframe')).scope();
						if(!angular.isUndefined(jbrowse_scope) && jbrowse_scope.updateTadkitBar) {
							jbrowse_scope.updateTadkitTAD();
						}
		        	}
				});
				scope.update = function(data) {
					scope.settings.current.particle = Settings.getParticle();
					scope.settings.current.segment = Settings.getSegment();
					scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
					scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???
					
					//var jbrowse_scope = angular.element(document.querySelector('#jbrowse-iframe')).scope();
					//if(!angular.isUndefined(jbrowse_scope) && jbrowse_scope.updateTadkitBar) {
					//	jbrowse_scope.updateTadkitBar(scope.settings.current.position);
					//}
				};

				scope.toggleColor = function(overlay) {
					scope.currentoverlay = overlay;
					//scope.currentoverlay.colors.chromatin = chromatin_colors;
					scope.$apply(scope.currentoverlay.colors.chromatin);
				};
				//http://rest.ensemblgenomes.org/overlap/region/drosophila_melanogaster/chrX:15590000-16600000?feature=gene;content-type=application/json"
			}
		};
	}
})();
 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Chromatin', Chromatin);

	// constructor for chromatin model instances
	function Chromatin(Paths, PathControls, ColorConvert, Proximities) {
		return function(data, colors, view_settings, resolution_scale, settings) {
			// console.log(colors);

			var defaults = {
				visible: true,
				genomeLength: 816394, // bactieria mycoplasma_pneumoniae_m129
				particles: 0,
				particleSegments: 40,
				curveSegments: 1,
				radius: 15,
				radiusSegments: 16,
				endcap: false,
				pathClosed: false,
				tubed: true,
				resolution_scales : {
					"2000" : 1,
					"10000" : 1,
					"50000" : 5,
					"100000" : 5
				}
			};		
			view_settings = view_settings || {};
			angular.extend(this, angular.copy(defaults), view_settings);

			//var chromBreaks = [];
			var resolution = settings.segmentLength*settings.particleSegments;
			// ********************************************
			// * MODEL SCALE = 1unit : 1nanometer         *
			// * 1 micrometer (µm) = 1000 nanometers (nm) *
			// ********************************************
			// Eukaryotic animal cells diamter == 20 µm (10 - 30 µm) = 10000 units radius
			// var cellRadius = 10000;
			// Nucleus diameter == 6 µm (3 - 10 micrometers) = 3000 units radius
			// var nucelusRadius = 20;
			// Chromatin diameter == 10nm
			//var pathLength = cubicPath.getLength();
			var chromatinRadius = 5; // 10nm * 0.5
			// Chromatin density == 1080 BP : 11nm
			var chromatinLength = this.genomeLength * 11 / 1080;
			//this.radius = (pathLength * chromatinRadius) / chromatinLength;
			this.radius = resolution_scale*chromatinRadius;
			//console.log(this.radius);
			
			// Convert Data to Vector triplets
			var geometry = getGeometry(data);
			for (var g = geometry.vertices.length - 1; g >= 0; g--) {
				var geometryColor = new THREE.Color(colors[g*20]);
				geometry.colors.unshift(geometryColor);
			}
			geometry.computeBoundingSphere();
			geometry.center();

	//			var transparentMaterial = new THREE.MeshLambertMaterial({
	//			  transparent:true, 
	//			  opacity:0.0
	//			});
			var solidMaterial = new THREE.MeshLambertMaterial({
			    color: 0xffffff,
		        //shading: THREE.FlatShading,
		        //side: THREE.DoubleSide,
		        wireframe: false,
		        transparent: false,
		        vertexColors: THREE.FaceColors, // CHANGED
		        overdraw: true
		    });

			var simple_chrom_colors = ['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF','#C0C0C0','#808080','#800000','#808000','#008000','#800080','#008080','#000080','#A52A2A','#E9967A','#B8860B','#FFFF00','#006400','#98FB98','#2F4F4F','#40E0D0','#4682B4','#87CEFA','#DC143C','#FFD700','#F0E68C','#7CFC00','#00FF00','#00FF7F','#3CB371','#00FFFF','#AFEEEE','#6495ED','#87CEEB'];
			var chromatinFiber = new THREE.Object3D(); // unmerged network
			var i;
			var colori = 0;
			var chr_bins,pathControls,pathSegments,cubicPath,cubicGeom, chromatinGeometry, tubeMesh, newChromatinColor;
			var j;
			var offset = 0;
			var fpart = 0;
			var proximities = Proximities.get();
			settings.facesParticle = [];
			for (var l = 0 ; l < settings.chromosomeIndexes.length; l++) {
				chr_bins = Math.round((settings.chromEnd[l]-settings.chromStart[l])/resolution);
				//chromBreaks.push(offset);
			
				// Derive path controls from geometry vectors
				// var pathControls = getPathControls( geometry.vertices );
				var model_points = geometry.vertices.slice(offset,offset+chr_bins);
				pathControls = PathControls.cubic(model_points, this.pathClosed);
				//pathControls = PathControls.simple(geometry.vertices.slice(offset,offset+chr_bins));

				// Set number of Particles
				if (this.particles === 0) this.particles += geometry.vertices.length; //pathControls.vertices.length - 1;
				// Derive chromatin geometry path segments
				pathSegments = chr_bins * this.particleSegments; // same as segmentsCount...
				
				/*** TODO: Calculate PathSegments based on number of base pairs in the model ***/
				cubicPath = Paths.cubicBezier(pathControls.vertices, pathSegments, this.pathClosed);
				cubicGeom = new THREE.Geometry().setFromPoints( cubicPath.getPoints() );
				
				//cubicGeom.name = "cubicGeom";
	
				// Generate Chromatin model
				
				if(view_settings.tubed) {
					chromatinGeometry = new THREE.TubeGeometry(cubicPath, pathSegments, this.radius, 8, this.pathClosed);
					
				    tubeMesh = new THREE.Mesh(chromatinGeometry, solidMaterial);
					
				    //var faces = chromatinGeometry.vertices.length;
				    var faces = chromatinGeometry.faces.length;
					var segment_lengths = [];
					for (i = 0; i < model_points.length-1; i++) segment_lengths.push(distance(model_points[i+1],model_points[i]));
					var total_length = 0;
					for (i = 0; i < segment_lengths.length; i++) total_length += segment_lengths[i];
					var facesParticle = [];
					for (i = 0; i < chr_bins; i++) facesParticle.push([0,0]);
					for (i = chr_bins-1; i >= 0; i--) {
						// we add right part of curve if not  last particle
						if(i < chr_bins - 1 ) fpart = Math.round(((chromatinGeometry.faces.length)/16)*((segment_lengths[i]/2)/total_length));
						//if(i < chr_bins - 1 ) fpart = Math.round(((chromatinGeometry.vertices.length-8)/8)*((segment_lengths[i]/2)/total_length));
						// we add left part of curve if not first particle
						if(i > 0 ) fpart += Math.round(((chromatinGeometry.faces.length)/16)*((segment_lengths[i-1]/2)/total_length));
						//if(i > 0 ) fpart += Math.round(((chromatinGeometry.vertices.length-8)/8)*((segment_lengths[i-1]/2)/total_length)); 
						faces--;
						if(faces > 1) facesParticle[i][1]=faces;
						else facesParticle[i][1]=1;
						faces -= Math.ceil(fpart*16); // segments have 8 faces
						if(faces > 0) facesParticle[i][0]=faces;
						else facesParticle[i][0]=0;
						
					}
					settings.facesParticle.push(facesParticle);
					
					chromatinGeometry.dynamic = true;
					chromatinGeometry.verticesNeedUpdate = true;
					
					//chromatinGeometry.center();
					
				    //for(var k=0;k< chromatinGeometry.faces.length;k++) {
				    	//if(k%12) chromatinGeometry.faces[k].color.setRGB(1,0,0);
				    	//else chromatinGeometry.faces[k].color.setRGB(0,0,0);
				    //	chromatinGeometry.faces[k].color.setRGB(1,0,0);
					//}
					
					
				    /*for (i = 0; i < colors.length; i++) {
				    	//if(chromBreaks.indexOf(Math.floor(i/settings.particleSegments))>-1) {
				    	if(chromBreaks.indexOf(Math.floor(i/this.particleSegments))>-1) {
				    		for (j = 0; j < 16; j++) {
				    			if(typeof tubeMesh.geometry.faces[i*16+j] !== 'undefined') tubeMesh.geometry.faces[i*16+j].materialIndex = 1;
							}
				    	} else {
							if(ColorConvert.testIfHex(colors[i]) || colors[i].indexOf('#')===0) {
								newChromatinColor =  new THREE.Color(colors[i]);	 
							} else {
								newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(colors[i]));
							} 
							for (j = 0; j < 16; j++) {
								if(typeof tubeMesh.geometry.faces[i*16+j] !== 'undefined') tubeMesh.geometry.faces[i*16+j].color.set(newChromatinColor);
							}
				    	}
					}*/
					for (i = 0; i < chromatinGeometry.faces.length; i++) {
						if(settings.chromosomeIndexes.length > 1) colors[Math.floor(colori/16)] = simple_chrom_colors[l];
						if(ColorConvert.testIfHex(colors[Math.floor(colori/16)]) || colors[Math.floor(colori/16)].indexOf('#')===0) {
							newChromatinColor =  new THREE.Color(colors[Math.floor(colori/16)]);	 
						} else {
							newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(colors[Math.floor(i/16)]));
						} 
						for (j = 0; j < 16; j++) {
							if(typeof chromatinGeometry.faces[i+j] !== 'undefined') chromatinGeometry.faces[i+j].color.set(newChromatinColor);
						}
						colori++;
					}
					tubeMesh.geometry.__dirtyColors = true;
					tubeMesh.geometry.elementsNeedUpdate = true;
				    tubeMesh.dynamic = true;
				    tubeMesh.needsUpdate = true;
				    
					chromatinFiber.add( tubeMesh );
					//chromatinFiber.userData = {display:'tube'};
	
				} else {
					// Rings
						chromatinGeometry = new THREE.Geometry(); // to calculate merged bounds
	
					for ( i = 0 ; i < pathSegments; i++) {
						// cap if end segment
						this.endcap = ( i === 0 || i === pathSegments - 1 ) ? false : true ;
						// color linked to scene scope
						
						var segmentColor = colors[i];
						var segmentMaterial = new THREE.MeshLambertMaterial({
							color: segmentColor,
							emissive: segmentColor,
							vertexColors: THREE.VertexColors,
							opacity: 1.0, 
							transparent: false,
							wireframe: false
						});
						var segment = segmentGeometry(cubicGeom.vertices[i], cubicGeom.vertices[i+1], this );
						chromatinGeometry.merge(segment);
						THREE.GeometryUtils.center( chromatinGeometry );
	
						var chromatinSegment = new THREE.Mesh(segment, segmentMaterial);
						chromatinSegment.name = "segment-" + (i + 1);
						chromatinFiber.add(chromatinSegment);
					}	
				}
	
				chromatinGeometry.computeBoundingSphere();
				//chromatinGeometry.computeBoundingBox();
				offset += chr_bins;
			}
			
			//tubeMesh.position.x -= objectCenter.x;
			//tubeMesh.position.y -= objectCenter.y;
			//tubeMesh.position.z -= objectCenter.z;
			
			//chromatinFiber.boundingSphere = chromatinGeometry.boundingSphere;
			chromatinFiber.boundingSphere = geometry.boundingSphere;
			chromatinFiber.name = "Chromatin Fiber";
			
			return chromatinFiber;
		};
	}

	function distance(p1,p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		var dz = p2.z - p1.z;
		var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
		return dist;
	}
	
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Chromatin Geometry";
		return vertexGeometry;
	}

	function segmentGeometry (pointX, pointY, props) {
		var newGeometry;
		/* edge from X to Y */
		var segmentDirection = new THREE.Vector3().subVectors( pointY, pointX );
		var segmentOrientation = new THREE.Matrix4();
		/* THREE.Object3D().up (=Y) default orientation for all objects */
		segmentOrientation.lookAt(pointX, pointY, new THREE.Object3D().up);
		/* rotation around axis X by -90 degrees
		 * matches the default orientation Y
		 * with the orientation of looking Z */
		var segmentRotation = new THREE.Matrix4();
		segmentRotation.set(	1, 0, 0, 0,
								0, 0, 1, 0,
								0,-1, 0, 0,
								0, 0, 0, 1 );
		segmentOrientation.multiply(segmentRotation);
		segmentOrientation.setPosition( pointX.add(pointY).multiplyScalar(0.5) );
		newGeometry = new THREE.CylinderGeometry( props.radius, props.radius, segmentDirection.length(), props.radiusSegments, props.curveSegments, props.endcap);
		newGeometry.applyMatrix(segmentOrientation);
		
		return newGeometry;
	}

		
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneCluster', tkComponentSceneCluster);

	function tkComponentSceneCluster(Particles, Cluster) {
		return {
			restrict: 'EA',
			scope: { 
				state: '=', /* for scene until can check for DOM loaded */
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				id: '@', /*???*/
				cluster: '=',
				overlay:'='
			},
			templateUrl: 'assets/templates/scene-cluster-icon.html',
			link: function postLink( scope, element, attrs ) {
				// console.log(scope.cluster);
				
				var renderer;
				var screenshot;
				var scene, viewport;
				var camera, cameraPosition, cameraTarget, cameraTranslate;
				var ambientLight, pointLight;
				var orbit, controls, particles, cluster;
				var width, height, contW, contH, windowHalfX, windowHalfY;

				scope.init = function () {
					
					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[0]
					 */
					viewport = element[0].children[0].children[0];
					// width = viewport.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
					width = parseInt(scope.state.width);
					// height = viewport.clientHeight;
					height = parseInt(scope.state.height);
					// OJO! DOM NOT READY
					// console.log(element[0].firstChild.children[2].clientWidth);
					
					if (window.WebGLRenderingContext)
						renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
					else
						renderer = new THREE.CanvasRenderer({alpha: true});	
						
					var background = scope.view.settings.background;
					var clearColor = "0x" + background.substring(1);
					renderer.setClearColor( parseInt(clearColor) );
					renderer.setSize( width, height );
					renderer.autoClear = false; // To allow render overlay on top of sprited sphere
					renderer.setSize( width, height );
					viewport.appendChild( renderer.domElement );
					

					// SCENE
					scene = new THREE.Scene();

					// CAMERA
					camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, ( width / height) , scope.view.viewpoint.near, scope.view.viewpoint.far );
					camera.position.fromArray(scope.view.viewpoint.camera);
					camera.name = "Scene Camera";
					
					// CONTROLS
					orbit = new THREE.OrbitControls(camera, renderer.domElement);
					orbit.autoRotate = scope.view.controls.autoRotate;
					orbit.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
					orbit.enableZoom = false;
					orbit.enableRotate = false;
					orbit.enablePan = false;
					orbit.enableKeys = false;
					controls = new THREE.TrackballControls(camera, renderer.domElement);
					controls.noZoom = true;
					controls.noRotate = true;
					controls.noPan = true;
					
					// GEOMETRY: PARTICLES
					particles = new Particles( scope.cluster.data[scope.cluster.centroidIndex], scope.view.settings.particles );
					particles.geometry.center();
					particles.visible = scope.view.settings.particles.visible;
					//scene.add(particles);

					//GEOMETRY: CLUSTER
					cluster = new Cluster( scope.cluster.data, scope.cluster.centroidIndex, scope.overlay, scope.view.settings.cluster );
					cluster.visible = scope.view.settings.cluster.visible;
					cluster.name = cluster.name + " " + scope.id.match(/\d+/)[0];
					scene.add(cluster);

					// SET CAMERA ORIENTATION
					cameraPosition = new THREE.Vector3(); //cluster.boundingSphere.center;
					cameraTarget = new THREE.Vector3( 0,0,0 ); //cluster.boundingSphere.center;

					/*var objectCenter = cluster.boundingSphere.center;

					cluster.position.x -= objectCenter.x;
					cluster.position.y -= objectCenter.y;
					cluster.position.z -= objectCenter.z;
					*/
					var angle = scope.view.viewpoint.fov / 2;
					var margin = 0.6;
					var	scale = Math.tan(angle).toFixed(2) * margin;
					cameraTranslate = cluster.boundingSphere.radius * scale;
					scope.lookAtTarget(cameraPosition, cameraTarget, cameraTranslate);
				};

				scope.lookAtTarget = function (position, target, translate) {
						position = position || new THREE.Vector3( 50000, 50000, 50000 );
						var origin = new THREE.Vector3(0,0,0);
						target = target || origin;
						translate = translate || 500;
						// Target on Origin and Translate back
						// (creates consistent view orientation)
						camera.position.set(position.x, position.y, position.z);
						camera.lookAt(origin);
						orbit.target = target;
						camera.translateY(translate);
						// Retarget on target
						camera.lookAt(target);
						camera.updateMatrixWorld();
						// Controls target
						controls.target.copy(position);
				};

				// -----------------------------------
				// Draw and Animate
				// -----------------------------------
				scope.animate = function () {
					requestAnimationFrame( scope.animate );
					orbit.update();
					controls.update();
					scope.render();
				};

				scope.render = function () {
					renderer.render( scene, camera );
				};

				// Begin
				scope.init();
				scope.animate();
				
				scope.destroy_scene = function () {
					scene.remove(cluster);
					scene.remove(particles);
					
			        
			        particles.geometry.dispose();
			        particles.material.dispose();
			        
			        for(var i=0;i<cluster.children.length;i++) {
			        	cluster.children[i].geometry.dispose();
			        	cluster.children[i].material.dispose();
			        	
			        }

			        particles = undefined;
			        cluster = undefined;
			        if(renderer) renderer.forceContextLoss();
			        
				};
				scope.$on('$destroy', function() {
					scope.destroy_scene();
			    });
				
			}
		};
	}
})();

(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Cluster', Cluster);

	// constructor for cluster models ensemble
	function Cluster(Color, Settings) {
		return function( data, centroidIndex, overlay, cluster_settings ) {

			var defaults = {
				visible: true,
			};	
			cluster_settings = cluster_settings || {};
			angular.extend(this, angular.copy(defaults), cluster_settings);

			// Convert Data (single Model / set of Particles) to Vector triplets
			var max_radius = 0;
			var overlayColors = Color.colorsFromHex(overlay);

			// Generate Cluster model
			var clusterEnsemble = new THREE.Object3D(); // unmerged network
			var chr_bins;
			var settings = Settings.get();
			var resolution = settings.current.segmentLength*settings.current.particleSegments;
			var i;
			var offset = 0;
			for ( i = 0 ; i < data.length; i++) {
				// var geometry = getModelGeometry(data[i]);
				// geometry.computeBoundingSphere();
				// geometry.center();
				var modelMaterial = new THREE.LineBasicMaterial({
					color: new THREE.Color(parseInt(this.color)),
					opacity: this.modelOpacity,
					transparent: this.transparent,
					linewidth: this.linewidth,
					fog: this.fog
				});
				var centroidMaterial = new THREE.LineBasicMaterial({
					opacity: this.centroidOpacity, 
					transparent: this.transparent,
					linewidth: this.linewidth,
					vertexColors: THREE.VertexColors,
					fog: this.fog
				});
				if (i == centroidIndex) {
					modelMaterial = centroidMaterial;
				}
				offset = 0;
				for (var l = 0 ; l < settings.current.chromosomeIndexes.length; l++) {
					chr_bins = Math.round((settings.current.chromEnd[l]-settings.current.chromStart[l])/resolution)+1;
					// Convert Data to Vector triplets
					var modelComponents = data[i].slice(3*offset,3*(offset+chr_bins));
					var modelGeometry = getModelGeometry(modelComponents);
					modelGeometry.colors = overlayColors;

					var model = new THREE.Line(modelGeometry, modelMaterial);
					model.name = "model-"+settings.current.chromosomeIndexes[l]+"-"+i;
					model.geometry.computeBoundingSphere();
					model.geometry.center();
					if(model.geometry.boundingSphere.radius>max_radius) max_radius = model.geometry.boundingSphere.radius;
					clusterEnsemble.add(model);
					offset += chr_bins;
				}
				
			}
			for ( i = 0 ; i < clusterEnsemble.children.length; i++) {
				clusterEnsemble.children[i].geometry.center();
			}
			clusterEnsemble.boundingSphere = clusterEnsemble.children[0].geometry.boundingSphere.clone();
			clusterEnsemble.boundingSphere.radius = max_radius;
			clusterEnsemble.name = "Cluster Ensemble";
			return clusterEnsemble;
		};
	}
	
	function getModelGeometry(components) {
		var offset = 0, vertex,
			 modelGeometry = new THREE.Geometry();

		var totalVertices = components.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = components[ offset ++ ];
			vertex.y = components[ offset ++ ];
			vertex.z = components[ offset ++ ];
			modelGeometry.vertices.push( vertex );
		}
		modelGeometry.center();
		return modelGeometry;
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneFloatingtad', tkComponentSceneFloatingtad);

	function tkComponentSceneFloatingtad() {
		return {
			restrict: 'EA',
			link: function(scope, element, attrs) {
				var viewport, viewsize, camera, scene, renderer, geometry, material, network, controls;
				init();
				animate();
				function init() {
					viewport =  element[0];
					viewsize = viewport.clientWidth;

					scene = new THREE.Scene();

					camera = new THREE.PerspectiveCamera( 50, 1, 150, 650 );
					camera.position.z = 500;
					scene.add(camera);

					geometry = new THREE.TorusKnotGeometry( 100, 30, 100, 16 );

					// GENERATE TEST GEOMETRY
					// var torusgeom = new THREE.TorusKnotGeometry( 100, 10, 36, 1 );
					// var testgeom = torusgeom.vertices;
					// for (var i = testgeom.length - 1; i >= 0; i--) {
					// 	testgeom[i].x = parseInt(testgeom[i].x.toFixed(2));
					// 	testgeom[i].y = parseInt(testgeom[i].y.toFixed(2));
					// 	testgeom[i].z = parseInt(testgeom[i].z.toFixed(2));
					// };
					// console.log(JSON.stringify(testgeom));

					material = new THREE.MeshDepthMaterial({
						wireframe: true,
						wireframeLinewidth: 1
					});

					network = new THREE.Mesh( geometry, material );
					network.name = "Floating TAD";
					scene.add(network);

					if (window.WebGLRenderingContext)
 						renderer = new THREE.WebGLRenderer({alpha: true});
 					else
						renderer = new THREE.CanvasRenderer({alpha: true});
						
					renderer.setSize( viewsize, viewsize );
					viewport.appendChild( renderer.domElement );

					controls = new THREE.TrackballControls( camera, renderer.domElement );
					controls.minDistance = 450;
					controls.maxDistance = 550;

				}
				function animate() {
					requestAnimationFrame(animate);
				controls.update();
					render();
				}
				function render() {
					network.rotation.x += 0.006;
					network.rotation.y += 0.006;
					renderer.render(scene, camera);
				}
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Network', Network);

	// create one line between each pair in dataset
	function Network(Color, Particles, Networks) {
		return function(data, overlay, settings) {
			// console.log(data);
			// console.log(overlay);

			// Uses THREE.LinePieces to generate separate lines
			// from an array of vertex pairs

			var defaults = {
				color: "#ff0000",
				size: 200,
				opacity: 0.8,
				map: "assets/img/sphere-glossy.png",
				depthtest: true,
				alphatest: 0.5,
				transparent: true,
				visible: false
			};	
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			// Define a color-typed uniform
			var uniforms = {  
				color: { type: "c", value: new THREE.Color( 0x00ff00 ) },
				alpha: { type: "f", value: 1.0 }
			};
			//var attributes = {  
			//	alpha: { type: 'f', value: [] }
			//};
			var parameters = {
				uniforms: uniforms,
				//attributes: attributes,
				vertexShader: document.getElementById('vertexShader').textContent,
				fragmentShader: document.getElementById('fragmentShader').textContent,
				vertexColors: THREE.VertexColors,
				// side: THREE.DoubleSide,
				// blending: THREE.AdditiveBlending, // black is transparent
				transparent: true //this.transparent
			};
			var shaderMaterial = new THREE.ShaderMaterial(parameters);
			shaderMaterial.linewidth = 1;

			var dataLength = data.length / 3;
			var totalPairs = ((dataLength * dataLength) - dataLength) * 0.5;

			var vertexPairs = getVertexPairs(data, totalPairs);
			var vertexRGB = new Float32Array(overlay.RGB);
			var vertexAlpha = new Float32Array(overlay.alpha);

			var geometry = new THREE.BufferGeometry();
			geometry.addAttribute( 'position', new THREE.BufferAttribute( vertexPairs, 3 ) );
			geometry.addAttribute( 'color', new THREE.BufferAttribute( vertexRGB, 3 ) );
			geometry.addAttribute( 'alpha', new THREE.BufferAttribute( vertexAlpha, 1 ) );
			geometry.center();
			geometry.computeBoundingSphere();

			var nodeMap = null; // render only point
			if (this.map) {
				var loader = new THREE.TextureLoader();
				nodeMap = loader.load(this.map);
			}
			
			var nodesMaterial = new THREE.PointsMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: nodeMap,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

			// NETWORK
			var particlesGeometry = getGeometry(data);
			particlesGeometry.center();
			particlesGeometry.computeBoundingSphere();
			var vertexColors = [];
			for( var i = 0; i < particlesGeometry.vertices.length; i++ ) {
				// BASE COLOR
				vertexColors[i] = new THREE.Color("rgb(255,255,255)");
			}
			particlesGeometry.colors = vertexColors;
			var nodes = new THREE.Points(particlesGeometry, nodesMaterial);
			nodes.name = "Network Nodes";
			
			//var edges = new THREE.Line(geometry, shaderMaterial, THREE.LinePieces); // THREE.LinePieces = separate lines
			//var material = new THREE.LineBasicMaterial({
			//    color: 0x000000
			//});
			var edges = new THREE.LineSegments( geometry, shaderMaterial );
			edges.name = "Network Edges";

			var network = new THREE.Object3D();
			network.add(edges);
			network.add(nodes);
			network.boundingSphere = geometry.boundingSphere;
			//var network = new THREE.Line(geometry, shaderMaterial, THREE.LinePieces); // THREE.LinePieces = separate lines
			//var network = new THREE.LineSegments( geometry, shaderMaterial );
			network.name = "Network Graph";
			// console.log(network);
			return network;
		};
	}

	function getVertexPairs(data, totalPairs) {
		// from an array of vertex pairs
		// eg. [x1,y1,z1,x2,y2,z2,x3,y3,z3,...xn,yn,zn]
		// to a matrix of all-to-all connections
		// eg. [x1,y1,z1,x2,y2,z2,x1,y1,z1,x3,y3,z3,...xn,yn,zn,xm,ym,zm]
		// such that all point pairs are represented uniquely
		// ie. one half of matrix where array length = (n^2-n)/2
		// eg.  1 2 3 4
		//     1  x x x  ==  1-2 1-3 1-4    3
		//     2    x x  ==  2-3 2-4      + 2
		//     3      x  ==  3-4          + 1
		//     4         ==  ((4*4)-4)*0.5  = 6 pairs of vertices
		var vertexPairs = new Float32Array( totalPairs * 6); // 6 ie. 2 * xyz
		var pairPos = 0;
		for (var i = 0; i < data.length; i += 3) {
			var vertex1 = i;
			for (var j = i + 3; j < data.length; j += 3) {
				var vertex2 = j;
				// console.log(pairPos);
				// console.log(data[vertex1]+","+data[vertex1+1]+","+data[vertex1+2]);
				// console.log(data[vertex2]+","+data[vertex2+1]+","+data[vertex2+2]);
				// from vertex
				vertexPairs[pairPos] = data[vertex1]; pairPos++;
				vertexPairs[pairPos] = data[vertex1 + 1]; pairPos++;
				vertexPairs[pairPos] = data[vertex1 + 2]; pairPos++;
				// to vertex
				vertexPairs[pairPos] = data[vertex2]; pairPos++;
				vertexPairs[pairPos] = data[vertex2 + 1]; pairPos++;
				vertexPairs[pairPos] = data[vertex2 + 2]; pairPos++;
			}
		}
		vertexPairs.name = "Network Vertex Pairs";
		return vertexPairs;
	}
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Particles Geometry";
		return vertexGeometry;
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Particles', Particles);

	// constructor for chromatin model instances
	function Particles() {
		return function(data, colors, settings) {
			var defaults = {
				particles: 0,
				visible: true,
				color: "#ff0000",
				size: 100,
				opacity: 0.8,
				map: "assets/img/sphere-glossy.png",
				depthtest: true,
				alphatest: 0.5,
				transparent: true
			};
			settings = settings || {};
			angular.extend(this, angular.copy(defaults), settings);

			var particlesGeometry = getGeometry(data);
			particlesGeometry.center();
			particlesGeometry.computeBoundingSphere();

			var vertexColors = [];
			for( var i = 0; i < particlesGeometry.vertices.length; i++ ) {
				// BASE COLOR
				vertexColors[i] = new THREE.Color("rgb(255,255,255)");
			}
			particlesGeometry.colors = vertexColors;

			var particleMap = null; // render only point
			if (this.map) {
				var loader = new THREE.TextureLoader();
				particleMap = loader.load(this.map);
			}

			var particlesMaterial = new THREE.PointsMaterial({
				color: this.color,
    			vertexColors: THREE.VertexColors,
				size: this.size,
				opacity: this.opacity,
				map: particleMap,
				depthTest: this.depthtest,
				alphaTest: this.alphatest,
				transparent: this.transparent
			});

			var particlesCloud = new THREE.Points( particlesGeometry, particlesMaterial );
			// particlesCloud.sortParticles = true;
			particlesCloud.name = "Particles Cloud";
			
			return particlesCloud;
		};
	}
	
	function getGeometry(data) {
		var offset = 0, vertex,
			 vertexGeometry = new THREE.Geometry();
		var totalVertices = data.length;
		while ( offset < totalVertices ) {
			vertex = new THREE.Vector3();
			vertex.x = data[ offset ++ ];
			vertex.y = data[ offset ++ ];
			vertex.z = data[ offset ++ ];
			vertexGeometry.vertices.push( vertex );
		}
		vertexGeometry.name = "Particles Geometry";
		return vertexGeometry;
	}
		
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentSceneThreetest', tkComponentSceneThreetest);

	function tkComponentSceneThreetest() {
		return {
			restrict: 'EA',
			scope: {
				id: '@',
				type: '=',
				data: '=',
				view: '=',
				overlay: '=',
				state: '='
			},
			link: function(scope, element, attrs) {
				// console.log(scope);

				// THREE.JS TEST
				var viewport, camera, scene, renderer, geometry, material, network;
				init();
				animate();
				function init() {
					viewport =  element[0];
					scene = new THREE.Scene();
					camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
					camera.position.z = 500;
					scene.add(camera);
					// var size = scope.size * 20;
					var size = 200;
					geometry = new THREE.BoxGeometry(size, size, size);

					var chromatinColor = "#" + scope.overlay;
					material = new THREE.MeshLambertMaterial({
						color: chromatinColor,
						ambient: chromatinColor,
						emissive: chromatinColor,
						//shading: THREE.FlatShading,
						opacity: 1.0,
						transparent: false,
						wireframe: false
					});
					// material = new THREE.MeshNormalMaterial();
					network = new THREE.Mesh(geometry, material);
					network.name = "testmesh";
					scene.add(network);
					if (window.WebGLRenderingContext)
 						renderer = new THREE.WebGLRenderer({alpha: true});
 					else
						renderer = new THREE.CanvasRenderer({alpha: true});
					renderer.setSize(window.innerWidth, window.innerHeight);
					viewport.appendChild(renderer.domElement);
					// console.log(scene);

					var chromatinObj = scene.getObjectByName( "testmesh" );
					scope.$watch('overlay', function( newValue, oldValue ) {
						if ( newValue !== oldValue ) {
							var newColor =  new THREE.Color("#" + scope.overlay);
							chromatinObj.material.color = newColor;
							chromatinObj.material.ambient = newColor;
							chromatinObj.material.emissive = newColor;
						}
					});		
				}
				function animate() {
					requestAnimationFrame(animate);
					render();
				}
				function render() {
					network.rotation.x += 0.01;
					network.rotation.y += 0.02;
				renderer.render(scene, camera);
				}
				// END THREE.JS TEST
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SceneController', SceneController);

	function SceneController($scope) {

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			console.log(bool);
		};
		
		$scope.$on("angular-resizable.resizeEnd", function (event, args) {
			if(args.width)
				$scope.state.width = $scope.settings.views.scene_width = args.width;

			if(args.height)
				$scope.state.height = $scope.settings.views.scene_height = args.height;
			$scope.resizeCanvas();
        });
		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentScene', tkComponentScene);

	function tkComponentScene(Particles, Chromatin, Network, Cluster, Datasets, Overlays, Segments, Settings, Networks, ColorConvert) {
		return {
			restrict: 'EA',
			scope: { 
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=',
				state: '=',
				currentmodel: '=',
				proximities: '=',
				currentoverlay: '='
			},
			templateUrl: 'assets/templates/scene.html',
			link: function postLink(scope, element, attrs) {
				// threeService.three().then(function(THREE) {
					// console.log(scope);
					if(angular.isUndefined(scope.currentmodel)) return;
				
					var scene, component, viewport;
					var camera, cameraPosition, cameraTarget, cameraTranslate;
					var ambientLight, pointLight;
					var playback, controls, renderer;
					var particles, chromatin, cluster, network, spheres, ring, leftring, rightring, linker, linker_label;
					var particlesObj, chromatinObj, clusterObj, networkObj, sphereObj;
					//var raycaster, mouse;
					var width, height, contW, contH, windowHalfX, windowHalfY;

					var particleOriginalColor = new THREE.Color();
					var positionOriginalColor = new THREE.Color();
					var highlightColor = new THREE.Color("rgb(0,0,0)"); // add to scene component
					
					var cu;
					
					scope.init = function () {

						scope.complete_scene = function() {
							// GEOMETRY: PARTICLES
							scope.view.settings.particles.size = scope.settings.current.particleSize;
							particles = new Particles(scope.currentmodel.data, scope.currentoverlay.colors.particles, scope.view.settings.particles);
							// particles = new Particles(scope.model.data, scope.overlay.colors.particles, scope.view.settings.particles);
							particles.visible = scope.view.settings.particles.visible;
							scene.add(particles);

							//GEOMETRY: CHROMATIN
							scope.view.settings.chromatin.particleSegments = scope.settings.current.particleSegments;
							var resolution = scope.data.object.resolution; // base pairs
							var resolution_scale;
							if(angular.isUndefined(scope.data.object.radius_scale)) {
								angular.forEach(scope.view.settings.chromatin.resolution_scales, function(value, key) {
									  if(parseInt(key) <= resolution) resolution_scale = value;
								});
								scope.data.object.radius_scale = resolution_scale;
							} else {
								resolution_scale = parseInt(scope.data.object.radius_scale);
							}
							chromatin = new Chromatin(scope.currentmodel.data, scope.currentoverlay.colors.chromatin, scope.view.settings.chromatin, resolution_scale, scope.settings.current);
							// chromatin = new Chromatin(scope.model.data, scope.overlay.colors.chromatin, scope.view.settings.chromatin);
							chromatin.visible = scope.view.settings.chromatin.visible;
							scene.add(chromatin);
							scope.view.settings.chromatin.radius = chromatin.boundingSphere.radius;
							
							if(scope.view.settings.chromatin.tubed) {
								
								var radius = chromatin.children[0].geometry.parameters.radius+0.2*chromatin.children[0].geometry.parameters.radius;
								var ringGeometry = new THREE.RingGeometry(radius, radius+1.0*radius, 50);
								//ringGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
								ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide}));
								
								scene.add(ring);

								leftring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide}));
								leftring.visible = false;
								scene.add(leftring);

								rightring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide}));
								rightring.visible = false;
								scene.add(rightring);

								var link_def = new THREE.Geometry();

								link_def.vertices.push(leftring.position);
								link_def.vertices.push(rightring.position);
								
								
								linker = new THREE.Line(link_def, new THREE.LineDashedMaterial( {
									color: 0xff0000,
									linewidth: 1,
									scale: 1,
									dashSize: 3,
									gapSize: 2,
								} ));
								linker.visible = false;
								scene.add(linker);


								spheres = new THREE.Object3D();
								var start_tad, end_tad, radius_cloud, centre_of_mass;
								for (var i = 0; i < scope.data.tad_data.tads.length; i++) {
									start_tad = Math.round(((scope.data.tad_data.tads[i][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                		end_tad = Math.round((scope.data.tad_data.tads[i][2]-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution);
			                 		
			                 		centre_of_mass = new THREE.Vector3();
									for (var j = start_tad; j < end_tad; j++) {
										centre_of_mass.add(particles.geometry.vertices[j]);
									}
									centre_of_mass.divideScalar(end_tad - start_tad + 1);
									radius_cloud = 0;
									for (j = start_tad; j < end_tad; j++) {
										if(centre_of_mass.distanceTo(particles.geometry.vertices[j])>radius_cloud) 
											radius_cloud = centre_of_mass.distanceTo(particles.geometry.vertices[j]);
									}
									
									var sphereGeom =  new THREE.SphereGeometry( radius_cloud-10, 32, 16 );									
									var blueMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, transparent: true, blending: THREE.AdditiveBlending, opacity: 0.3 } );									
									var sphere = new THREE.Mesh( sphereGeom, blueMaterial );
									sphere.material.emissive = new THREE.Color(0x000000);
								
									sphere.position.x = centre_of_mass.x;
									sphere.position.y = centre_of_mass.y;
									sphere.position.z = centre_of_mass.z;
									
									
									spheres.add(sphere);
									
									
								}
								spheres.name = "TADs cloud";
								scene.add(spheres);	
								sphereObj = scene.getObjectByName( "TADs cloud" );
								
								//raycaster = new THREE.Raycaster();
								//mouse = new THREE.Vector2();
								
								//viewport.addEventListener( 'click', onDocumentMouseDown, false );
								
							}
							// GEOMETRY: MESH
							// network = new Network(scope.data.data, scope.overlay.colors.network, scope.view.settings.network);
							// network.visible = scope.view.settings.network.visible;
							// scene.add(network);

							//GEOMETRY: CLUSTER
							var clusterLength = scope.data.data.length / scope.data.object.components;
							var gradientColors = Segments.gradientHCL(scope.currentoverlay, clusterLength);
							var models = Datasets.getCluster();
							var cluster_data = [];
							for (var k = 0; k < models.length; k++) {
								var model = Datasets.getModel(models[k],scope.settings.current.chromosomeIndexes);
								var modelData = model.data;
								if (modelData) {cluster_data.unshift(modelData);}
									else {console.log("Listed model not found!");}
							
							}
							
							cluster = new Cluster( cluster_data, -1, gradientColors, scope.view.settings.cluster );
							cluster.visible = scope.view.settings.cluster.visible;
							cluster.name = "Cluster View";
							scene.add(cluster);



						};
						scope.centerScene = function() {

							cameraPosition = chromatin.boundingSphere.center;
							cameraTarget = chromatin.boundingSphere.center;
							cameraTranslate = chromatin.boundingSphere.radius * scope.view.viewpoint.scale;
							scope.lookAtTAD(cameraPosition, cameraTarget, cameraTranslate);
							
						};

						// VIEWPORT
						/* component-controller == children[0]
						 * - component-header == children[0]
						 * - component-body == children[3]
						 */
						// component = element[0].parentNode;
						// console.log(component.clientWidth);
						viewport = element[0].children[0].children[3];
						// console.log(viewport.clientWidth);
						// if with controller use line below
						// viewport = element[0].children[0].children[3];

						// width = component.clientWidth; // NEED TO WAIT UNTIL DOM LOADED
						width = parseInt(scope.state.width); // USE UNTIL DOM CHECK AVAILBLE
						//if(window.innerWidth <= 1280) width = 600;
						// height = component.clientHeight;
						height = parseInt(scope.state.height); // USE UNTIL DOM CHECK AVAILBLE
						// OJO! DOM NOT READY
						// console.log(element[0].firstChild.children[2].clientWidth);

						if (window.WebGLRenderingContext)
							renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
						else
							renderer = new THREE.CanvasRenderer({alpha: true});					
						var background = scope.view.settings.background;
						var clearColor = "0x" + background.substring(1);
						renderer.setClearColor( parseInt(clearColor) );
						renderer.setSize( width, height );
						renderer.autoClear = false; // To allow render overlay on top of sprited sphere
						viewport.appendChild( renderer.domElement );

						// SCENE
						scene = new THREE.Scene();

						// CAMERA
						camera = new THREE.PerspectiveCamera( scope.view.viewpoint.fov, ( width / height) , scope.view.viewpoint.near, scope.view.viewpoint.far );
						camera.position.fromArray(scope.view.viewpoint.camera);
						camera.name = "Scene Camera";
						scene.add(camera);
	
						// CONTROLS
						// Use TrackballControls for interaction
						controls = new THREE.TrackballControls(camera, renderer.domElement);
						// Use OrbitControls for autoRotate
						playback = new THREE.OrbitControls(camera, renderer.domElement);
						playback.autoRotate = scope.view.controls.autoRotate;
						playback.autoRotateSpeed = scope.view.controls.autoRotateSpeed;
						// interaction FALSE so as not to conflict with controls
						playback.enableZoom = false;
						playback.enableRotate = false;
						playback.enablePan = false;
						playback.enableKeys = false;
						
						// AXIS
						// TODO: Make local axisHelper
						var axisHelper = new THREE.AxesHelper( scope.view.settings.axis.size );
						axisHelper.visible = scope.view.settings.axis.visible;
						axisHelper.name = "Axis";
						scene.add( axisHelper );

						// LIGHTS
						// Ambient
						var ambientColor = scope.view.settings.lighting.ambient;
						ambientLight = new THREE.AmbientLight(ambientColor);
						ambientLight.name = "Scene Ambient Light";
						scene.add(ambientLight);
						
						// Point
						var pointColor = scope.view.settings.lighting.color;
						var pointIntensity = scope.view.settings.lighting.intensity;
						pointLight = new THREE.PointLight(pointColor, pointIntensity);
						pointLight.name = "Scene Light";
						camera.add(pointLight);
						
						if(typeof scope.currentmodel.data !== 'undefined' && scope.currentmodel.data.length>0) {
							
							scope.complete_scene();
						
							// UPDATE CAMERA TARGET
							scope.centerScene();
													
	
							// EVENT LISTENERS / SCOPE WATCHERS
							// window.addEventListener( 'resize', scope.onWindowResize, false );
	
							/* Watch for changes */
	
							// var componentOptions = [
							// 	 'view.settings.particles.visible',
							// 	 'view.settings.chromatin.visible',
							// 	 'view.controls.autoRotate',
							// 	 'view.settings.axis.visible'
							// 	 ];
							// scope.$watchGroup( componentOptions, function( newValues, oldValues ) {
							// 	angular.forEach( newValues, function(value, index) {
							// 		if ( newValues[index] !== oldValues[index] ) {
							// 			console.log( value );
							// 		}
							// 	});
							// });
						}
						
						var lightOffset = cameraTranslate * 1.5; // Up and to the left
						pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
						//pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
						// Point Light Helper
						var sphereSize = 1000;
						var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
						//scene.add(pointLightHelper);
						
						// FOG SCENE
						var fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
							fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
						if (scope.view.viewpoint.fog) scene.fog = new THREE.Fog(background,fogNear,fogFar);
						

					// FIX: NOT REDRAWING SCENE IF THE ONLY VISBLE OBJECT IS TOGGLED OFF
						scope.$watch('view.controls.autoRotate', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								// playback.autoRotate = !playback.autoRotate;
								playback.autoRotate = scope.view.controls.autoRotate;
							}
						});
						scope.$watch('view.settings.axis.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								axisHelper.visible = !axisHelper.visible;
							}
						});
						scope.$watch('view.settings.particles.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								particles.visible = !particles.visible;
							}
						});
						scope.$watch('view.settings.chromatin.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								chromatin.visible = !chromatin.visible;
							}
						});
						scope.$watch('view.settings.cluster.visible', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								cluster.visible = !cluster.visible;
							}
						});
//						scope.$watch('view.settings.network.visible', function( newValue, oldValue ) {
//							if ( newValue !== oldValue ) {
//								network.visible = !network.visible;
//							}
//						});

						particlesObj = scene.getObjectByName( "Particles Cloud" );
						chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
						clusterObj = scene.getObjectByName( "Cluster View" );
						//networkObj = scene.getObjectByName( "Network Graph" );
						

						// /* Watch for Particles colors */
						scope.$watch('currentoverlay.colors.particles', function( newColors, oldColors ) { // cant deep watch as change through set on service
							if ( newColors !== oldColors ) {
								// var particleCount = particlesObj.children.length;
								// for (var i = 0; i < particleCount; i++) {
								// 	var newParticleColor =  new THREE.Color(newOverlay.colors.particles[i]);
								// 	particlesObj.children[i].material.color = newParticleColor;
								// }
							}
						});
						
						// /* Watch chromatin radius scale
						scope.$watch('data.object.radius_scale', function( newValue, oldValue ) {
							if ( newValue !== oldValue ) {
								if(typeof scope.currentmodel.data === 'undefined' || scope.currentmodel.data.length === 0) return;
								scope.toggleTubed(true);
							}
						});
						
						// /* Watch for Chromatin colors */
						scope.$watch('currentoverlay.colors.chromatin', function( newColors, oldColors ) { // cant deep watch as change through set on service
							if ( typeof chromatinObj !== 'undefined' && newColors !== oldColors) {
//								if(scope.view.settings.chromatin.tubed && scope.currentoverlay.object.state.overlaid) {
//									scope.toggleTubed(false);
//								} 
//								if(!scope.view.settings.chromatin.tubed && !scope.currentoverlay.object.state.overlaid) {
//									scope.toggleTubed(true);
//								}
								var i,j,k,newChromatinColor;
								var chromatinCount = chromatinObj.children.length;
								if(!scope.view.settings.chromatin.tubed) {
									for (i = 0; i < chromatinCount; i++) {
										newChromatinColor =  new THREE.Color(newColors[i]);
										chromatinObj.children[i].material.color = newChromatinColor;
										chromatinObj.children[i].material.ambient = newChromatinColor;
										chromatinObj.children[i].material.emissive = newChromatinColor;
									}
								} else {
									var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
									//var offset = 0;
									var colori = 0;
									//var chr_bins;
									var simple_chrom_colors = ['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF','#C0C0C0','#808080','#800000','#808000','#008000','#800080','#008080','#000080','#A52A2A','#E9967A','#B8860B','#FFFF00','#006400','#98FB98','#2F4F4F','#40E0D0','#4682B4','#87CEFA','#DC143C','#FFD700','#F0E68C','#7CFC00','#00FF00','#00FF7F','#3CB371','#00FFFF','#AFEEEE','#6495ED','#87CEEB'];
									var geom;
									var partFaces, segFaces;
									for (var l = 0 ; l < scope.settings.current.chromosomeIndexes.length; l++) {
										//chr_bins = Math.round((scope.settings.current.chromEnd[l]-scope.settings.current.chromStart[l])/resolution)+1;
										geom = chromatinObj.children[l].geometry;
										partFaces = scope.settings.current.facesParticle[l];
										for (i = 0; i < partFaces.length; i++) {
											for (j = 0; j < scope.settings.current.particleSegments; j++) {
												colori = i*scope.settings.current.particleSegments+j;
												if(scope.settings.current.chromosomeIndexes.length > 1) newColors[colori] = simple_chrom_colors[l];
												if(ColorConvert.testIfHex(newColors[colori]) || newColors[colori].indexOf('#')===0) {
													newChromatinColor =  new THREE.Color(newColors[colori]);	 
												} else {
													newChromatinColor =  new THREE.Color(ColorConvert.nameToHex(newColors[colori]));
												}
												for (k = partFaces[i][0]; k <= partFaces[i][1]; k++) {	 
													if(typeof geom.faces[k] !== 'undefined') geom.faces[k].color.set(newChromatinColor);
												}
											}
										}
										
										geom.colorsNeedUpdate = true;
										//offset += chr_bins;
							    	}
									
								}
							}
						});
						scope.toggleTubed = function(tubed) {
							scope.clean_scene();
							scope.view.settings.chromatin.tubed = tubed;
						    scope.complete_scene();
						    if(scope.view.settings.chromatin.tubed) {
						        sphereObj = scene.getObjectByName( "TADs cloud" );
							}
							
							particlesObj = scene.getObjectByName( "Particles Cloud" );
							chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
							clusterObj = scene.getObjectByName( "Cluster View" );
							//networkObj = scene.getObjectByName( "Network Graph" );
						};
						scope.redraw_scene = function() {
							
							if(typeof scope.currentmodel.data === 'undefined' || scope.currentmodel.data.length === 0) return;
						
							scope.clean_scene();
							var chrom_colors = scope.currentoverlay.colors.chromatin.slice();
							scope.currentoverlay.colors.chromatin = chrom_colors;
						    Overlays.segment();
							scope.complete_scene();
							
						    if(scope.view.settings.chromatin.tubed) {
						        sphereObj = scene.getObjectByName( "TADs cloud" );
							}
							
							particlesObj = scene.getObjectByName( "Particles Cloud" );
							chromatinObj = scene.getObjectByName( "Chromatin Fiber" );
							clusterObj = scene.getObjectByName( "Cluster View" );
							//networkObj = scene.getObjectByName( "Network Graph" );

							scope.centerScene();
							
							var lightOffset = cameraTranslate * 1.5; // Up and to the left
							pointLight.position.set(lightOffset,lightOffset,(lightOffset * -1.0));
							// FOG SCENE
							var fogNear = cameraTranslate * scope.view.viewpoint.fogNear,
								fogFar = cameraTranslate * scope.view.viewpoint.fogFar;
							scene.fog.near = fogNear;
							scene.fog.far = fogFar;
						
						};
						scope.$watch('settings.current.chromosomeIndexes', function( newValue, oldValue ) {
							if ( newValue !== oldValue) {
								//scope.currentmodel.data = Datasets.getModel().data;
								scope.redraw_scene();
							}
						});
						// /* Watch for selected TAD */
						scope.$watch('settings.current.tad_selected', function( newValue, oldValue ) {
							//if(scope.view.settings.chromatin.tubed) return;
							if ( newValue !== oldValue && chromatinObj) {
								var i;
								if(scope.view.settings.chromatin.tubed) {
									var tadCount = sphereObj.children.length;
									var newColor = new THREE.Color( 0xff0000 );
									var oldColor = new THREE.Color( 0x000000 );
									for (i = 0; i < tadCount; i++) {
										if(i==scope.settings.current.tad_selected) {
											sphereObj.children[i].material.opacity = 0.2;
											sphereObj.children[i].material.emissive.set( newColor );
											
										} else {
											if(newValue == -1) {
												sphereObj.visible = false;
											} else {
												sphereObj.visible = true;
												sphereObj.children[i].material.opacity = 0.3;
												sphereObj.children[i].material.color.set(oldColor);
												sphereObj.children[i].material.emissive.set(oldColor);
											}
										}
										sphereObj.children[i].geometry.colorsNeedUpdate = true;
										
									}
									
								} else {
									var chromatinCount = chromatinObj.children.length;
									var start_tad, end_tad;
									var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments; // base pairs
									if(newValue>-1) {
										start_tad = (Math.round(((scope.data.tad_data.tads[newValue][1])-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution))*scope.settings.current.particleSegments;
				                		end_tad = (Math.round((scope.data.tad_data.tads[newValue][2]-scope.settings.current.chromStart[scope.settings.current.chromIdx])/resolution))*scope.settings.current.particleSegments;
				                 	}
									for (i = 0; i < chromatinCount; i++) {
										if(i>=start_tad && i<end_tad) {
											chromatinObj.children[i].material.opacity = 1;
										} else {
											if(newValue == -1) chromatinObj.children[i].material.opacity = 1;
											else chromatinObj.children[i].material.opacity = 0.5;
										}
										
									}
								}
							}
						});

						// /* Watch for Network colors */
//						scope.$watch('currentoverlay.colors.network', function( newColors, oldColors ) { // cant deep watch as change through set on service
//							if ( newColors !== oldColors && networkObj.geometry) {
//								networkObj.geometry.addAttribute( 'color', new THREE.BufferAttribute( newColors.RGB, 3 ) );
//								networkObj.geometry.addAttribute( 'alpha', new THREE.BufferAttribute( newColors.alpha, 1 ) );
//							}
//						});

						/* Watch for Browser-wide Position updates */
						scope.$watch('settings.current.particle', function( newParticle, oldParticle ) {
							if ( newParticle !== oldParticle) {
								if(particlesObj) {
									// SET PARTICLE CURSOR COLOR
									if (particleOriginalColor) particlesObj.geometry.colors[(oldParticle - 1)] = particleOriginalColor;
									particleOriginalColor = particlesObj.geometry.colors[(newParticle - 1)];
									particlesObj.geometry.colors[(newParticle - 1)] = highlightColor;
									particlesObj.geometry.colorsNeedUpdate = true;
								}
							}
						});
						scope.updateRingPosition = function(ring,newSegment,oldSegment) {
							var newChrom=0;
							var oldChrom=0;
							var newSeg;
							var oldSeg;
							var vec, i;
							var chr_bins;
							var resolution = scope.settings.current.segmentLength*scope.settings.current.particleSegments;
							var newPart, oldPart;
							if(newSegment.length>1) {
								newSeg = newSegment[0];
								oldSeg = oldSegment[0];
								newChrom = newSegment[1];
								oldChrom = oldSegment[1];
								newPart = Math.floor(newSeg/scope.settings.current.particleSegments);
								oldPart = Math.floor(oldSeg/scope.settings.current.particleSegments);
							} else {
								newSeg = newSegment;
								oldSeg = oldSegment;
								newPart = Math.floor(newSeg/scope.settings.current.particleSegments);
								oldPart = Math.floor(oldSeg/scope.settings.current.particleSegments);
								chr_bins = Math.round(scope.settings.current.chromEnd[newChrom]/resolution)-Math.round(scope.settings.current.chromStart[newChrom]/resolution);
				            	while(chr_bins-1<newPart) {
				            		newPart -= chr_bins;
				            		newSeg -= chr_bins*scope.settings.current.particleSegments;
				            		newChrom++;
				            		chr_bins = Math.round(scope.settings.current.chromEnd[newChrom]/resolution)-Math.round(scope.settings.current.chromStart[newChrom]/resolution);
				            	}
				            	chr_bins = Math.round(scope.settings.current.chromEnd[oldChrom]/resolution)-Math.round(scope.settings.current.chromStart[oldChrom]/resolution);
				            	while(chr_bins-1<oldPart) {
				            		oldPart -= chr_bins;
				            		oldSeg -= chr_bins*scope.settings.current.particleSegments;
				            		oldChrom++;
				            		chr_bins = Math.round(scope.settings.current.chromEnd[oldChrom]/resolution)-Math.round(scope.settings.current.chromStart[oldChrom]/resolution);
				            	}
							}
							/*if(chromatinObj.children[newChrom].geometry.vertices.length > (newSeg+1)*8+8) {
								
								vec = chromatinObj.children[newChrom].geometry.vertices[(newSeg+1)*8];
								
									for(i=1;i<8;i++){
										vec.add(chromatinObj.children[newChrom].geometry.vertices[(newSeg+1)*8+i]);
									}
									vec.divideScalar(8);
								
								
								ring.position.x = vec.x;
								ring.position.y = vec.y;
								ring.position.z = vec.z;
								
								vec = chromatinObj.children[oldChrom].geometry.vertices[oldSeg*8];
								for(i=1;i<8;i++){
									vec.add(chromatinObj.children[oldChrom].geometry.vertices[oldSeg*8+i]);
								}
								vec.divideScalar(8);
								ring.lookAt(vec);
							}*/
							vec = new THREE.Vector3(0,0,0);
							if(scope.settings.current.facesParticle.length <= newChrom ||
									scope.settings.current.facesParticle[newChrom].length <= newPart) return;
							var partFaces = scope.settings.current.facesParticle[newChrom][newPart];
							var segPos = ((newSeg-newPart*scope.settings.current.particleSegments))/scope.settings.current.particleSegments;
							var vertice = Math.round(((partFaces[1]-partFaces[0])*segPos+partFaces[0])/2);
							if(vertice < 1) return;
							for(i=0;i<8;i++){
								if(chromatinObj.children[newChrom].geometry.vertices.length > vertice+i) vec.add(chromatinObj.children[newChrom].geometry.vertices[vertice+i]);
							}
							vec.divideScalar(8);
							
							ring.position.x = vec.x;
							ring.position.y = vec.y;
							ring.position.z = vec.z;
							
							vec = new THREE.Vector3(0,0,0);
							if(scope.settings.current.facesParticle.length <= oldChrom) return;
							partFaces = scope.settings.current.facesParticle[oldChrom][oldPart];
							segPos = ((oldSeg-oldPart*scope.settings.current.particleSegments))/scope.settings.current.particleSegments;
							vertice = Math.round(((partFaces[1]-partFaces[0])*segPos+partFaces[0])/2);
							
							/*if(middleSegment+8 < chromatinObj.children[newChrom].geometry.vertices.length) {
								middleSegment += 8;
							} else {
								middleSegment -= 8;
							}*/
							for(i=0;i<8;i++){
								if(chromatinObj.children[oldChrom].geometry.vertices.length > vertice+i) vec.add(chromatinObj.children[oldChrom].geometry.vertices[vertice+i]);
							}
							vec.divideScalar(8);
							
							ring.lookAt(vec);
							
							return;
						};
					};
					/* Watch for Browser-wide Position updates */
					scope.$watch('settings.current.segment', function( newSegment, oldSegment ) {
						if ( typeof ring !== 'undefined' && (newSegment !== oldSegment || (ring.position.x === 0 && ring.position.y === 0 && ring.position.z === 0))) {
							//if(scope.view.settings.chromatin.tubed) return;
							if(scope.view.settings.chromatin.tubed) {
								scope.updateRingPosition(ring,newSegment,oldSegment);
								
							}
							// SET CHROMATIN CURSOR COLOR

							var segmentPrevious = chromatinObj.getObjectByName( "segment-" + oldSegment );
							if (positionOriginalColor && segmentPrevious) {
								segmentPrevious.material.color = positionOriginalColor;
								segmentPrevious.material.ambient = positionOriginalColor;
								segmentPrevious.material.emissive = positionOriginalColor;
							}

							var segmentCurrent = chromatinObj.getObjectByName( "segment-" + newSegment );
							if(segmentCurrent) {
								positionOriginalColor = segmentCurrent.material.color;

								segmentCurrent.material.color = highlightColor;
								segmentCurrent.material.ambient = highlightColor;
								segmentCurrent.material.emissive = highlightColor;
							}
						}
					});
					scope.$watch('settings.current.markers_position', function( newValue, oldValue ) {
						if ( newValue !== oldValue && chromatinObj) {
							if(scope.view.settings.chromatin.tubed) {
								if ( angular.isUndefined(scope.settings.current.markers_position) || newValue[0] === -1 || newValue[1] === -1) {	
									leftring.visible = false;
									rightring.visible = false;
									linker.visible = false;
									scene.remove(linker_label);
									linker_label = undefined;
					        	} else {
					        		var newLeftPos = Settings.getSegment(scope.settings.current.markers_position[1]);
									var newRightPos = Settings.getSegment(scope.settings.current.markers_position[0]);
									
									var oldLeftPos = newLeftPos>0 ? newLeftPos-1 : 0;
									var oldRightPos = newRightPos>0 ? newRightPos-1 : 0;

					        		scope.updateRingPosition(leftring,[newLeftPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[1])], [oldLeftPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[1])]);
									scope.updateRingPosition(rightring,[newRightPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[0])], [oldRightPos,scope.settings.current.chromosomeIndexes.indexOf(scope.settings.current.markers_chr[0])]);
									leftring.visible = true;
									rightring.visible = true;
									linker.visible = true;
									linker.geometry.computeLineDistances();
									linker.geometry.verticesNeedUpdate = true;

									
					        	}
					        }
						}
					});
					// -----------------------------------
					// Event listeners
					// -----------------------------------
					
					scope.onWindowResize = function () {
						scope.resizeCanvas();
					};

					// -----------------------------------
					// Updates
					// -----------------------------------
					scope.resizeCanvas = function () {

						contW = parseInt(scope.state.width);
						contH = parseInt(scope.state.height);
						
						camera.aspect = contW / contH;
						camera.updateProjectionMatrix();

						renderer.setSize( contW, contH  );
					};

					scope.lookAtTAD = function (position, target, translate) {
							position = position || new THREE.Vector3( 50000, 50000, 50000 );
							var origin = new THREE.Vector3(0,0,0);
							target = target || origin;
							translate = translate || 500;
							// Target on Origin and Translate back
							// (creates consistent view orientation)
							camera.position.set(position.x, position.y, position.z);
							camera.lookAt(origin);
							camera.translateY(translate);
							playback.target = target;
							// Retarget on target
							camera.lookAt(target);
							camera.updateMatrixWorld();
							// Controls target
							controls.target.copy(position);
					};

					// -----------------------------------
					// Draw and Animate
					// -----------------------------------
					scope.animate = function () {
						requestAnimationFrame( scope.animate );
						playback.update();
						controls.update();
						scope.render();
					};

					scope.render = function () {
						renderer.render( scene, camera );
					};

					scope.clean_scene = function () {
						var i;
						
						if(typeof chromatinObj === 'undefined') return;
							
						scene.remove(leftring);
						scene.remove(rightring);
						scene.remove(ring);
						scene.remove(linker);
						scene.remove(particles);
				        scene.remove(chromatin);
				        scene.remove(cluster);
				        //scene.remove(network);
				        scene.remove(particlesObj);
				        scene.remove(chromatinObj);
				        scene.remove(clusterObj);
				        //scene.remove(networkObj);
				        
				        particles.geometry.dispose();
				        particles.material.dispose();
				        particlesObj.geometry.dispose();
				        particlesObj.material.dispose();
				        
				        if(!scope.view.settings.chromatin.tubed) {
									
					        for(i=0;i<chromatin.children.length;i++) {
					        	chromatin.children[i].geometry.dispose();
					        	chromatin.children[i].material.dispose();
					        	chromatinObj.children[i].geometry.dispose();
					        	chromatinObj.children[i].material.dispose();
					        	
					        }
					    } else {
					    	scene.remove(spheres);
					    	scene.remove(sphereObj);
					    	for(i=0;i<spheres.children.length;i++) {
					        	spheres.children[i].geometry.dispose();
					        	spheres.children[i].material.dispose();
					        	sphereObj.children[i].geometry.dispose();
					        	sphereObj.children[i].material.dispose();
					        	
					        }
					        spheres = undefined;
					        sphereObj = undefined;
					    }
					    for(i=0;i<cluster.children.length;i++) {
				        	cluster.children[i].geometry.dispose();
				        	cluster.children[i].material.dispose();
				        	clusterObj.children[i].geometry.dispose();
				        	clusterObj.children[i].material.dispose();
				        	
				        }  
				        // for(i=0;i<network.children.length;i++) {
				        // 	network.children[i].geometry.dispose();
				        // 	network.children[i].material.dispose();
				        // 	networkObj.children[i].geometry.dispose();
				        // 	networkObj.children[i].material.dispose();
				        	
				        // }     
				        leftring = undefined;
				        rightring = undefined;
				        ring = undefined;
				        linker = undefined;
				        particles = undefined;
				        particlesObj = undefined;
				        chromatinObj = undefined;
				        chromatin = undefined;
				        cluster = undefined;
				        clusterObj = undefined;
				        //network = undefined;
				        //networkObj = undefined;
				        
					};
				    scope.$on('$destroy', function() {
				        scope.clean_scene();
				    });

				    scope.takeScreenshot = function() {

				        var a = document.createElement('a');
				        // Without 'preserveDrawingBuffer' set to true, we must render now
				        renderer.render(scene, camera);
				        a.href = renderer.domElement.toDataURL().replace("image/png", "image/octet-stream");
				        a.download = 'model-screenshot.png';
				        a.click();
				    
				        
				    };
					/*function onDocumentMouseDown( event ) {

						event.preventDefault();
						mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
						mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
						raycaster.setFromCamera( mouse, camera );
						var intersects = raycaster.intersectObjects(array_spheres);
						if ( intersects.length > 0 ) {
							intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

						}
					}*/
				    
					// Begin
					scope.init();
					scope.animate();
				// });
			}
		};
	}
})();

(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackBarchart', tkComponentTrackBarchart);

	function tkComponentTrackBarchart(d3Service, Settings) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.d3().then(function(d3) {

					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;

					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = 10,
						nodePadding = 0,
						nodeColor = scope.view.settings.color,
						harmonicsColor = scope.overlay.palette[0],
						lowerBoundsColor = scope.overlay.palette[1];

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var xScale, yScale, axisX, axisY, brush, chart;
					var defs, focus, zoomArea, container, axis, labels, harmonics, lowerBounds, highlight;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW
					scope.$watch('data.dimension', function(newData, oldData) {
						if (newData !== oldData ) {
							data = scope.data;
							scope.render(data);
						}
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.getColor = function(code) {
						var colorCodes = [
											{"type":"harmonic","code":"H","color":"#4CAF50"},
											{"type":"upperBound","code":"L","color":"#0000ff"},
											{"type":"lowerBound","code":"U","color":"#ff00ff"},
											{"type":"contact","code":"C","color":"#00ff00"}
										];
						var color = "#ccc";
						for (var i = colorCodes.length - 1; i >= 0; i--) {
							if (code == colorCodes[i].code) {
								color = colorCodes[i].color;
							}
						}
						return color;
					};

					scope.getOpacity = function(value) {
						var opacity;
						var scaled = value / 5; // 5 being the limit...
						opacity = scaled * scaled;
						return opacity;
					};

					scope.getStrokeWidth = function(value) {
						var strokeWidth = 10;
						var scaled = value / 5; // 5 being the limit...
						strokeWidth = strokeWidth * scaled;
						return strokeWidth;
					};

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.top - margin.bottom;
						var verticalOffset = height * 0.5;
						var particleWidth = (1 * width) / particlesCount;
						var barWidth = particleWidth;

						// var y0 = Math.max(Math.abs(d3.min(data)), Math.abs(d3.max(data)));

						xScale = d3.scale.linear()
								.range([0, width])
								.domain([focusStart, focusEnd])
								.clamp(true);

						yScale = d3.scale.linear()
								.domain([-5, 5])
								.range([0, height]);

						axisY = d3.svg.axis()
								.scale(yScale)
								.orient("left")
								.ticks(6)
								.outerTickSize(1);

						var highlightWidth = 2;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								.call(brush);
								// .call(zoom);
						
						chart.append("g")
							.attr("class", "y axis")
							.append("line")
							.attr("y1", yScale(0))
							.attr("y2", yScale(0))
							.attr("x1", 0)
							.attr("x2", width);


						chart.select(".background")
							.attr("y", height/2)
							.attr("height", height);

						// clipping box to clip overflow
						// solid rect as background also allow mouse events everywhere 
						defs = chart.append("defs")
							.append("clipPath")
							.attr("id", "clip")
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.style('fill', 'white');

						focus = chart.append("g")
							.attr("class", "focus");

						// zoomArea = focus.append("g")
						// 	.attr("class", "zoom")
						// 	.append("rect")
						// 	.attr("width", width)
						// 	.attr("height", height)
						// 	.style('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', 'url(#clip)');
						harmonics  = container.append("g")
							.attr("class", "harmonics");
						lowerBounds  = container.append("g")
							.attr("class", "lowerbounds");

						axis = focus.append("g")
							.attr("class", "axis y")
							.call(axisY);

						labels  = chart.append("g")
							.attr("class", "labels");

						// if (scope.view.viewtype == "default") {
							harmonics.selectAll("rect") // RED
								.data(data.harmonics)
								.enter().append("rect")
								.attr("x", function(d) { return (d[1] * barWidth); } )
								.attr("y", function(d) { return yScale( d[3] ); } )
								.attr("width", barWidth)
								.attr("height", function(d) { return yScale( d[3] ); })
								.style("fill", harmonicsColor)
								// .style("fill-opacity", function(d) { return scope.getOpacity(d[3]); })
								.style("stroke", harmonicsColor)
								.style("stroke-width", 0)
								.append("svg:title")
									.text(function(d,i) { return i + ":" + d; });

							lowerBounds.selectAll("rect") // BLUE
								.data(data.lowerBounds)
								.enter().append("rect")
								.attr("x", function(d) { return (d[1] * barWidth); } )
								.attr("y", function(d) { return yScale( Math.max(0, (d[3] * -1.0))); } )
								.attr("width", barWidth)
								.attr("height", function(d) { return yScale( d[3] ); })
								.style("fill", lowerBoundsColor)
								// .style("fill-opacity", function(d) { return scope.getOpacity(d[3]); })
								.style("stroke", lowerBoundsColor)
								.style("stroke-width", 0)
								.append("svg:title")
									.text(function(d,i) { return i + ":" + d; });

						// }

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.current.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
						// highlight
						// 	.call(brush.extent([(scope.settings.current.position), 0]))
						// 	.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position ); } );
					};

					// BRUSH
					scope.brushed = function() {

						// scope.safeApply( function() {
							var thisTrack = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisTrack)[0]));
									brush.extent([value, value]);
								}
								highlight.attr("x", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

					// Initial render
					scope.render(data);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentBedgraph', tkComponentBedgraph);

	function tkComponentBedgraph(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					// var assemblyLength = 3200000000; // CALCULATE
					// if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var step = scope.view.settings.step;
					var stepWidth;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					// var chrStart = 0;
					// var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					// var highlightPosition = focusStart + (stepWidth * scope.settings.current.position);

					// var focusScale = assemblyLength / focusLength;
					// var focusMargin = focusScale * 0.05;
					// focusScale = focusScale - (focusMargin * 2.0);
		
					// var focusCenter = focusLength * 0.5;
					// var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE implies complete redraw
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW on new data
					// scope.$watch('data', function(newData) {
					// 	scope.render(newData);
					// }, true);
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newData) {
						scope.update();
					}, true);

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;
							stepWidth = (step * width) / focusLength;
							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //stepWidth;// * width / focusLength;
							// if (highlightWidth < 4) highlightWidth = 4; 
							// var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

							chart = svg.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
									// .call(zoom);
							
							// clipping box to clip overflow
							// solid rect as background also allow mouse events everywhere 
							defs = chart.append("defs")
								.append("clipPath")
								.attr("id", "clip")
								.append("rect")
								.attr("width", width)
								.attr("height", height)
								.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.style('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							// chart.select(".focus").append("g")
							// 	.attr("class", "x axis")
							// 	.attr("transform", "translate(0," + nodeHeight + ")");
								// .call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");

							// TODO: Use FontAwesome/IcoMoon...
							// node.append('text')
							//     .attr('font-family', 'FontAwesome')
							//     .attr('font-size', function(d) { return d.size+'em'} )
							//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
								.attr("x", function(d, i) { return Math.floor(xScale(d.start)); } )
								.attr("y", verticalOffset)
								.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); })
								.attr("height", nodeHeight)
								.attr("class", function(d) { if (d.read == 1) return scope.title; } )
								// .style("fill", nodeColor)
								// .style("fill-opacity", function(d) { return d.read; })
								// .style("stroke", nodeColor)
								// .style("stroke-width", 0)
								.append("svg:title")
								.text(function(d,i) { return d.start + ":" + d.end + "(" + d.read + ")"; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						// 	var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
						// 		height = trackHeight - margin.top - margin.bottom;
						// 	stepWidth = (step * width) / focusLength;

						// svg.select("g.x.axis").call(xAxis);
						// container.selectAll("rect")
						// .attr("x", function(d, i) { return (i + 1) * stepWidth; } )	
						// .attr("y", verticalOffset)
						// .attr("width", stepWidth)
						// .attr("height", nodeHeight);

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } );
					};
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackGenes', tkComponentTrackGenes);

	function tkComponentTrackGenes(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					var assemblyLength = 3200000000; // CALCULATE
					if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var positions = 100; //scope.positions; // == ?
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var chrStart = 0;
					var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					var positionWidth = 1000; //focusLength / positions; // derive from...?
					// var highlightPosition = focusStart + (positionWidth * scope.settings.current.position);

					var focusScale = assemblyLength / focusLength;
					var focusMargin = focusScale * 0.05;
					focusScale = focusScale - (focusMargin * 2.0);
		
					var focusCenter = focusLength * 0.5;
					var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = 10,
						nodePadding = 0;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW
					scope.$watch('data', function(newData, oldData) {
						if ( newData !== oldData ) {
							scope.render(newData);
						}
					});
					// }, true); // FOR DEEP WATCH
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;

							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //positionWidth * width / focusLength;
							// if (highlightWidth < 1) highlightWidth = 1; 
							var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

							chart = svg.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
									// .call(zoom);
							
							// clipping box to clip overflow
							// solid rect as background also allow mouse events everywhere 
							defs = chart.append("defs")
								.append("clipPath")
								.attr("id", "clip")
								.append("rect")
								.attr("width", width)
								.attr("height", height)
								.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.style('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							var axis = focus.append("g")
								.attr("class", "x axis")
								.attr("transform", "translate(0," + nodeHeight + ")")
								.call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 8)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text("<<");
								labels.append("text")
									.attr("x", -18)
									.attr("y", 18)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text(">>");
// TODO: Use FontAwesome/IcoMoon...
// node.append('text')
//     .attr('font-family', 'FontAwesome')
//     .attr('font-size', function(d) { return d.size+'em'} )
//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
								.attr("x", function(d) { return Math.floor(xScale(d.start)); } )
								.attr("y", function(d) { if (scope.view.settings.sense) { if (d.strand < 1) {return (nodeHeight);} else {return 0;} } else {return 0;} } )
								.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); } )
								.attr("height", function(d) { if (scope.view.settings.sense) {return (nodeHeight);} else {return (nodeHeight * 2);} }  )
								.attr("class", function(d) {
									var biotypeClass = d.biotypeStyle;
									if (d.strand < 1) {biotypeClass += " forward-strand";}
									else {biotypeClass += " reverse-strand";}
									return biotypeClass; } )
								.append("svg:title")
								.text(function(d) { return d.external_name; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (positionWidth * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						svg.select("g.x.axis").call(xAxis);
						container.selectAll("rect")
						.attr("x", function(d) { return Math.floor(xScale(d.start)); } )	
						.attr("y", function(d) { if (scope.view.settings.sense) { if (d.strand < 1) {return (nodeHeight);} else {return 0;} } else {return 0;} } )
						.attr("width", function(d) { return Math.ceil(xScale(d.end) - xScale(d.start)); } )
						.attr("height", function(d) { if (scope.view.settings.sense) {return (nodeHeight);} else {return (nodeHeight * 2);} }  );

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position - (positionWidth * 0.5)); } );
					};
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackProximities', tkComponentTrackProximities);

	function tkComponentTrackProximities(d3Service, Settings) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.d3().then(function(d3) {

					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

					// save data matrix for re-slicing as position changes
					// scope.dataMatrix = scope.data;

					// FYI: data == distances
					// eg. particles a=rst,b=uvw,c=xyz
					// give matrix [aa,ab,ac,ba,bb,bc,ca,cb,cc]
					// can be filtered by no. of particles
					// totalMatrixVertices / (totalParticeles * 3)
 					var data = scope.data.distances;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;
					var clipPathUrl = "clip" + scope.title;
					var clipPath = "url(#" + clipPathUrl + ")";

					/* Note: focusLength may not be exactly particlesCount (N) * resolution
					 * BUT for now the last bin resolution is taken as equal to the others
					 * In the future TADbit may output variable bin resolutions
					 * eg. as an array of resolutions corresponding to the bins/particles
					 * Then the code commented below can be developed/completed
					 * to assess and assign the last index of data
					 * This may be better done externally to the track modules
					 * and the results accessed through, for example, view.settings.resolutions
					 */
					// var resolution = scope.view.resolution;
					// var particlesCount = focusLength / resolution;
					// var exactCount = function(particlesCount) { return parseInt(particlesCount) === particlesCount };
					// var resolutionParticleN = exactCount;
					// if (!exactCount) resolutionParticleN = focusLength - (resolution * (n-1));
					// var particles = Math.ceil(particlesCount);

					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var xScale, xAxis, brush, chart;
					var defs, focus, zoomArea, container, labels, focusGraph, highlight;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW
					scope.$watch('data.dimension', function(newData, oldData) {
						if (newData !== oldData ) {
							data = scope.data.distances;
							scope.render(data);
						}
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });


					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.top - margin.bottom;
						var particleWidth = (1 * width) / particlesCount;
						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);
				
						xAxis = d3.svg.axis()
								.scale(xScale)
								.orient("top")
								.ticks(0)
								.outerTickSize(0);

						var highlightWidth = 2;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								.call(brush);
								// .call(zoom);
						
						chart.select(".background")
							.attr("y", height/2)
							.attr("height", height);

						// clipping box to clip overflow
						// solid rect as background also allow mouse events everywhere 
						defs = chart.append("defs")
							.append("clipPath")
							.attr("id", clipPathUrl)
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.style('fill', 'white');

						focus = chart.append("g")
							.attr("class", "focus");

						// zoomArea = focus.append("g")
						// 	.attr("class", "zoom")
						// 	.append("rect")
						// 	.attr("width", width)
						// 	.attr("height", height)
						// 	.attr('fill', 'white');

						container = focus.append("g")
							.attr("class", "container")
							.attr('clip-path', clipPath);

						labels  = chart.append("g")
							.attr("class", "labels");
	
						focusGraph = container.selectAll("rect")
							.data(data)
							.enter().append("rect")
							.attr("x", function(d, i) { return (i * particleWidth); } )
							.attr("y", verticalOffset)
							.attr("width", particleWidth)
							.attr("height", nodeHeight)
							.style("fill", nodeColor)
							.style("fill-opacity", function(d) { return (d * d); })
							.style("stroke", nodeColor)
							.style("stroke-width", 0)
							.append("svg:title")
								.text(function(d,i) { return i + ":" + d; });

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", function(d) { return xScale( scope.settings.current.position); } )
								.attr("y", 0)
								.attr("width", highlightWidth )
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
						highlight
							.call(brush.extent([(scope.settings.current.position), 0]))
							.call(brush.event);
					};

					// UPDATE
					scope.update = function() {
						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position ); } );
					};

					// BRUSH
					scope.brushed = function() {

						// scope.safeApply( function() {
							var thisTrack = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisTrack)[0]));
									brush.extent([value, value]);
								}
								highlight.attr("x", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

					// Initial render
					scope.render(data);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackRestraints', tkComponentTrackRestraints);

	function tkComponentTrackRestraints(d3Service, Settings) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {

				d3Service.d3().then(function(d3) {

					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

 					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var focusLength = focusEnd - focusStart + 1; // Resrouces.range...
					var particlesCount = scope.settings.current.particlesCount;
					var clipPathUrl = "clip" + scope.title;
					var clipPath = "url(#" + clipPathUrl + ")";

					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						maxValue = 2,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeSize = scope.view.settings.nodeSize,
						verticalOffset = margin.top + (nodeSize * 0.5),
						nodePadding = 0,
						nodeColor = scope.view.settings.color,
						harmonicsColor = scope.overlay.palette[0],
						lowerBoundsColor = scope.overlay.palette[1];

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var xScale, axisUpper, axisLower, brush, chart;
					var defs, focus, zoomArea, container, labels, harmonics, lowerBounds, highlight;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(scope.data);
					});

					// REDRAW
					scope.$watch('data.dimension', function(newData, oldData) {
						if (newData !== oldData ) {
							data = scope.data;
							scope.render(data);
						}
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.getColor = function(code) {
						var colorCodes = [
											{"type":"harmonic","code":"H","color":"#4CAF50"},
											{"type":"upperBound","code":"L","color":"#0000ff"},
											{"type":"lowerBound","code":"U","color":"#ff00ff"},
											{"type":"contact","code":"C","color":"#00ff00"}
										];
						var color = "#ccc";
						for (var i = colorCodes.length - 1; i >= 0; i--) {
							if (code == colorCodes[i].code) {
								color = colorCodes[i].color;
							}
						}
						return color;
					};

					scope.getOpacity = function(value) {
						var opacity;
						var scaled = value / maxValue; // 5 being the limit...
						opacity = scaled * scaled;
						return opacity;
					};

					scope.getStrokeWidth = function(value) {
						var strokeWidth = 5;
						var scaled = value / 5; // 5 being the limit...
						strokeWidth = strokeWidth * scaled;
						return strokeWidth;
					};

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;

						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right;
						var height = trackHeight - margin.top - margin.bottom;
						var particleWidth = (1 * width) / particlesCount;
						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);
				
						axisUpper = d3.svg.axis()
								.scale(xScale)
								.orient("top")
								.ticks(0)
								.outerTickSize(0);

						axisLower = d3.svg.axis()
								.scale(xScale)
								.orient("bottom")
								.ticks(0)
								.outerTickSize(0);

						var highlightWidth = 2;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						chart = svg.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
								.call(brush);
								// .call(zoom);
						
						chart.select(".background")
							.attr("y", height/2)
							.attr("height", height);

						// clipping box to clip overflow
						// solid rect as background also allow mouse events everywhere 
						defs = chart.append("defs");

						defs.append("clipPath")
							.attr("id", clipPathUrl)
							.append("rect")
							.attr("width", width)
							.attr("height", height)
							.style('fill', 'white');

						// defs.append("svg:marker")
						// 	.attr("id", "harmonics-marker")
						// 	.attr("viewBox", "0 -3 8 6")
						// 	.attr("refX", 20)
						// 	.attr("refY", 0)
						// 	.attr("markerWidth", 8)
						// 	.attr("markerHeight", 6)
						// 	.attr("orient", "auto")
						//     .append('svg:path')
						// 		.attr('d', "M8,-3 L0,0 L8,6")
						// 		.attr("stroke", harmonicsColor)
						// 		.attr("stroke-width", 1) // get from line?
						// 		.attr('fill', "none");

						// defs.append("svg:marker")
						// 	.attr("id", "lowerbounds-marker")
						// 	.attr("viewBox", "0 -3 8 6")
						// 	.attr("refX", 8)
						// 	.attr("refY", 0)
						// 	.attr("markerWidth", 8)
						// 	.attr("markerHeight", 6)
						// 	.attr("orient", "auto")
						//     .append('svg:path')
						// 		.attr('d', "M0,-3 L8,0 L0,3")
						// 		.attr("stroke", lowerBoundsColor)
						// 		.attr("stroke-width", 1) // get from line?
						// 		.attr('fill', "none");

						focus = chart.append("g")
							.attr("class", "focus");

						harmonics = focus.append("g")
							.attr("class", "harmonics")
							.attr('clip-path', clipPath);

						lowerBounds = focus.append("g")
							.attr("class", "lowerbounds")
							.attr('clip-path', clipPath);

						labels  = chart.append("g")
							.attr("class", "labels");

							// HARMONICS
							// from:
							harmonics.append("rect")
								.attr("x", (data.dimension * particleWidth - (particleWidth)))
								.attr("y", verticalOffset - (nodeSize * 0.5))
								.attr("width", particleWidth)
								.attr("height", nodeSize)
								// .style("stroke", harmonicsColor)
								// .style("stroke-width", 1)
								.style("fill", harmonicsColor)
								.append("svg:title")
									.text(data.dimension);
							// connector:
							harmonics.selectAll("line")
								.data(data.harmonics)
								.enter()
								.append("line")
									.attr("x1", function(d) { return (d[0] * particleWidth - (particleWidth * 0.5)); })
									.attr("y1", verticalOffset)
									.attr("x2", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("y2", height - nodeSize)
									.attr("marker-end", "url(#harmonics-marker)")
									.style("stroke", harmonicsColor)
									.style("opacity", 1)//function(d) { return scope.getOpacity(d[3]); } )
									.style("stroke-width", function(d) { return scope.getStrokeWidth(d[3]); })
									.append("svg:title")
										.text(function(d) { return d[1] + ":" + d[3]; });
							// to:
							// harmonics.selectAll("polygon")
							// 	.data(data.harmonics)
							// 	.enter()
							// 	.append("polygon")
							// 		.attr("points", function(d) {
							// 			var x = (d[1] * particleWidth) - (particleWidth * 0.5);
							// 			var y = height;
							// 			var points = x+","+(y-nodeSize)+" "+(x+(nodeSize*0.5))+","+y+" "+(x-(nodeSize*0.5))+","+y;
							// 			return points;
							// 		} )
							// 		.attr("opacity", function(d) { return scope.getOpacity(d[3]); } )
							// 		.attr("fill", harmonicsColor)
							// 	.append("svg:title")
							// 		.text(function(d) { return d[1] + ":" + d[3]; });
							harmonics.selectAll("circle")
								.data(data.harmonics)
								.enter()
								.append("circle")
									.attr("cx", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("cy", height - nodeSize)
									.attr("r", (nodeSize * 0.5))
									.style("opacity", function(d) { return scope.getOpacity(d[3]); })
									.style("fill", harmonicsColor)
								.append("svg:title")
									.text(function(d) { return d[0] + " : " + d[1]; });

							// LOWERBOUNDS
							// from:
							lowerBounds.append("rect")
								.attr("x", (data.dimension * particleWidth - (particleWidth)))
								.attr("y", (height - (nodeSize * 1.5)))
								.attr("width", particleWidth)
								.attr("height", nodeSize)
								// .style("stroke", lowerBoundsColor)
								// .style("stroke-width", 1)
								.style("fill", lowerBoundsColor)
								.append("svg:title")
									.text(data.dimension);
							// connector:
							lowerBounds.selectAll("line")
								.data(data.lowerBounds)
								.enter()
								.append("line")
									.attr("x1", function(d) { return (d[0] * particleWidth - (particleWidth * 0.5)); })
									.attr("y2", verticalOffset)
									.attr("x2", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("y1", height - nodeSize)
									.attr("marker-end", "url(#lowerbounds-marker)")
									.style("stroke", lowerBoundsColor)
									.style("opacity", function(d) { return scope.getOpacity(d[3]); })
									.style("stroke-width", function(d) { return scope.getStrokeWidth(d[3]); })
									.append("svg:title")
										.text(function(d) { return d[1] + ":" + d[3]; });
							// to:
							// to:
							// lowerBounds.selectAll("polygon")
							// 	.data(data.lowerBounds)
							// 	.enter()
							// 	.append("polygon")
							// 		.attr("points", function(d) {
							// 			var x = (d[1] * particleWidth) - (particleWidth * 0.5);
							// 			var y = verticalOffset - nodeSize;
							// 			var points = x+","+y+" "+(x+(nodeSize*0.5	))+","+(y+nodeSize)+" "+(x-(nodeSize*0.5))+","+(y+nodeSize);
							// 			return points;
							// 		} )
							// 		.attr("opacity", function(d) { return scope.getOpacity(d[3]); } )
							// 		.style("fill", lowerBoundsColor)
							// 	.append("svg:title")
							// 		.text(function(d,i) { return d[1] + ":" + d[3]; });
							lowerBounds.selectAll("circle")
								.data(data.lowerBounds)
								.enter()
								.append("circle")
									.attr("cx", function(d) { return (d[1] * particleWidth - (particleWidth * 0.5)); })
									.attr("cy", verticalOffset)
									.attr("r", (nodeSize * 0.5))
									.style("opacity", function(d) { return scope.getOpacity(d[3]); })
									.style("fill", lowerBoundsColor)
								.append("svg:title")
									.text(function(d) { return d[0] + " : " + d[1]; });

						highlight = chart.append("rect")
								.attr("id", "highlight")
								.attr("x", xScale(scope.settings.current.position))
								.attr("y", 0)
								.attr("width", highlightWidth)
								.attr("height", trackHeight)
								.attr("class", "highlight-follow");
						// highlight
						// 	.call(brush.extent([(scope.settings.current.position), 0]))
						// 	.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position ); } );
					};

					// BRUSH
					scope.brushed = function() {

						// scope.safeApply( function() {
							var thisTrack = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisTrack)[0]));
									brush.extent([value, value]);
								}
								highlight.attr("x", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

					// Initial render
					scope.render(data);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentTrackSlider', tkComponentTrackSlider);

	function tkComponentTrackSlider(d3Service, Settings) {
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				// console.log(scope);

				d3Service.d3().then(function(d3) {
				
					scope.safeApply = function(fn) {
						var phase = this.$root.$$phase;
						if(phase == '$apply' || phase == '$digest') {
							if(fn && (typeof(fn) === 'function')) { fn(); }
						} else {
						this.$apply(fn);
						}
					};

					// SVG GENERATION
					var data = scope.data;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					var cursorWidth = scope.view.settings.cursorWidth;
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						trackHeight = parseInt(scope.view.settings.heightInner);

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
						// console.log(component.clientWidth);
					var viewport = element[0].children[0].children[3];
						// console.log(viewport.clientWidth);
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var slider, xScale, prime3Axis, prime5Axis;
					var handleWidth, handleHeight;
					var xAxis, brush, handle, position;

					// RESIZE
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render();
					});

					// UPDATE
					scope.$watch('settings.current.position', function(newPosition, oldPosition) {
						if ( newPosition !== oldPosition ) {
							scope.update();
						}
					});
					
 				// 	// ZOOM
					// var zoom = d3.behavior.zoom()
					// 	.on("zoom",  function() {
					// 	scope.update();
					// });

					scope.render = function() {
						svg.selectAll('*').remove();
						
						var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
							height = trackHeight - margin.bottom - margin.top;

						xScale = d3.scale.linear()
								.range([0, width])
								.clamp(true);

						xScale.domain([focusStart, focusEnd]);

						xAxis = d3.svg.axis()
								.scale(xScale)
								.orient("bottom")
								.ticks(4);
							prime3Axis = d3.svg.axis().orient("left");
							prime5Axis = d3.svg.axis().orient("right");
								// .outerTickSize([0]);

						handleWidth = height * 0.5;
						handleHeight = trackHeight;

						brush = d3.svg.brush()
							.x(xScale)
							.extent([0, 0])
							.on("brush", scope.brushed);

						slider = svg.attr("width", width + margin.left + margin.right)
								.attr("height", height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + ", " + 0 + ")");

							var labels  = slider.append("g")
								.attr("class", "labels");
								labels.append("text")
									.attr("x", -16)
									.attr("y", 26)
									.style("text-anchor", "right")
									.style("font-size", "10px")
									.text("3'");
								labels.append("text")
									.attr("x", width + 8)
									.attr("y", 26)
									.style("text-anchor", "left")
									.style("font-size", "10px")
									.text("5'");

						var axis = slider.append("g")
							.attr("class", "x axis")
							.attr("transform", "translate(0," + height + ")")
							.call(xAxis)
							.select(".domain")
							.select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
							.attr("class", "halo");

						slider.append("g")
							.attr("class", "slider")
							.call(brush);

						slider.select(".background")
							.attr("y", height/2)
							.attr("height", height);
							
						handle = slider.append("circle")
							.attr("id", "handle")
							.attr("class", "handle")
							.attr("cx", xScale(scope.settings.current.position))
							.attr("cy", height)
							.attr("r", handleWidth * 0.6);

						position = slider.append("text")
							.attr("id", "position")
							.attr("x", xScale(scope.settings.current.position) - (handleWidth * 0.5))
							.attr("y", height - 10)
							.style("text-anchor", "bottom")
							.style("font-family", "sans-serif")
							.style("font-size", "10px")
							.style("color", "#333")
							.text(scope.settings.current.particle);

						slider
							.call(brush.extent([(scope.settings.current.position), 0]))
							.call(brush.event);
					};

					// UPDATE
					scope.update = function(data) {
						svg.select("#handle") //.style("visibility", "hidden");
						.attr("cx", xScale(scope.settings.current.position) );
						svg.select("#position") //.style("visibility", "hidden");
						.attr("x", (xScale(scope.settings.current.position) - (handleWidth * 0.5)) )
						.text(scope.settings.current.particle);
					};

					// BRUSH
					scope.brushed = function() {
						// scope.safeApply( function() {
							var thisSlider = this;
							scope.safeApply( function() {
								var value = brush.extent()[0];
								if (d3.event.sourceEvent) {
									value = parseInt(xScale.invert(d3.mouse(thisSlider)[0]));
									brush.extent([value, value]);
								}
								handle.attr("cx", xScale(value));

								// UPDATE position
								scope.settings.current.position = value;
								scope.settings.current.particle = Settings.getParticle();
								scope.settings.current.segment = Settings.getSegment();
								scope.settings.current.segmentLower = scope.settings.current.position - (scope.settings.current.segment * 5); // * 0.5???
								scope.settings.current.segmentUpper = scope.settings.current.position + (scope.settings.current.segment * 5); // * 0.5???

							});
						// });
					};

				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkComponentWiggle0', tkComponentWiggle0);

	function tkComponentWiggle0(d3Service) {    
		return {
			restrict: 'EA',
			scope: {
				type: '=',
				title: '@',
				settings: '=',
				view: '=',
				data: '=',
				overlay: '=', /* used in template */
				toggleoverlay: '&' /* used in template */
			},
			templateUrl: 'assets/templates/track.html',
			link: function(scope, element, attrs) {
				d3Service.d3().then(function(d3) {
					// console.log(scope);

 					// DATA MANIPULATION >>> MOVE TO CONTROLLER
					var data = scope.data;
					// var assemblyLength = 3200000000; // CALCULATE
					// if (!scope.settings.current.position) scope.settings.current.position = assemblyLength / 2;
					var step = scope.view.settings.step;
					var stepWidth;
					var focusStart = scope.view.viewpoint.chromStart;
					var focusEnd = scope.view.viewpoint.chromEnd;
					// var chrStart = 0;
					// var chrEnd = assemblyLength;
					var focusLength = focusEnd - focusStart;
					// var highlightPosition = focusStart + (stepWidth * scope.settings.current.position);

					// var focusScale = assemblyLength / focusLength;
					// var focusMargin = focusScale * 0.05;
					// focusScale = focusScale - (focusMargin * 2.0);
		
					// var focusCenter = focusLength * 0.5;
					// var assemblyCenter = assemblyLength * 0.5;


					// SVG GENERATION
					var componentMargin = parseInt(scope.view.settings.margin);
					/* Rebuild margin to maintain D3 standard */
					var margin = {
							top: parseInt(scope.view.settings.padding.top),
							right: parseInt(scope.view.settings.padding.right),
							bottom: parseInt(scope.view.settings.padding.bottom),
							left: parseInt(scope.view.settings.padding.left)
						},
						scale = 4,
						trackHeight = parseInt(scope.view.settings.heightInner),
						nodeHeight = trackHeight * 0.5,
						verticalOffset = (trackHeight - nodeHeight) * 0.5,
						nodePadding = 0,
						nodeColor = scope.view.settings.color;

					// VIEWPORT
					/* component-controller == children[0]
					 * - component-header == children[0]
					 * - component-body == children[3]
					 */
					var component = element[0].parentNode;
					var viewport = element[0].children[0].children[3];
					// if with controller use line below
					// var viewport = element[0].children[0].children[3];
					var svg = d3.select(viewport).append('svg');
					var chart, defs;
					var xAxis, prime3Axis, prime5Axis;
					var focus, container, xScale;

					// RESIZE implies complete redraw
					scope.$watch(function(){
						var w = component.clientWidth;
						var h = component.clientHeight;
						return w + h;
					}, function() {
						scope.render(data);
					});

					// REDRAW on new data
					// scope.$watch('data', function(newData) {
					// 	scope.render(newData);
					// }, true);
 					
					// SLIDER
					scope.$watch('settings.current.position', function(newData) {
						scope.update();
					}, true);

 					// ZOOM
					var zoom = d3.behavior.zoom()
						.on("zoom",  function() {
						scope.update();
					});

					scope.render = function(data) {
						svg.selectAll('*').remove();
 
						if (!data) return;
 
							var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
								height = trackHeight - margin.top - margin.bottom;
							stepWidth = (step * width) / focusLength;
							xScale = d3.scale.linear()
									.range([0, width])
									.clamp(true);

							xScale.domain([focusStart, focusEnd]);
					
							xAxis = d3.svg.axis()
									.scale(xScale)
									.orient("top")
									.ticks(0)
									.outerTickSize(0);
							// prime3Axis = d3.svg.axis().orient("left"),
							// prime5Axis = d3.svg.axis().orient("right");

							var highlightWidth = 2; //stepWidth;// * width / focusLength;
							// if (highlightWidth < 4) highlightWidth = 4; 
							// var focusOffset = xScale(assemblyCenter) - xScale(focusCenter);

							chart = svg.attr('width', width + margin.left + margin.right)
									.attr('height', height + margin.top + margin.bottom)
									.append("g")
									.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
									// .call(zoom);
							
							// clipping box to clip overflow
							// solid rect as background also allow mouse events everywhere 
							defs = chart.append("defs")
								.append("clipPath")
									.attr("id", "clip")
								.append("rect")
									.attr("width", width)
									.attr("height", height)
									.style('fill', 'white');

							focus = chart.append("g")
								.attr("class", "focus");

							// var zoomArea = focus.append("g")
							// 	.attr("class", "zoom")
							// 	.append("rect")
							// 	.attr("width", width)
							// 	.attr("height", height)
							// 	.attr('fill', 'white');

							container = focus.append("g")
								.attr("class", "container")
								.attr('clip-path', 'url(#clip)');

							// zoom.x(xScale);

							// chart.select(".focus").append("g")
							// 	.attr("class", "x axis")
							// 	.attr("transform", "translate(0," + nodeHeight + ")");
								// .call(xAxis);

							var labels  = chart.append("g")
								.attr("class", "labels");

							// TODO: Use FontAwesome/IcoMoon...
							// node.append('text')
							//     .attr('font-family', 'FontAwesome')
							//     .attr('font-size', function(d) { return d.size+'em'} )
							//     .text(function(d) { return '\uf118' }); 

							var focusGraph = container.selectAll("rect")
								.data(data)
								.enter().append("rect")
									.attr("x", function(d, i) { return (i + 1) * stepWidth; } )
									.attr("y", verticalOffset)
									.attr("width", stepWidth)
									.attr("height", nodeHeight)
									.style("fill", nodeColor)
									.style("fill-opacity", function(d) { return d; })
									.style("stroke", nodeColor)
									.style("stroke-width", 0)
									.append("svg:title")
										.text(function(d,i) { return i + ":" + d; });

							var highlight = chart.append("rect")
									.attr("id", "highlight")
									.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } )
									.attr("y", 0)
									.attr("width", highlightWidth )
									.attr("height", trackHeight)
									.attr("class", "highlight-follow");
					};

					scope.update = function() {
						// 	var width = component.clientWidth - (2 * componentMargin) - margin.left - margin.right,
						// 		height = trackHeight - margin.top - margin.bottom;
						// 	stepWidth = (step * width) / focusLength;

						// svg.select("g.x.axis").call(xAxis);
						// container.selectAll("rect")
						// .attr("x", function(d, i) { return (i + 1) * stepWidth; } )	
						// .attr("y", verticalOffset)
						// .attr("width", stepWidth)
						// .attr("height", nodeHeight);

						svg.select("#highlight") //.style("visibility", "hidden");
						.attr("x", function(d) { return xScale( scope.settings.current.position - (step * 0.5)); } );
					};
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TrackController', TrackController);

	function TrackController($scope) {
		// if ($scope.overlay) {
		// 	// console.log($scope.overlay.object.id);
		// 	// console.log($scope.overlay.object.state.overlaid);
		// 	$scope.overlaid = $scope.overlay.object.state.overlaid;
		// 	$scope.overlayOrig = Overlays.getOverlay(); // current overlay
		// 	$scope.toggleOverlay = function(index) {
		// 		$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
		// 		if (!$scope.overlaid) {
		// 			Overlays.setOverlaid(index);
		// 			Overlays.set(index);
		// 		} else {
		// 			Overlays.setOverlaid($scope.overlayOrig.object.state.index);
		// 			Overlays.set($scope.overlayOrig.object.state.index);
		// 		}
		// 		$scope.overlaid = !$scope.overlaid;
		// 	};
		// }

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataImportController', DataImportController);

	function DataImportController ($state, $scope, $stateParams, $mdDialog, $mdToast, Settings, Datasets, Hic_data, Components, Storyboards, uuid4) {
		$scope.fileTitle = "No file loaded";
		$scope.func =  $stateParams.func;
		$scope.settings = Settings.get();
		$scope.dataset = Datasets.getDataset();
		$scope.resolution =  $scope.settings.current.segmentLength*$scope.settings.current.particleSegments;
		
		var vm = this;
        
        $scope.params = {
       		skipRows: 0,
			bp_per_nm: 0.01,
			first_bin: $scope.dataset.object.chromStart[0]
        };
        
		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Datas Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: DataImportController,
				onComplete: afterShowAnimation
			}).then(function(importedDatasCount) {
				$mdToast.show(
					$mdToast.simple()
					.content(" " + importedDatasCount + " records imported")
				);
			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('cancelled')
				);
				if($scope.func=='dataset') $state.go('dataset'); 
				else $state.go('browser');	
			});
			// When the 'enter' animation finishes...
			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
				// console.log(scope);
				console.log("showing dialog");
			}
		});

		$scope.parseFile = function($fileContent) {
			if($scope.func=='dataset') {
				$scope.fileData = Datasets.validate($fileContent);
				if($scope.fileData.models.length > 0) $scope.bins = ($scope.fileData.models[0].data.length/3);
				else $scope.bins = $scope.fileData.hic_data.n;
				var chromosomeIndex = 0;
				if ($scope.fileData.object.chromosomeIndex) {
					chromosomeIndex = $scope.fileData.object.chromosomeIndex;	
				}
				var chrom = $scope.fileData.object.chrom[chromosomeIndex];
				var chromStart = $scope.fileData.object.chromStart[chromosomeIndex];
				var chromEnd = $scope.fileData.object.chromEnd[chromosomeIndex];
				
				$scope.fileData.object.region = chrom + ":" + chromStart + "-" + chromEnd;
			} else {
				$scope.fileData = Datasets.parse($fileContent).data;
				$scope.selectedCols = [];
				var cols = $scope.fileData[0].length;
				while (--cols >= 0) {$scope.selectedCols[cols] = true;} // initially set all to selected
			}
			console.log("File Opened...");
		};
		
		$scope.importData = function(parsedData) {
			
			
			if($scope.func=='3D coordinates') {
				$scope.importedCoords = Datasets.import(parsedData, $scope.params.skipRows, $scope.params.bp_per_nm, $scope.selectedCols);
			} else if($scope.func=='Hic matrix') {
				var offset_bin = Math.round(($scope.dataset.object.chromStart[0]-$scope.params.first_bin)/$scope.resolution);
				var n = parsedData.length - $scope.params.skipRows;
				var chr_bins = 0;
				for (var i = 0 ; i < $scope.dataset.object.chrom.length; i++) {
					chr_bins += Math.round($scope.dataset.object.chromEnd[i]/$scope.resolution)-Math.round($scope.dataset.object.chromStart[i]/$scope.resolution);
				}
				if(n>chr_bins) n = chr_bins;	
				$scope.importedCoords = Hic_data.import(parsedData, $scope.params.skipRows, offset_bin, $scope.selectedCols, n);
			} else if($scope.func=='dataset') {
				Datasets.add(parsedData);
				$scope.importedCoords = 1;
			} 
			$mdDialog.hide($scope.importedCoords); 
			//var settings = Settings.get();
			/*var offset=0;
			for(var i=0;i<$scope.dataset.object.chromosomeIndex;i++) offset += Math.round($scope.dataset.object.chromEnd[l]/$scope.resolution)-Math.round($scope.dataset.object.chromStart[l]/$scope.resolution)+1; 
			
			var posStart = ($scope.dataset.object.chromStart[$scope.dataset.object.chromosomeIndex]/$scope.resolution + offset)-$scope.dataset.object.chromStart[0]/$scope.resolution;
			var posEnd = ($scope.dataset.object.chromEnd[$scope.dataset.object.chromosomeIndex]/$scope.resolution + offset)-($scope.dataset.object.chromStart[0]/$scope.resolution);
			var hic_data = Hic_data.set($scope.dataset.hic_data,[Math.round(posStart+1)],[Math.round(posEnd)]);
					
		    //var hic_data = Hic_data.set($scope.dataset.hic_data,$scope.settings.current.chromStart,$scope.settings.current.chromEnd);
		    var currentModel = Datasets.setModel(Datasets.getCentroid(),$scope.settings.current.chromosomeIndexes);
		    //Settings.set(dataset,settings.current.chrom,settings.current.chrom);
			*/
			var chromosomeIndex = $scope.settings.current.chromosomeIndexes.slice();
			//var chromosomeIndex = [dataset.object.chrom[0]];
			$scope.settings.current.chromosomeIndexes = chromosomeIndex;
			if($scope.func=='dataset') $state.go('dataset'); 
			else $state.go('browser');	
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.DatasAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkDataImport', tkDataImport);

	function tkDataImport($parse) {		
		return {
			restrict: 'A',
			scope: {
				tkDataImport : "&",
				filetitle : "="
			},
			link: function(scope, element, attrs) {
				element.on('change', function(e) {
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.$apply(function() {
							// console.log("here in apply");
							scope.tkDataImport({$fileContent:e.target.result});
						});
					};
					reader.readAsText((e.srcElement || e.target).files[0]);
					scope.filetitle = (e.srcElement || e.target).files[0].name;
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('DataMiningController', DataMiningController);

	function DataMiningController ($stateParams, $state, $scope, $mdDialog, $mdToast, Storyboards, Datasets, Hic_data, Track_data) {

		var track_data = Track_data.get();
		var hic_data = Hic_data.get();
		$scope.maxFreq = hic_data.max;
		$scope.minFreq = hic_data.min;
		var settings = $scope.$parent.settings.current;
		var resolution = settings.segmentLength*settings.particleSegments;
		$scope.resolution = resolution;
		$scope.TrackList = [];
		var i;
		for(i=0;i<track_data.length;i++) {
        	$scope.TrackList.push(track_data[i].track_name);
        }
        $scope.func = $stateParams.func; 
		$scope.gridOptions = {
			enableGridMenu: false,
			enableFiltering: true,
			enableColumnResizing: true,
		    exporterCsvFilename: 'tadkit_export.csv',
			onRegisterApi: function (gridApi) {
		      $scope.gridApi = gridApi;
		    }
		};
		
		$scope.intThreshold = Math.round(($scope.maxFreq-$scope.minFreq)/2);
		$scope.minDistance = resolution;
		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Datas Dialog
			$mdDialog.show({
				parent: parentElement,
				clickOutsideToClose: false,
				scope: $scope,  
      			preserveScope: true,  
				templateUrl: stateTemplate,
				controller: DataMiningController,
				onComplete: afterShowAnimation
			}).then(function() {
				$mdToast.show(
					$mdToast.simple()
					.content('closed')
				);
	 			$state.go('browser');	
			});
			// When the 'enter' animation finishes...
			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
				// console.log(scope);
				console.log("showing dialog");
			}
		});
		$scope.refresh = function(func) {
			var i,j,k,f;
			$scope.gridOptions.data = [];
			if(func=='Features by bin') {
				for(i=0;i<track_data.length;i++) {
					if(track_data[i].track_name == $scope.selTrack) {
						for(j=0;j<settings.chromosomeIndexes.length;j++) {
							for(k=settings.chromStart[j];k<settings.chromEnd[j];k+=resolution) {
								for(f=0;f<track_data[i].feature.length;f++) {
									if (k+resolution >= track_data[i].feature[f].start && k<= track_data[i].feature[f].end && 
										track_data[i].feature[f].chr.replace('chr','') == settings.chromosomeIndexes[j].replace('chr','') 
									) {
										$scope.gridOptions.data.push({
									        "Chromosome": settings.chromosomeIndexes[j],
									        "Locus": k,
									        "id": track_data[i].feature[f].id,
									        "Name": track_data[i].feature[f].name,
									        "Start": track_data[i].feature[f].start,
									        "End": track_data[i].feature[f].end,
									        "Strand": track_data[i].feature[f].strand,
									        "Value": track_data[i].feature[f].value
									    });
									}
								}
							}

						}
					}

		        }
		        
		    } else if(func=='Interacting features') {
		    	var x_mark, y_mark;
            	var x , y = 0;
            	var chr1, chr2, chr_bins = 0;
		    	var l = 0;
		    	var feats1, feats2, obj;
		    	
		    	var feature_in_bin = function (el) { 
		    		return ((this.locus_pos+resolution >= el.start && this.locus_pos<= el.end && el.chr.replace('chr','') == this.locus_chr.replace('chr','')));
		    	};
		    	var concat_vals = function(elem) {
		    		if ('name' in elem) return elem.name;
		    		else if ('id' in elem) return elem.id;
		    		else if ('value' in elem) return elem.value;
		    		else if ('color' in elem) return elem.color;
		    	};
		    	var track1,track2;
		    	for(j=0;j<track_data.length;j++) {
					if(track_data[j].track_name == $scope.selTrack) {
						track1 = track_data[j];
					}
				}
				for(j=0;j<track_data.length;j++) {
					if(track_data[j].track_name == $scope.selTrack2) {
						track2 = track_data[j];
					}
				}

                for(i=0;i<hic_data.value.length;i++) {
                	if($scope.intThreshold > hic_data.value[i]) continue;
                	x = Math.floor(hic_data.pos[i]%hic_data.n);
					y = Math.floor(hic_data.pos[i]/hic_data.n);
					if(y>x) continue;
					
	            	chr_bins = 0;
	            	l = 0;
	            	while(chr_bins<=x) {
	            		x_mark = (x-chr_bins)*resolution+(settings.chromStart[l]);
	            		chr_bins += Math.round(settings.chromEnd[l]/resolution)-Math.round(settings.chromStart[l]/resolution); 
	            		l++;
	            	}
	            	chr1 = settings.chromosomeIndexes[l-1];
	            	chr_bins = 0;
	    			l = 0;
	    			while(chr_bins<=y) {
	            		y_mark = (y-chr_bins)*resolution+(settings.chromStart[l]);
	            		chr_bins += Math.round(settings.chromEnd[l]/resolution)-Math.round(settings.chromStart[l]/resolution); 
	            		l++;
	            	}
	            	chr2 = settings.chromosomeIndexes[l-1];
	            	
	            	if(chr1 == chr2 && Math.abs(x_mark-y_mark) <= $scope.minDistance) continue;
	            	
	            	obj = { locus_pos: x_mark, locus_chr: chr1 };
	            	feats1 = track1.feature.filter(feature_in_bin, obj);
	            	obj = { locus_pos: y_mark, locus_chr: chr2 };
	            	feats2 = track2.feature.filter(feature_in_bin, obj);
	            	
	            	if(feats1.length == 0 || feats2.length == 0) continue;
	            	
	            	$scope.gridOptions.data.push({
				        "Chromosome 1": chr1,
				        "Locus 1": x_mark,
				        "Chromosome 2": chr2,
				        "Locus 2": y_mark,
				        "Interaction freq,": hic_data.value[i],
				        "Features 1": feats1.map(concat_vals).join(","),
				        "Features 2": feats2.map(concat_vals).join(",")
				    });
                	
                	
                }
			
		    }
		    $mdToast.show(
				$mdToast.simple()
				.content($scope.gridOptions.data.length+' records retrieved')
			);
		};
		$scope.export = function(func){
			//$scope.gridApi.exporter.csvExport( 'all', 'all');
			/* generate a worksheet */
			var filteredRows = $scope.gridApi.core.getVisibleRows($scope.gridApi.grid);
			var result = [];

			filteredRows.forEach(function(key) {
			    result.push(key.entity);
			});
			var ws = XLSX.utils.json_to_sheet(result);
			
			var wbout = XLSX.utils.sheet_to_csv(ws, {FS:"\t"});
			/* generate a download */

			saveAs(new Blob([wbout],{type:"attachment/csv;charset=utf-8;"}), func+".tsv");
		};
		$scope.cancel = function() {
			$mdDialog.hide();
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkDataMining', tkDataMining);

	function tkDataMining($parse) {		
		return {
			restrict: 'A',
			scope: {
				tkDataMining : "&"
			},
			link: function(scope, element, attrs) {
				
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('HomeController', HomeController);

	function HomeController ($scope){

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('MainController', MainController);

	function MainController($state, $scope, $mdSidenav, Settings, Overlays, Storyboards, Users, Datasets) {

		if (!$scope.settings) {
			$scope.settings = Settings.get();
		}
		$scope.settings.app.isProject = $state.is('project');
		$scope.$on("$stateChangeSuccess", function updatePage() {
			$scope.settings.app.isProject = $state.is('project');
		});
		
		$scope.toggleLeft = function() {
			$mdSidenav('left').open();
		};
		$scope.current = {};
		$scope.current.user = Users.getUser();
//		$scope.current.project = Projects.getProject();
//		$scope.current.dataset = Datasets.getDataset();
//		$scope.current.model = Datasets.getModel();
		$scope.current.overlay = Overlays.getOverlay();
		$scope.current.storyboard = Storyboards.getStoryboard();

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('OverlayImportController', OverlayImportController);

	function OverlayImportController ($state, $scope, $mdDialog, $mdToast, Settings, Overlays, Components, Storyboards, uuid4) {
		$scope.fileTitle = "No file loaded";

		$scope.$on('$viewContentLoaded', function() {
			var parentElement = angular.element(document.body);
			var stateTemplate = "assets/templates/" + $state.current.name + ".html";
			// Import Overlays Dialog
			$mdDialog.show({
				parent: parentElement,
				templateUrl: stateTemplate,
				controller: OverlayImportController,
				locals: {
					overlays: $scope.$parent.overlays,
				},
				onComplete: afterShowAnimation
			}).then(function(importedOverlaysCount) {
				$mdToast.show(
					$mdToast.simple()
					.content("Overlays (" + importedOverlaysCount + ") added")
				);
			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('cancelled')
				);
	 			$state.go('browser');	
			});
			// When the 'enter' animation finishes...
			function afterShowAnimation(scope, element, options) {
				// post-show code here: DOM element focus, etc.
				// console.log(scope);
				console.log("showing dialog");
			}
		});

		$scope.parseFile = function($fileContent) {
			$scope.fileData = Overlays.parse($fileContent).data;
			// Selected Rows in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedRows = [];
			var rows = $scope.fileData.length;
			while (--rows >= 0) {$scope.selectedRows[rows] = true;} // initially set all to selected
			// Selected Columns in File Data
			// Controlled by checkboxes in overlay-import.html
			$scope.selectedCols = [];
			var cols = $scope.fileData[0].length;
			while (--cols >= 0) {$scope.selectedCols[cols] = true;} // initially set all to selected
			console.log("File Opened...");
		};

		$scope.importData = function(parsedData) {
			$scope.importedOverlays = Overlays.import(parsedData, $scope.selectedRows, $scope.selectedCols);
			$mdDialog.hide($scope.importedOverlays.length); // overlays count passed for dialog hide message...
			$state.go('browser');
		};

		$scope.hide = function() {
			$mdDialog.hide($scope.overlaysAcquired);
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkOverlayImport', tkOverlayImport);

	function tkOverlayImport($parse) {		
		return {
			restrict: 'A',
			scope: {
				tkOverlayImport : "&",
				filetitle : "="
			},
			link: function(scope, element, attrs) {
				element.on('change', function(e) {
					var reader = new FileReader();
					reader.onload = function(e) {
						scope.$apply(function() {
							// console.log("here in apply");
							scope.tkOverlayImport({$fileContent:e.target.result});
						});
					};
					reader.readAsText((e.srcElement || e.target).files[0]);
					scope.filetitle = (e.srcElement || e.target).files[0].name;
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectContentController', ProjectContentController);

	function ProjectContentController() {

		
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.filter('startFrom', function() {
		    return function(input, start) {
		    	if(typeof input === 'undefined') return;
		        start = +start; //parse to int
		        return input.slice(start);
		    };})
		.controller('ProjectDatasetController', ProjectDatasetController);

	function ProjectDatasetController ($state, $scope, $stateParams, Datasets, Overlays, Components, Segments){
		// console.log($scope);
		var el = angular.element(document.querySelector('#spinnerdiv'))[0];
    	if(!angular.isUndefined(el))
    		el.style.display = "block";
    	
		$scope.datasets = Datasets.get();
		$scope.selDataset = $scope.datasets.current.index; 
			
		$scope.renderClusters = function() {
			
			$scope.current.dataset = Datasets.getDataset();
			
			if($scope.current.dataset.models.length == 0) return;
			
			$scope.current.model = Datasets.getModel(Datasets.getCentroid(),$scope.current.dataset.object.chrom);
			
			// Get dataset scene icon component
			$scope.clusterComponent = Components.getComponentById("datasets-scene-icon");
	
			// Set cluster color to gradient
			// Recalculate specifically for single segment per particle in cluster scene
			var gradientOverlay = Overlays.getOverlayById("gradient");
			var clusterLength = $scope.current.model.data.length / $scope.current.dataset.object.components;
			var gradientColors = Segments.gradientHCL(gradientOverlay, clusterLength);
			$scope.clusterComponent.overlay = gradientColors;
	
			// Calculate consistent camera position (translation) from combined dataset models
			var datasetModels = new THREE.BufferGeometry();
			for (var h = $scope.current.dataset.models.length - 1; h >= 0; h--) {
				datasetModels.addAttribute( 'position', new THREE.BufferAttribute( $scope.current.dataset.models[h], 3 ) );
			}
			datasetModels.computeBoundingSphere();
			$scope.clusterComponent.view.viewpoint.translate = datasetModels.boundingSphere.radius;
	
			// Create collection of cluster models
			$scope.clusters = [];
			var clusterLists = $scope.current.dataset.clusters;
			var models = $scope.current.dataset.models;
			for (var i = clusterLists.length - 1; i >= 0; i--) {
				var cluster = {};
				cluster.number = i + 1;
				cluster.list = clusterLists[i];
				cluster.centroidIndex = cluster.list.indexOf(Datasets.getCentroid(cluster.number));
				cluster.data = [];
				for (var j = cluster.list.length - 1; j >= 0; j--) {
					var modelData;
					for (var k = models.length - 1; k >= 0; k--) {
						//var model = models[k];
						var model = Datasets.getModel(models[k].ref,$scope.current.dataset.object.chrom);
						if (parseInt(model.ref) == cluster.list[j]) {
							modelData = model.data;
							// console.log("Model " + model.ref + " in Cluster " + cluster.number);
						}
					}
					if (modelData) {cluster.data.unshift(modelData);}
						else {console.log("Listed model not found!");}
				}
				// Add cluster to cluster collection
				$scope.clusters.unshift(cluster);
			}
			// console.log($scope.clusters);
			$scope.currentPage = 0;
		    $scope.pageSize = 10;
		    $scope.numberOfPages=function(){
		        return Math.ceil($scope.clusters.length/$scope.pageSize);                
		    };
		};
		// On click set selected cluster
		$scope.selectCluster = function(index) {
			$scope.clusterArray = Datasets.setCluster(index + 1);
			$scope.centroidRef = Datasets.getCentroid();
			$scope.current.model = Datasets.getModel($scope.centroidRef,$scope.settings.current.chromosomeIndexes);
			console.log("Current Cluster: " + (index + 1) + "(Centroid Model: " + $scope.centroidRef + ")");
			$state.go('browser');
		};
		
		$scope.addDataset = function($fileContent) {
			$state.go('dataset-import', { func: 'dataset' });
		};
		$scope.setDataset = function() {
			Datasets.set($scope.selDataset);
			$scope.renderClusters();
		};
		
		$scope.$watch("settings.current.chromosomeIndexes", function(newValue, oldValue){
		    if(newValue != oldValue){
		    	$scope.selDataset = $scope.datasets.current.index; 
				$scope.renderClusters();
		    }
		});
		
		$scope.renderClusters();
		if(!angular.isUndefined(el))
    		el.style.display = "none";

	}
})();
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
									 if(e.dataTransfer.files.length===0) scope.showAdvanced();
									 else loadFile(e.dataTransfer.files[0]);
							 });

				scope.$watch(expression, function () {
						element.attr("src", accesor(scope));
				});
				
				scope.loadFile = loadFile;
				      
				// element.bind("drop", onDrop);

			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectLoaderController', ProjectLoaderController);

	function ProjectLoaderController($q, $http, $state, $scope, Datasets, Overlays, Components, Storyboards, Users, Hic_data) {
		
		$scope.updateCurrent = function() {
			delete $scope.settings.current.tad_selected;
			$scope.current.dataset = Datasets.getDataset();
			$scope.current.model = Datasets.getModel();
			var overlays = Overlays.get();
			while (overlays.loaded.length > 1) { // remove all overlays
				overlays.loaded.pop();
			}
			Overlays.set(0);
			
			$scope.current.overlay = Overlays.getOverlay();
			$scope.current.components = Components.load();
			$scope.current.storyboards = Storyboards.load();
			$scope.current.storyboard = Storyboards.getStoryboard();
			console.log("Current dataset, model, overlay and storyboard updated.");		
		};

		// On dropzone (load external file)
		// Adds JSON to current project - load TSV when in browser
		$scope.addDataset = function($fileContent) {
			var adding = Datasets.add($fileContent);
			return $q.all([ adding ])
			.then(function(results){
				$scope.updateCurrent();
				// ADD FILENAME (SEE OVERLAY-IMPORT)
				console.log("Dataset added."); //: " + $stateParams.loadDataset);			
				if($scope.current.dataset.models.length>0)
					$state.go('dataset');
				else
					$state.go('browser');
			});			
		};
//		$scope.cleanDataset = function(event) {
//			Datasets.clear();
//			Hic_data.clear();
//			var loadexample = Datasets.load('assets/defaults/tk-example-dataset.json');
//			return $q.all([ loadexample ])
//			.then(function(results){
//				$scope.updateCurrent();
//				// ADD FILENAME (SEE OVERLAY-IMPORT)
//				console.log("Dataset example loaded.");			
//				$state.go('browser', { conf: null });
//			});
//		};
		$scope.cleanDataset = function(event) {		
			$state.go('dataset', { conf: 'assets/examples/conf.json' });
		};
		
		
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.directive('tkProjectLoader', tkProjectLoader);

	function tkProjectLoader($state, $parse) {		
		return {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
				var fn = $parse(attrs.tkProjectLoader);
				element.on('change', function(onChangeEvent) {
					var reader = new FileReader();
					reader.onload = function(onLoadEvent) {
						console.log("Data Loaded");
						scope.$apply(function() {
						// HERE: call the parsed function correctly (with scope AND params object)
							fn(scope, {$fileContent:onLoadEvent.target.result});
							// $state.go('dataset');
						});
					};
					reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
				});
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectOverlayController', ProjectOverlayController);

	function ProjectOverlayController($scope) {

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('ProjectStoryboardController', ProjectStoryboardController);

	function ProjectStoryboardController($scope) {

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarBrowserController', SidebarBrowserController);

	function SidebarBrowserController ($scope, $mdDialog, $mdSidenav, Settings, Datasets, Users, Hic_data){

		// Model Settings
		$scope.toggleSetting = function(setting) {
			$scope.settings = Settings.toggle(setting); // update $scope.settings defined in browser controller
		};
		$scope.toggleLeft = function() {
			$mdSidenav('left').close();
		};
		
		var dataset = Datasets.getDataset();
		var current_model = Datasets.getModel();
		
		$scope.datasets = Datasets.get();
		$scope.data = {
			data: [],
			object: dataset.object
		};
		if(!angular.isUndefined(current_model)) {
			$scope.data.data = current_model.data;
		}
		/*$scope.showDatasetSettings = function($event) {
			var dataset_info = '<div class="component-caption" layout="column" layout-align="left center">'+
					'<h2>'+$scope.data.object.title+'</h2><table>'+
					'<tr><td><b>Species:</b></td><td>'+$scope.data.object.species+'</td></tr>'+
					'<tr><td><b>Region:</b></td><td>'+$scope.data.object.region+'</td></tr>'+
					'<tr><td><b>UUID:</b></td><td>'+$scope.data.object.uuid+'</td></tr>'+
					'<tr><td><b>Resolution:</b></td><td>'+$scope.data.object.resolution+'</td></tr>'+
					'<tr><td><b>Bins:</b></td><td>'+($scope.data.data.length/3)+'</td></tr>'+
					'<tr><td><b>Chromatin radius:</b></td><td> 5 nm</td></tr>'+
					'<tr><td><b>Chromatin radius scale:</b></td><td>'+$scope.data.object.radius_scale+'x</td></tr>'+
				'</table>'+
			'</div>';
			$scope.showInfo($event,dataset_info);
		};*/
		$scope.showAddTrack = function(ev) {
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'dialog2.tmpl.html',
		      locals: {
		    	  data: $scope.data,
		    	  settings: $scope.settings,
		      },
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      hasBackdrop: true,
		      //controller: ['$scope', 'data', function($scope, data) {
		      //      $scope.data = data;
		      //    }],
		      clickOutsideToClose:true
		    });
		};

		$scope.showDatasetSettings = function(ev) {
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'dialog1.tmpl.html',
		      locals: {
		    	  data: $scope.data,
		    	  settings: $scope.settings,
		      },
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      hasBackdrop: true,
		      //controller: ['$scope', 'data', function($scope, data) {
		      //      $scope.data = data;
		      //    }],
		      clickOutsideToClose:true
		    });
		};
		
		$scope.showInfo = function($event,info) {
			$mdDialog.show({
			      parent: angular.element(document.body),
			      targetEvent: $event,
			      template: '<md-dialog md-theme="default" aria-label="Information">' +
			        '  <md-dialog-content class="md-default-theme">' + info +
			        '<md-dialog-actions><md-button ng-click="closeDialog();" class="md-primary md-button md-default-theme"><span class="ng-binding ng-scope">Close</span></md-button></md-dialog-actions>' +
			        '  </md-dialog-content>' +
			        '</md-dialog>',
			      locals: {
			    	  
			      },
			      hasBackdrop: false,
			      controller: DialogController
			    });
		};

		
		
		function DialogController($scope, $mdDialog, data, settings) {
			$scope.data = data;
			$scope.settings = settings;
			$scope.filePath = ''; 
			$scope.fileIndexed = false;
			$scope.closeDialog = function() {
			  $mdDialog.hide();
			};
			
			$scope.GetFilename = function(url) {
			   if (url)
			   {
			      var m = url.toString().match(/.*\/(.+?)\./);
			      if (m && m.length > 1)
			      {
			         return m[1];
			      }
			   }
			   return "";
			};
			$scope.addTrack = function() {
				var tracks = $scope.settings.current.tracks.slice();
				var fileIndex = '';
				if($scope.fileIndexed) fileIndex=$scope.filePath+'.tbi';
				tracks.push({
					"name": $scope.filePath,
					"sourceType": "file",
				    "url": 'assets/data/'+$scope.filePath,
				    "index": fileIndex,
				    "indexed": 'assets/data/'+$scope.fileIndexed
				});
				$scope.settings.current.tracks = tracks;
				
				$mdDialog.hide();
			};

			$scope.toggleSelection = function toggleSelection(chrom) {
				
				var chromosomeIndex = $scope.settings.current.chromosomeIndexes.slice();
				var idx = chromosomeIndex.indexOf(chrom);
			    // Is currently selected
			    if (idx > -1) {
			    	if(chromosomeIndex.length<2) return;
			    	chromosomeIndex.splice(idx, 1);
			    }

			    // Is newly selected
			    else {
			    	chromosomeIndex.push(chrom);
			    }
			    var chromStart = [];
				var chromEnd = [];
				var sortedIndex = [];
				var resolution = $scope.data.object.resolution;
				var chromIdx;
				var offset = 0;
				for (var l = 0 ; l < $scope.data.object.chrom.length; l++) {
					chromIdx = chromosomeIndex.indexOf($scope.data.object.chrom[l]);
					if(chromIdx > -1) {
						sortedIndex.push($scope.data.object.chrom[l]);
						chromStart.push(Math.round($scope.data.object.chromStart[l]/resolution)+offset);
						chromEnd.push(Math.round($scope.data.object.chromEnd[l]/resolution)+offset);
					}
					offset += Math.round($scope.data.object.chromEnd[l]/resolution)-Math.round($scope.data.object.chromStart[l]/resolution);
				}
				var dataset = Datasets.getDataset();
			    var hic_data = Hic_data.set(dataset.hic_data,chromStart,chromEnd);
			    var currentModel = Datasets.setModel(Datasets.getCentroid(),chromosomeIndex);
			    if(chromosomeIndex.indexOf($scope.settings.current.chrom)<0) $scope.settings.current.chrom = chromosomeIndex[0];
			    Settings.set(dataset,chromosomeIndex,$scope.settings.current.chrom);
				//$scope.current.overlay = Overlays.getOverlay();
				
			    var igvDiv = angular.element(document.querySelector('#igvRootDiv'))[0];
			    var span_width = parseInt(igvDiv.clientWidth)-100;
			    $scope.settings.current.leftborder = 50;
			    if(chromosomeIndex.length==2) {
			    	var first_right_border = (50 + span_width)/chromosomeIndex.length;
			    	$scope.settings.current.rightborder = first_right_border * ($scope.settings.current.particlesCount/(chromEnd[0]-chromStart[0]));
			    } else $scope.settings.current.rightborder = (50 + span_width);
				
			    $scope.settings.current.chromosomeIndexes = sortedIndex;
			    
			    
			 };
		}
		
		
		// Scene Settings
		// $scope.toggleScene = function(scene) {
		// 	$scope.scenes = Scenes.toggle(scene); // update $scope.scenes defined in browser controller
		// };

		// Track overlays
		// $scope.toggleTrack = function(track) {
		// 	console.log(track);
		// 	$scope.tracks = Tracks.toggle(track); // update $scope.tracks defined in browser controller
			// $scope.colors = $scope.colors; // CHANGE OF COLOR USED BY SCENE DONE IN SCENE CONTROLLER ie. Here only set current color
		// };
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarProjectController', SidebarProjectController);

	function SidebarProjectController ($scope, Datasets, Overlays, Storyboards){

		$scope.setCurrentDataset = function(index) {
			Datasets.set(index);
		};
		$scope.setCurrentOverlay = function(index) {
			Overlays.set(index);
		};
		$scope.setCurrentStoryboard = function(index) {
			Storyboards.set(index);
		};

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('SidebarUserController', SidebarUserController);

	function SidebarUserController ($scope){

		// // User Profile
		// $scope.user = function(user) {
		// 	$scope.user.profile = Settings.getProfile(user);
		// };

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('StoryboardController', StoryboardController);

	function StoryboardController($window, $scope, $state, $stateParams, Settings, Storyboards, Components, Overlays, Proximities, Restraints, Hic_data, Track_data, Datasets) {

		// WATCH FOR WINDOW RESIZE
		angular.element($window).on('resize', function(){ $scope.$apply(); });
		
		$scope.current.dataset = Datasets.getDataset();
		//Settings.set($scope.current.dataset);
		$scope.current.model = Datasets.getModel(Datasets.getCentroid(),$scope.settings.current.chromosomeIndexes);
		Overlays.segment();
		$scope.current.overlay = Overlays.getOverlay();
		$scope.current.storyboard = Storyboards.getStoryboard();
		
		var datasets = Datasets.get();
		if(datasets.loaded.length===0) { 
			$state.go('loader',{ conf: $stateParams.conf });
			return;
		}
		// $scope.current.storyboard.components[0].view.settings.chromatin.segmentLength = $scope.settings.current.segmentLength;

		$scope.settings.views.scale = 1; //$scope.current.dataset.object.scale;
		Storyboards.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);
		Components.setViewpoint($scope.settings.current.chromStart,$scope.settings.current.chromEnd,$scope.settings.views.scale);

		// Calculating Initial Proximities
		//NOTE in future if more than 1 currentModel need same number of currentProximities
//		var scene_component;
		$scope.allProximities = Proximities.get(); // for Scene
		if($scope.current.dataset.models.length > 0) { // we have models
			$scope.currentProximities = Proximities.at($scope.settings.current.particle); // for D3 tracks
	
			// Calculating Initial Restraints
			//NOTE in future if more than 1 currentModel need same number of currentRestraints
			$scope.currentRestraints = Restraints.at($scope.settings.current.particle); // for D3 tracks
		} 
//		else { // we have only the matrix
//			scene_component = Storyboards.getComponentById('Chromatin');
//			if(typeof scene_component !== 'undefined') Storyboards.removeComponentById("Chromatin");
//		}
		// Assign data and overlays for each component by type
		angular.forEach( $scope.current.storyboard.components, function(component, index) {

			// if (component.object.dataset == "default") {
				var overlay, overlayProximities, all_data;
				if (component.object.type == "scene") {
					all_data = {
						tad_data: Hic_data.get(),
						data: $scope.current.model.data,
						object: $scope.current.dataset.object
					};
					component.data = all_data;
					//component.data = $scope.current.model.data;
					 // component.proximities required for Scenes: overlay.colors Saturation
					component.proximities = $scope.allProximities;
					component.overlay = $scope.current.overlay;
					component.overlay.state = {};
					component.overlay.object.state.index = Overlays.getCurrentIndex();
					
				} else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
					// overlay = Overlays.getOverlayById("genes");
					// component.data = overlay.data;
					// component.overlay required for toggle
					all_data = {
						tad_data: Hic_data.get(),
						track_data: Track_data.get(),
						data: [],
						object: $scope.current.dataset.object
					};
					if(!angular.isUndefined($scope.current.model)) {
						all_data.data = $scope.current.model.data;
					}
					component.data = all_data;
					component.overlay = overlay;
				} else if (component.object.type == "track-proximities") {
					// ie only one... see note above for Calculating Proximities
					// component.data for Scenes: overlay.colors Saturation
					component.data = $scope.currentProximities;
					// component.overlay required for toggle
					//   and for Scenes: overlay.colors Hue
					overlay = Overlays.getOverlayById("proximities");
					component.overlay = overlay;
				} else if (component.object.type == "track-restraints") {
					// ie only one... see note above for Calculating Restraints
					// component.data for Scenes: overlay.colors Saturation
					component.data = $scope.currentRestraints;
					// component.overlay required for toggle
					//   and for Scenes: overlay.colors Hue
					overlay = Overlays.getOverlayById("restraints");
					component.overlay = overlay;
				} else if (component.object.type == "panel-hicdata") {
					component.data = Hic_data.get();
				} else if (component.object.type == "panel-jbrowse" || component.object.type == "panel-igvjs") {
					//component.data = Restraints.get();
					all_data = {
							tad_data: Hic_data.get(),
							data: $scope.currentRestraints,
					};
					component.data = all_data;
					//component.data = $scope.currentRestraints;
					overlay = Overlays.getOverlayById("restraints");
					component.overlay = overlay;
				}
				// } else if (component.object.type == "track-wiggle") {
				// 	overlay = Overlays.getOverlayById(component.object.dataset);
				// 	component.data = overlay.data;
				// 	component.overlay = overlay; // required for toggle
				// } else {
				// 	// slider and other types of component...
				// }
			// }
		});

		// Watch for Slider Position updates
		$scope.$watch('settings.current.particle', function(newParticle, oldParticle) { // deep watch as change direct and changes all?
			if ( newParticle !== oldParticle ) {
				// $scope.currentProximities = Proximities.at(newParticle); // for D3 tracks
				// $scope.currentRestraints = Restraints.at(newParticle); // for D3 tracks
				if ($scope.current.overlay.object.type == "matrix") {
					Overlays.at(newParticle);
					$scope.current.overlay = Overlays.getOverlay();
				} 
				// console.log($scope.currentProximities);
			}
		});

		// save original overlaid
		$scope.overlayOrig = $scope.current.overlay;
		$scope.toggleOverlay = function(index) {
			$scope.overlaid = Overlays.getOverlay(index).object.state.overlaid;
			if (!$scope.overlaid) {
				Overlays.setOverlaid(index);
				Overlays.set(index);
				$scope.current.overlay = Overlays.getOverlay();
				// console.log($scope.current.overlay);
			} else {
				Overlays.setOverlaid($scope.overlayOrig.object.state.index);
				Overlays.set($scope.overlayOrig.object.state.index);
				$scope.current.overlay = Overlays.getOverlay();
			}
			// $scope.overlay.object.state.overlaid = !$scope.overlay.object.state.overlaid;
		};

		$scope.optionsState = false;
		$scope.toggleOptions = function() {
			$scope.optionsState = !$scope.optionsState;
		};

		$scope.toggle = function(bool) {
			bool = !bool;
			console.log(bool);
		};

		$scope.testfn = function() {
			console.log("test worked");
		};
		
		// $scope.keyControls = function (e, component) {
		// 	if (event.keyCode === 32 || event.charCode === 32) {
		// 		component.view.controls.autoRotate = !component.view.controls.autoRotate; 
		// 	}
		// };

	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.controller('TopbarController', TopbarController);

	function TopbarController($state, $scope, $mdSidenav, $mdDialog) {

		$scope.$state = $state;
		if ($state.includes('main.project')){
			$scope.projectTitle = $scope.users[0].projects[0].object.title;
		}

		$scope.toggleLeft = function() {
			$mdSidenav('left').toggle();
		};

		$scope.toggleRight = function() {
			$mdSidenav('right').toggle();
		};

		//$scope.showDatasetCluster = $state.includes('browser');
		//$scope.$watch('current.model', function(newModel, oldModel) { 
		//	if(typeof(newModel) == 'undefined') $scope.showDatasetCluster = false;
		//});
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('ColorConvert', ColorConvert);

	function ColorConvert() {
		// var rootObj = this;
		var rootObj = {};
		rootObj.re_ = {
		  // An X11 "rgb:ddd/ddd/ddd" value.
		  x11rgb: /^\s*rgb:([a-f0-9]{1,4})\/([a-f0-9]{1,4})\/([a-f0-9]{1,4})\s*$/i,
		};		
		/**
		 * Named colors according to the stock X11 rgb.txt file.
		 */
		rootObj.colorNames = {
			// ADDED FOR ENSEMBL WEBCODE COLORS
			"transparent": "rgb(0, 0, 0)", // should be rgba...
	//		"rust": "rgb(183, 65, 14)", // ORIGINL ENSEMBL RUST
			"rust": "rgb(243, 137, 92)", // HALF INTENSITY OF RUST
			"stripes": "rgb(255, 54, 54)",
			"dark_blue": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
			"contigblue1": "rgb(0, 0, 139)", // FROM ENSEMBL DOCS = DARK BLUE
			"contigblue2": "rgb(173, 216, 230)", // FROM ENSEMBL DOCS = LIGHT BLUE
			"border:grey70": "rgb(179, 179, 179)", // FROM ENSEMBL ERROR? = GREY70
			// X11 COLOR NAMES
		  "aliceblue": "rgb(240, 248, 255)", "antiquewhite": "rgb(250, 235, 215)", "antiquewhite1": "rgb(255, 239, 219)", "antiquewhite2": "rgb(238, 223, 204)", "antiquewhite3": "rgb(205, 192, 176)", "antiquewhite4": "rgb(139, 131, 120)", "aquamarine": "rgb(127, 255, 212)", "aquamarine1": "rgb(127, 255, 212)", "aquamarine2": "rgb(118, 238, 198)", "aquamarine3": "rgb(102, 205, 170)", "aquamarine4": "rgb(69, 139, 116)", "azure": "rgb(240, 255, 255)", "azure1": "rgb(240, 255, 255)", "azure2": "rgb(224, 238, 238)", "azure3": "rgb(193, 205, 205)", "azure4": "rgb(131, 139, 139)", "beige": "rgb(245, 245, 220)", "bisque": "rgb(255, 228, 196)", "bisque1": "rgb(255, 228, 196)", "bisque2": "rgb(238, 213, 183)", "bisque3": "rgb(205, 183, 158)", "bisque4": "rgb(139, 125, 107)", "black": "rgb(0, 0, 0)", "blanchedalmond": "rgb(255, 235, 205)", "blue": "rgb(0, 0, 255)", "blue1": "rgb(0, 0, 255)", "blue2": "rgb(0, 0, 238)", "blue3": "rgb(0, 0, 205)", "blue4": "rgb(0, 0, 139)", "blueviolet": "rgb(138, 43, 226)", "brown": "rgb(165, 42, 42)", "brown1": "rgb(255, 64, 64)", "brown2": "rgb(238, 59, 59)", "brown3": "rgb(205, 51, 51)", "brown4": "rgb(139, 35, 35)", "burlywood": "rgb(222, 184, 135)", "burlywood1": "rgb(255, 211, 155)", "burlywood2": "rgb(238, 197, 145)", "burlywood3": "rgb(205, 170, 125)", "burlywood4": "rgb(139, 115, 85)", "cadetblue": "rgb(95, 158, 160)", "cadetblue1": "rgb(152, 245, 255)", "cadetblue2": "rgb(142, 229, 238)", "cadetblue3": "rgb(122, 197, 205)", "cadetblue4": "rgb(83, 134, 139)", "chartreuse": "rgb(127, 255, 0)", "chartreuse1": "rgb(127, 255, 0)", "chartreuse2": "rgb(118, 238, 0)", "chartreuse3": "rgb(102, 205, 0)", "chartreuse4": "rgb(69, 139, 0)", "chocolate": "rgb(210, 105, 30)", "chocolate1": "rgb(255, 127, 36)", "chocolate2": "rgb(238, 118, 33)", "chocolate3": "rgb(205, 102, 29)", "chocolate4": "rgb(139, 69, 19)", "coral": "rgb(255, 127, 80)", "coral1": "rgb(255, 114, 86)", "coral2": "rgb(238, 106, 80)", "coral3": "rgb(205, 91, 69)", "coral4": "rgb(139, 62, 47)", "cornflowerblue": "rgb(100, 149, 237)", "cornsilk": "rgb(255, 248, 220)", "cornsilk1": "rgb(255, 248, 220)", "cornsilk2": "rgb(238, 232, 205)", "cornsilk3": "rgb(205, 200, 177)", "cornsilk4": "rgb(139, 136, 120)", "cyan": "rgb(0, 255, 255)", "cyan1": "rgb(0, 255, 255)", "cyan2": "rgb(0, 238, 238)", "cyan3": "rgb(0, 205, 205)", "cyan4": "rgb(0, 139, 139)", "darkblue": "rgb(0, 0, 139)", "darkcyan": "rgb(0, 139, 139)", "darkgoldenrod": "rgb(184, 134, 11)", "darkgoldenrod1": "rgb(255, 185, 15)", "darkgoldenrod2": "rgb(238, 173, 14)", "darkgoldenrod3": "rgb(205, 149, 12)", "darkgoldenrod4": "rgb(139, 101, 8)", "darkgray": "rgb(169, 169, 169)", "darkgreen": "rgb(0, 100, 0)", "darkgrey": "rgb(169, 169, 169)", "darkkhaki": "rgb(189, 183, 107)", "darkmagenta": "rgb(139, 0, 139)", "darkolivegreen": "rgb(85, 107, 47)", "darkolivegreen1": "rgb(202, 255, 112)", "darkolivegreen2": "rgb(188, 238, 104)", "darkolivegreen3": "rgb(162, 205, 90)", "darkolivegreen4": "rgb(110, 139, 61)", "darkorange": "rgb(255, 140, 0)", "darkorange1": "rgb(255, 127, 0)", "darkorange2": "rgb(238, 118, 0)", "darkorange3": "rgb(205, 102, 0)", "darkorange4": "rgb(139, 69, 0)", "darkorchid": "rgb(153, 50, 204)", "darkorchid1": "rgb(191, 62, 255)", "darkorchid2": "rgb(178, 58, 238)", "darkorchid3": "rgb(154, 50, 205)", "darkorchid4": "rgb(104, 34, 139)", "darkred": "rgb(139, 0, 0)", "darksalmon": "rgb(233, 150, 122)", "darkseagreen": "rgb(143, 188, 143)", "darkseagreen1": "rgb(193, 255, 193)", "darkseagreen2": "rgb(180, 238, 180)", "darkseagreen3": "rgb(155, 205, 155)", "darkseagreen4": "rgb(105, 139, 105)", "darkslateblue": "rgb(72, 61, 139)", "darkslategray": "rgb(47, 79, 79)", "darkslategray1": "rgb(151, 255, 255)", "darkslategray2": "rgb(141, 238, 238)", "darkslategray3": "rgb(121, 205, 205)", "darkslategray4": "rgb(82, 139, 139)", "darkslategrey": "rgb(47, 79, 79)", "darkturquoise": "rgb(0, 206, 209)", "darkviolet": "rgb(148, 0, 211)", "debianred": "rgb(215, 7, 81)", "deeppink": "rgb(255, 20, 147)", "deeppink1": "rgb(255, 20, 147)", "deeppink2": "rgb(238, 18, 137)", "deeppink3": "rgb(205, 16, 118)", "deeppink4": "rgb(139, 10, 80)", "deepskyblue": "rgb(0, 191, 255)", "deepskyblue1": "rgb(0, 191, 255)", "deepskyblue2": "rgb(0, 178, 238)", "deepskyblue3": "rgb(0, 154, 205)", "deepskyblue4": "rgb(0, 104, 139)", "dimgray": "rgb(105, 105, 105)", "dimgrey": "rgb(105, 105, 105)", "dodgerblue": "rgb(30, 144, 255)", "dodgerblue1": "rgb(30, 144, 255)", "dodgerblue2": "rgb(28, 134, 238)", "dodgerblue3": "rgb(24, 116, 205)", "dodgerblue4": "rgb(16, 78, 139)", "firebrick": "rgb(178, 34, 34)", "firebrick1": "rgb(255, 48, 48)", "firebrick2": "rgb(238, 44, 44)", "firebrick3": "rgb(205, 38, 38)", "firebrick4": "rgb(139, 26, 26)", "floralwhite": "rgb(255, 250, 240)", "forestgreen": "rgb(34, 139, 34)", "gainsboro": "rgb(220, 220, 220)", "ghostwhite": "rgb(248, 248, 255)", "gold": "rgb(255, 215, 0)", "gold1": "rgb(255, 215, 0)", "gold2": "rgb(238, 201, 0)", "gold3": "rgb(205, 173, 0)", "gold4": "rgb(139, 117, 0)", "goldenrod": "rgb(218, 165, 32)", "goldenrod1": "rgb(255, 193, 37)", "goldenrod2": "rgb(238, 180, 34)", "goldenrod3": "rgb(205, 155, 29)", "goldenrod4": "rgb(139, 105, 20)", "gray": "rgb(190, 190, 190)", "gray0": "rgb(0, 0, 0)", "gray1": "rgb(3, 3, 3)", "gray10": "rgb(26, 26, 26)", "gray100": "rgb(255, 255, 255)", "gray11": "rgb(28, 28, 28)", "gray12": "rgb(31, 31, 31)", "gray13": "rgb(33, 33, 33)", "gray14": "rgb(36, 36, 36)", "gray15": "rgb(38, 38, 38)", "gray16": "rgb(41, 41, 41)", "gray17": "rgb(43, 43, 43)", "gray18": "rgb(46, 46, 46)", "gray19": "rgb(48, 48, 48)", "gray2": "rgb(5, 5, 5)", "gray20": "rgb(51, 51, 51)", "gray21": "rgb(54, 54, 54)", "gray22": "rgb(56, 56, 56)", "gray23": "rgb(59, 59, 59)", "gray24": "rgb(61, 61, 61)", "gray25": "rgb(64, 64, 64)", "gray26": "rgb(66, 66, 66)", "gray27": "rgb(69, 69, 69)", "gray28": "rgb(71, 71, 71)", "gray29": "rgb(74, 74, 74)", "gray3": "rgb(8, 8, 8)", "gray30": "rgb(77, 77, 77)", "gray31": "rgb(79, 79, 79)", "gray32": "rgb(82, 82, 82)", "gray33": "rgb(84, 84, 84)", "gray34": "rgb(87, 87, 87)", "gray35": "rgb(89, 89, 89)", "gray36": "rgb(92, 92, 92)", "gray37": "rgb(94, 94, 94)", "gray38": "rgb(97, 97, 97)", "gray39": "rgb(99, 99, 99)", "gray4": "rgb(10, 10, 10)", "gray40": "rgb(102, 102, 102)", "gray41": "rgb(105, 105, 105)", "gray42": "rgb(107, 107, 107)", "gray43": "rgb(110, 110, 110)", "gray44": "rgb(112, 112, 112)", "gray45": "rgb(115, 115, 115)", "gray46": "rgb(117, 117, 117)", "gray47": "rgb(120, 120, 120)", "gray48": "rgb(122, 122, 122)", "gray49": "rgb(125, 125, 125)", "gray5": "rgb(13, 13, 13)", "gray50": "rgb(127, 127, 127)", "gray51": "rgb(130, 130, 130)", "gray52": "rgb(133, 133, 133)", "gray53": "rgb(135, 135, 135)", "gray54": "rgb(138, 138, 138)", "gray55": "rgb(140, 140, 140)", "gray56": "rgb(143, 143, 143)", "gray57": "rgb(145, 145, 145)", "gray58": "rgb(148, 148, 148)", "gray59": "rgb(150, 150, 150)", "gray6": "rgb(15, 15, 15)", "gray60": "rgb(153, 153, 153)", "gray61": "rgb(156, 156, 156)", "gray62": "rgb(158, 158, 158)", "gray63": "rgb(161, 161, 161)", "gray64": "rgb(163, 163, 163)", "gray65": "rgb(166, 166, 166)", "gray66": "rgb(168, 168, 168)", "gray67": "rgb(171, 171, 171)", "gray68": "rgb(173, 173, 173)", "gray69": "rgb(176, 176, 176)", "gray7": "rgb(18, 18, 18)", "gray70": "rgb(179, 179, 179)", "gray71": "rgb(181, 181, 181)", "gray72": "rgb(184, 184, 184)", "gray73": "rgb(186, 186, 186)", "gray74": "rgb(189, 189, 189)", "gray75": "rgb(191, 191, 191)", "gray76": "rgb(194, 194, 194)", "gray77": "rgb(196, 196, 196)", "gray78": "rgb(199, 199, 199)", "gray79": "rgb(201, 201, 201)", "gray8": "rgb(20, 20, 20)", "gray80": "rgb(204, 204, 204)", "gray81": "rgb(207, 207, 207)", "gray82": "rgb(209, 209, 209)", "gray83": "rgb(212, 212, 212)", "gray84": "rgb(214, 214, 214)", "gray85": "rgb(217, 217, 217)", "gray86": "rgb(219, 219, 219)", "gray87": "rgb(222, 222, 222)", "gray88": "rgb(224, 224, 224)", "gray89": "rgb(227, 227, 227)", "gray9": "rgb(23, 23, 23)", "gray90": "rgb(229, 229, 229)", "gray91": "rgb(232, 232, 232)", "gray92": "rgb(235, 235, 235)", "gray93": "rgb(237, 237, 237)", "gray94": "rgb(240, 240, 240)", "gray95": "rgb(242, 242, 242)", "gray96": "rgb(245, 245, 245)", "gray97": "rgb(247, 247, 247)", "gray98": "rgb(250, 250, 250)", "gray99": "rgb(252, 252, 252)", "green": "rgb(0, 255, 0)", "green1": "rgb(0, 255, 0)", "green2": "rgb(0, 238, 0)", "green3": "rgb(0, 205, 0)", "green4": "rgb(0, 139, 0)", "greenyellow": "rgb(173, 255, 47)", "grey": "rgb(190, 190, 190)", "grey0": "rgb(0, 0, 0)", "grey1": "rgb(3, 3, 3)", "grey10": "rgb(26, 26, 26)", "grey100": "rgb(255, 255, 255)", "grey11": "rgb(28, 28, 28)", "grey12": "rgb(31, 31, 31)", "grey13": "rgb(33, 33, 33)", "grey14": "rgb(36, 36, 36)", "grey15": "rgb(38, 38, 38)", "grey16": "rgb(41, 41, 41)", "grey17": "rgb(43, 43, 43)", "grey18": "rgb(46, 46, 46)", "grey19": "rgb(48, 48, 48)", "grey2": "rgb(5, 5, 5)", "grey20": "rgb(51, 51, 51)", "grey21": "rgb(54, 54, 54)", "grey22": "rgb(56, 56, 56)", "grey23": "rgb(59, 59, 59)", "grey24": "rgb(61, 61, 61)", "grey25": "rgb(64, 64, 64)", "grey26": "rgb(66, 66, 66)", "grey27": "rgb(69, 69, 69)", "grey28": "rgb(71, 71, 71)", "grey29": "rgb(74, 74, 74)", "grey3": "rgb(8, 8, 8)", "grey30": "rgb(77, 77, 77)", "grey31": "rgb(79, 79, 79)", "grey32": "rgb(82, 82, 82)", "grey33": "rgb(84, 84, 84)", "grey34": "rgb(87, 87, 87)", "grey35": "rgb(89, 89, 89)", "grey36": "rgb(92, 92, 92)", "grey37": "rgb(94, 94, 94)", "grey38": "rgb(97, 97, 97)", "grey39": "rgb(99, 99, 99)", "grey4": "rgb(10, 10, 10)", "grey40": "rgb(102, 102, 102)", "grey41": "rgb(105, 105, 105)", "grey42": "rgb(107, 107, 107)", "grey43": "rgb(110, 110, 110)", "grey44": "rgb(112, 112, 112)", "grey45": "rgb(115, 115, 115)", "grey46": "rgb(117, 117, 117)", "grey47": "rgb(120, 120, 120)", "grey48": "rgb(122, 122, 122)", "grey49": "rgb(125, 125, 125)", "grey5": "rgb(13, 13, 13)", "grey50": "rgb(127, 127, 127)", "grey51": "rgb(130, 130, 130)", "grey52": "rgb(133, 133, 133)", "grey53": "rgb(135, 135, 135)", "grey54": "rgb(138, 138, 138)", "grey55": "rgb(140, 140, 140)", "grey56": "rgb(143, 143, 143)", "grey57": "rgb(145, 145, 145)", "grey58": "rgb(148, 148, 148)", "grey59": "rgb(150, 150, 150)", "grey6": "rgb(15, 15, 15)", "grey60": "rgb(153, 153, 153)", "grey61": "rgb(156, 156, 156)", "grey62": "rgb(158, 158, 158)", "grey63": "rgb(161, 161, 161)", "grey64": "rgb(163, 163, 163)", "grey65": "rgb(166, 166, 166)", "grey66": "rgb(168, 168, 168)", "grey67": "rgb(171, 171, 171)", "grey68": "rgb(173, 173, 173)", "grey69": "rgb(176, 176, 176)", "grey7": "rgb(18, 18, 18)", "grey70": "rgb(179, 179, 179)", "grey71": "rgb(181, 181, 181)", "grey72": "rgb(184, 184, 184)", "grey73": "rgb(186, 186, 186)", "grey74": "rgb(189, 189, 189)", "grey75": "rgb(191, 191, 191)", "grey76": "rgb(194, 194, 194)", "grey77": "rgb(196, 196, 196)", "grey78": "rgb(199, 199, 199)", "grey79": "rgb(201, 201, 201)", "grey8": "rgb(20, 20, 20)", "grey80": "rgb(204, 204, 204)", "grey81": "rgb(207, 207, 207)", "grey82": "rgb(209, 209, 209)", "grey83": "rgb(212, 212, 212)", "grey84": "rgb(214, 214, 214)", "grey85": "rgb(217, 217, 217)", "grey86": "rgb(219, 219, 219)", "grey87": "rgb(222, 222, 222)", "grey88": "rgb(224, 224, 224)", "grey89": "rgb(227, 227, 227)", "grey9": "rgb(23, 23, 23)", "grey90": "rgb(229, 229, 229)", "grey91": "rgb(232, 232, 232)", "grey92": "rgb(235, 235, 235)", "grey93": "rgb(237, 237, 237)", "grey94": "rgb(240, 240, 240)", "grey95": "rgb(242, 242, 242)", "grey96": "rgb(245, 245, 245)", "grey97": "rgb(247, 247, 247)", "grey98": "rgb(250, 250, 250)", "grey99": "rgb(252, 252, 252)", "honeydew": "rgb(240, 255, 240)", "honeydew1": "rgb(240, 255, 240)", "honeydew2": "rgb(224, 238, 224)", "honeydew3": "rgb(193, 205, 193)", "honeydew4": "rgb(131, 139, 131)", "hotpink": "rgb(255, 105, 180)", "hotpink1": "rgb(255, 110, 180)", "hotpink2": "rgb(238, 106, 167)", "hotpink3": "rgb(205, 96, 144)", "hotpink4": "rgb(139, 58, 98)", "indianred": "rgb(205, 92, 92)", "indianred1": "rgb(255, 106, 106)", "indianred2": "rgb(238, 99, 99)", "indianred3": "rgb(205, 85, 85)", "indianred4": "rgb(139, 58, 58)", "ivory": "rgb(255, 255, 240)", "ivory1": "rgb(255, 255, 240)", "ivory2": "rgb(238, 238, 224)", "ivory3": "rgb(205, 205, 193)", "ivory4": "rgb(139, 139, 131)", "khaki": "rgb(240, 230, 140)", "khaki1": "rgb(255, 246, 143)", "khaki2": "rgb(238, 230, 133)", "khaki3": "rgb(205, 198, 115)", "khaki4": "rgb(139, 134, 78)", "lavender": "rgb(230, 230, 250)", "lavenderblush": "rgb(255, 240, 245)", "lavenderblush1": "rgb(255, 240, 245)", "lavenderblush2": "rgb(238, 224, 229)", "lavenderblush3": "rgb(205, 193, 197)", "lavenderblush4": "rgb(139, 131, 134)", "lawngreen": "rgb(124, 252, 0)", "lemonchiffon": "rgb(255, 250, 205)", "lemonchiffon1": "rgb(255, 250, 205)", "lemonchiffon2": "rgb(238, 233, 191)", "lemonchiffon3": "rgb(205, 201, 165)", "lemonchiffon4": "rgb(139, 137, 112)", "lightblue": "rgb(173, 216, 230)", "lightblue1": "rgb(191, 239, 255)", "lightblue2": "rgb(178, 223, 238)", "lightblue3": "rgb(154, 192, 205)", "lightblue4": "rgb(104, 131, 139)", "lightcoral": "rgb(240, 128, 128)", "lightcyan": "rgb(224, 255, 255)", "lightcyan1": "rgb(224, 255, 255)", "lightcyan2": "rgb(209, 238, 238)", "lightcyan3": "rgb(180, 205, 205)", "lightcyan4": "rgb(122, 139, 139)", "lightgoldenrod": "rgb(238, 221, 130)", "lightgoldenrod1": "rgb(255, 236, 139)", "lightgoldenrod2": "rgb(238, 220, 130)", "lightgoldenrod3": "rgb(205, 190, 112)", "lightgoldenrod4": "rgb(139, 129, 76)", "lightgoldenrodyellow": "rgb(250, 250, 210)", "lightgray": "rgb(211, 211, 211)", "lightgreen": "rgb(144, 238, 144)", "lightgrey": "rgb(211, 211, 211)", "lightpink": "rgb(255, 182, 193)", "lightpink1": "rgb(255, 174, 185)", "lightpink2": "rgb(238, 162, 173)", "lightpink3": "rgb(205, 140, 149)", "lightpink4": "rgb(139, 95, 101)", "lightsalmon": "rgb(255, 160, 122)", "lightsalmon1": "rgb(255, 160, 122)", "lightsalmon2": "rgb(238, 149, 114)", "lightsalmon3": "rgb(205, 129, 98)", "lightsalmon4": "rgb(139, 87, 66)", "lightseagreen": "rgb(32, 178, 170)", "lightskyblue": "rgb(135, 206, 250)", "lightskyblue1": "rgb(176, 226, 255)", "lightskyblue2": "rgb(164, 211, 238)", "lightskyblue3": "rgb(141, 182, 205)", "lightskyblue4": "rgb(96, 123, 139)", "lightslateblue": "rgb(132, 112, 255)", "lightslategray": "rgb(119, 136, 153)", "lightslategrey": "rgb(119, 136, 153)", "lightsteelblue": "rgb(176, 196, 222)", "lightsteelblue1": "rgb(202, 225, 255)", "lightsteelblue2": "rgb(188, 210, 238)", "lightsteelblue3": "rgb(162, 181, 205)", "lightsteelblue4": "rgb(110, 123, 139)", "lightyellow": "rgb(255, 255, 224)", "lightyellow1": "rgb(255, 255, 224)", "lightyellow2": "rgb(238, 238, 209)", "lightyellow3": "rgb(205, 205, 180)", "lightyellow4": "rgb(139, 139, 122)", "limegreen": "rgb(50, 205, 50)", "linen": "rgb(250, 240, 230)", "magenta": "rgb(255, 0, 255)", "magenta1": "rgb(255, 0, 255)", "magenta2": "rgb(238, 0, 238)", "magenta3": "rgb(205, 0, 205)", "magenta4": "rgb(139, 0, 139)", "maroon": "rgb(176, 48, 96)", "maroon1": "rgb(255, 52, 179)", "maroon2": "rgb(238, 48, 167)", "maroon3": "rgb(205, 41, 144)", "maroon4": "rgb(139, 28, 98)", "mediumaquamarine": "rgb(102, 205, 170)", "mediumblue": "rgb(0, 0, 205)", "mediumorchid": "rgb(186, 85, 211)", "mediumorchid1": "rgb(224, 102, 255)", "mediumorchid2": "rgb(209, 95, 238)", "mediumorchid3": "rgb(180, 82, 205)", "mediumorchid4": "rgb(122, 55, 139)", "mediumpurple": "rgb(147, 112, 219)", "mediumpurple1": "rgb(171, 130, 255)", "mediumpurple2": "rgb(159, 121, 238)", "mediumpurple3": "rgb(137, 104, 205)", "mediumpurple4": "rgb(93, 71, 139)", "mediumseagreen": "rgb(60, 179, 113)", "mediumslateblue": "rgb(123, 104, 238)", "mediumspringgreen": "rgb(0, 250, 154)", "mediumturquoise": "rgb(72, 209, 204)", "mediumvioletred": "rgb(199, 21, 133)", "midnightblue": "rgb(25, 25, 112)", "mintcream": "rgb(245, 255, 250)", "mistyrose": "rgb(255, 228, 225)", "mistyrose1": "rgb(255, 228, 225)", "mistyrose2": "rgb(238, 213, 210)", "mistyrose3": "rgb(205, 183, 181)", "mistyrose4": "rgb(139, 125, 123)", "moccasin": "rgb(255, 228, 181)", "navajowhite": "rgb(255, 222, 173)", "navajowhite1": "rgb(255, 222, 173)", "navajowhite2": "rgb(238, 207, 161)", "navajowhite3": "rgb(205, 179, 139)", "navajowhite4": "rgb(139, 121, 94)", "navy": "rgb(0, 0, 128)", "navyblue": "rgb(0, 0, 128)", "oldlace": "rgb(253, 245, 230)", "olivedrab": "rgb(107, 142, 35)", "olivedrab1": "rgb(192, 255, 62)", "olivedrab2": "rgb(179, 238, 58)", "olivedrab3": "rgb(154, 205, 50)", "olivedrab4": "rgb(105, 139, 34)", "orange": "rgb(255, 165, 0)", "orange1": "rgb(255, 165, 0)", "orange2": "rgb(238, 154, 0)", "orange3": "rgb(205, 133, 0)", "orange4": "rgb(139, 90, 0)", "orangered": "rgb(255, 69, 0)", "orangered1": "rgb(255, 69, 0)", "orangered2": "rgb(238, 64, 0)", "orangered3": "rgb(205, 55, 0)", "orangered4": "rgb(139, 37, 0)", "orchid": "rgb(218, 112, 214)", "orchid1": "rgb(255, 131, 250)", "orchid2": "rgb(238, 122, 233)", "orchid3": "rgb(205, 105, 201)", "orchid4": "rgb(139, 71, 137)", "palegoldenrod": "rgb(238, 232, 170)", "palegreen": "rgb(152, 251, 152)", "palegreen1": "rgb(154, 255, 154)", "palegreen2": "rgb(144, 238, 144)", "palegreen3": "rgb(124, 205, 124)", "palegreen4": "rgb(84, 139, 84)", "paleturquoise": "rgb(175, 238, 238)", "paleturquoise1": "rgb(187, 255, 255)", "paleturquoise2": "rgb(174, 238, 238)", "paleturquoise3": "rgb(150, 205, 205)", "paleturquoise4": "rgb(102, 139, 139)", "palevioletred": "rgb(219, 112, 147)", "palevioletred1": "rgb(255, 130, 171)", "palevioletred2": "rgb(238, 121, 159)", "palevioletred3": "rgb(205, 104, 137)", "palevioletred4": "rgb(139, 71, 93)", "papayawhip": "rgb(255, 239, 213)", "peachpuff": "rgb(255, 218, 185)", "peachpuff1": "rgb(255, 218, 185)", "peachpuff2": "rgb(238, 203, 173)", "peachpuff3": "rgb(205, 175, 149)", "peachpuff4": "rgb(139, 119, 101)", "peru": "rgb(205, 133, 63)", "pink": "rgb(255, 192, 203)", "pink1": "rgb(255, 181, 197)", "pink2": "rgb(238, 169, 184)", "pink3": "rgb(205, 145, 158)", "pink4": "rgb(139, 99, 108)", "plum": "rgb(221, 160, 221)", "plum1": "rgb(255, 187, 255)", "plum2": "rgb(238, 174, 238)", "plum3": "rgb(205, 150, 205)", "plum4": "rgb(139, 102, 139)", "powderblue": "rgb(176, 224, 230)", "purple": "rgb(160, 32, 240)", "purple1": "rgb(155, 48, 255)", "purple2": "rgb(145, 44, 238)", "purple3": "rgb(125, 38, 205)", "purple4": "rgb(85, 26, 139)", "red": "rgb(255, 0, 0)", "red1": "rgb(255, 0, 0)", "red2": "rgb(238, 0, 0)", "red3": "rgb(205, 0, 0)", "red4": "rgb(139, 0, 0)", "rosybrown": "rgb(188, 143, 143)", "rosybrown1": "rgb(255, 193, 193)", "rosybrown2": "rgb(238, 180, 180)", "rosybrown3": "rgb(205, 155, 155)", "rosybrown4": "rgb(139, 105, 105)", "royalblue": "rgb(65, 105, 225)", "royalblue1": "rgb(72, 118, 255)", "royalblue2": "rgb(67, 110, 238)", "royalblue3": "rgb(58, 95, 205)", "royalblue4": "rgb(39, 64, 139)", "saddlebrown": "rgb(139, 69, 19)", "salmon": "rgb(250, 128, 114)", "salmon1": "rgb(255, 140, 105)", "salmon2": "rgb(238, 130, 98)", "salmon3": "rgb(205, 112, 84)", "salmon4": "rgb(139, 76, 57)", "sandybrown": "rgb(244, 164, 96)", "seagreen": "rgb(46, 139, 87)", "seagreen1": "rgb(84, 255, 159)", "seagreen2": "rgb(78, 238, 148)", "seagreen3": "rgb(67, 205, 128)", "seagreen4": "rgb(46, 139, 87)", "seashell": "rgb(255, 245, 238)", "seashell1": "rgb(255, 245, 238)", "seashell2": "rgb(238, 229, 222)", "seashell3": "rgb(205, 197, 191)", "seashell4": "rgb(139, 134, 130)", "sienna": "rgb(160, 82, 45)", "sienna1": "rgb(255, 130, 71)", "sienna2": "rgb(238, 121, 66)", "sienna3": "rgb(205, 104, 57)", "sienna4": "rgb(139, 71, 38)", "skyblue": "rgb(135, 206, 235)", "skyblue1": "rgb(135, 206, 255)", "skyblue2": "rgb(126, 192, 238)", "skyblue3": "rgb(108, 166, 205)", "skyblue4": "rgb(74, 112, 139)", "slateblue": "rgb(106, 90, 205)", "slateblue1": "rgb(131, 111, 255)", "slateblue2": "rgb(122, 103, 238)", "slateblue3": "rgb(105, 89, 205)", "slateblue4": "rgb(71, 60, 139)", "slategray": "rgb(112, 128, 144)", "slategray1": "rgb(198, 226, 255)", "slategray2": "rgb(185, 211, 238)", "slategray3": "rgb(159, 182, 205)", "slategray4": "rgb(108, 123, 139)", "slategrey": "rgb(112, 128, 144)", "snow": "rgb(255, 250, 250)", "snow1": "rgb(255, 250, 250)", "snow2": "rgb(238, 233, 233)", "snow3": "rgb(205, 201, 201)", "snow4": "rgb(139, 137, 137)", "springgreen": "rgb(0, 255, 127)", "springgreen1": "rgb(0, 255, 127)", "springgreen2": "rgb(0, 238, 118)", "springgreen3": "rgb(0, 205, 102)", "springgreen4": "rgb(0, 139, 69)", "steelblue": "rgb(70, 130, 180)", "steelblue1": "rgb(99, 184, 255)", "steelblue2": "rgb(92, 172, 238)", "steelblue3": "rgb(79, 148, 205)", "steelblue4": "rgb(54, 100, 139)", "tan": "rgb(210, 180, 140)", "tan1": "rgb(255, 165, 79)", "tan2": "rgb(238, 154, 73)", "tan3": "rgb(205, 133, 63)", "tan4": "rgb(139, 90, 43)", "thistle": "rgb(216, 191, 216)", "thistle1": "rgb(255, 225, 255)", "thistle2": "rgb(238, 210, 238)", "thistle3": "rgb(205, 181, 205)", "thistle4": "rgb(139, 123, 139)", "tomato": "rgb(255, 99, 71)", "tomato1": "rgb(255, 99, 71)", "tomato2": "rgb(238, 92, 66)", "tomato3": "rgb(205, 79, 57)", "tomato4": "rgb(139, 54, 38)", "turquoise": "rgb(64, 224, 208)", "turquoise1": "rgb(0, 245, 255)", "turquoise2": "rgb(0, 229, 238)", "turquoise3": "rgb(0, 197, 205)", "turquoise4": "rgb(0, 134, 139)", "violet": "rgb(238, 130, 238)", "violetred": "rgb(208, 32, 144)", "violetred1": "rgb(255, 62, 150)", "violetred2": "rgb(238, 58, 140)", "violetred3": "rgb(205, 50, 120)", "violetred4": "rgb(139, 34, 82)", "wheat": "rgb(245, 222, 179)", "wheat1": "rgb(255, 231, 186)", "wheat2": "rgb(238, 216, 174)", "wheat3": "rgb(205, 186, 150)", "wheat4": "rgb(139, 126, 102)", "white": "rgb(255, 255, 255)", "whitesmoke": "rgb(245, 245, 245)", "yellow": "rgb(255, 255, 0)", "yellow1": "rgb(255, 255, 0)", "yellow2": "rgb(238, 238, 0)", "yellow3": "rgb(205, 205, 0)", "yellow4": "rgb(139, 139, 0)", "yellowgreen": "rgb(154, 205, 50)"
		};
		
		return {

			/**
			 * Convert an X11 color name into a CSS rgb(...) value.
			 *
			 * Names are stripped of spaces and converted to lowercase.	 If the name is
			 * unknown, null is returned.
			 *
			 * This list of color name to RGB mapping is derived from the stock X11
			 * rgb.txt file.
			 *
			 * @param {string} name The color name to convert.
			 * @return {string} The corresponding CSS rgb(...) value.
			 */
			nameToRGB: function(name) {
				if (name in rootObj.colorNames)
				return rootObj.colorNames[name];

				name = name.toLowerCase();
				if (name in rootObj.colorNames)
				return rootObj.colorNames[name];

				name = name.replace(/\s+/g, '');
				if (name in rootObj.colorNames)
					return rootObj.colorNames[name];

				return null;
			},
			
			testIfHex: function(v) {
				var isHex  = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(v);
				return isHex;
			},
			
			rgbToHex: function(color) {
					var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

					var r = parseInt(digits[2]);
					var g = parseInt(digits[3]);
					var b = parseInt(digits[4]);

				    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
			},

			hslToHex: function(data) {
				//https://github.com/jakubpawlowicz/clean-css/blob/master/lib/colors/hsl-to-hex.js
				  // HSL to RGB converter. Both methods adapted from:
				  // http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
				  var hslToRgb = function(h, s, l) {
				    var r, g, b;

				    // normalize hue orientation b/w 0 and 360 degrees
				    h = h % 360;
				    if (h < 0)
				      h += 360;
				    h = ~~h / 360;

				    if (s < 0)
				      s = 0;
				    else if (s > 100)
				      s = 100;
				    s = ~~s / 100;

				    if (l < 0)
				      l = 0;
				    else if (l > 100)
				      l = 100;
				    l = ~~l / 100;

				    if (s === 0) {
				      r = g = b = l; // achromatic
				    } else {
				      var q = l < 0.5 ?
				        l * (1 + s) :
				        l + s - l * s;
				      var p = 2 * l - q;
				      r = hueToRgb(p, q, h + 1/3);
				      g = hueToRgb(p, q, h);
				      b = hueToRgb(p, q, h - 1/3);
				    }

				    return [~~(r * 255), ~~(g * 255), ~~(b * 255)];
				  };

				  var hueToRgb = function(p, q, t) {
				    if (t < 0) t += 1;
				    if (t > 1) t -= 1;
				    if (t < 1/6) return p + (q - p) * 6 * t;
				    if (t < 1/2) return q;
				    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				    return p;
				  };

				  return {
				    process: function() {
				      return data.replace(/hsl\((-?\d+),(-?\d+)%?,(-?\d+)%?\)/g, function(match, hue, saturation, lightness) {
				        var asRgb = hslToRgb(hue, saturation, lightness);
				        var redAsHex = asRgb[0].toString(16);
				        var greenAsHex = asRgb[1].toString(16);
				        var blueAsHex = asRgb[2].toString(16);

				        return '#' +
				          ((redAsHex.length == 1 ? '0' : '') + redAsHex) +
				          ((greenAsHex.length == 1 ? '0' : '') + greenAsHex) +
				          ((blueAsHex.length == 1 ? '0' : '') + blueAsHex);
				      });
				    }
				  };
			},

			nameToHex: function(name) {
				// name = name.replace('/#','/');
				var hexColor;
				var isHex = this.testIfHex(name);
				if (isHex) {
					return "#" + name;
				}
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				name = name.toLowerCase();
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				name = name.replace(/\s+/g, '');
				if (name in rootObj.colorNames) {
					hexColor = this.rgbToHex(rootObj.colorNames[name]);
					return hexColor;
				}
				return null;
			},

			/**
			 * Convert an X11 color value into an CSS rgb(...) color value.
			 *
			 * The X11 value may be an X11 color name, or an RGB value of the form
			 * rgb:hhhh/hhhh/hhhh.	If a component value is less than 4 digits it is
			 * padded out to 4, then scaled down to fit in a single byte.
			 *
			 * @param {string} value The X11 color value to convert.
			 * @return {string} The CSS color value or null if the value could not be
			 *	   converted.
			 */
			x11ToCSS: function(v) {
				function scale(v) {
					// Pad out values with less than four digits.  This padding (probably)
					// matches xterm.  It's difficult to say for sure since xterm seems to
					// arrive at a padded value and then perform some combination of
					// gamma correction, color space tranformation, and quantization.

					if (v.length == 1) {
						// Single digits pad out to four by repeating the character.	"f" becomes
						// "ffff".  Scaling down a hex value of this pattern by 257 is the same
						// as cutting off one byte.  We skip the middle step and just double
						// the character.
						return parseInt(v + v, 16);
					}

					if (v.length == 2) {
						// Similar deal here.	 X11 pads two digit values by repeating the
						// byte (or scale up by 257).	 Since we're going to scale it back
						// down anyway, we can just return the original value.
						return parseInt(v, 16);
					}

					if (v.length == 3) {
						// Three digit values seem to be padded by repeating the final digit.
						// eg. 10f becomes 10ff.
						v = v + v.substr(2);
					}

					// Scale down the 2 byte value.
					return Math.round(parseInt(v, 16) / 257);
				}
			
				var ary = v.match(rootObj.re_.x11rgb);
				// console.log(ary);
				if (!ary)
				return this.nameToRGB(v);

				ary.splice(0, 1);
				return rootObj.arrayToRGBA(ary.map(scale));
			},
			hexToRGB: function(hex) {
				var RGB = [];
				RGB.push(hexToR(hex));
				RGB.push(hexToG(hex));
				RGB.push(hexToB(hex));
				return RGB;
			},
			hexToR: function(hex) {return parseInt((cutHex(hex)).substring(0,2),16);},
			hexToG: function(hex) {return parseInt((cutHex(hex)).substring(2,4),16);},
			hexToB: function(hex) {return parseInt((cutHex(hex)).substring(4,6),16);},
			cutHex: function(hex) {return (hex.charAt(0)=="#") ? hex.substring(1,7):hex;}	
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Color', Color);

	function Color(ColorConvert) {
		// NOTE Ideally these will all be deprecated
		//      in favor of nbative JS, THREE or D3 functions.
		//      Those already UNUSED are marked as such.

		return {

			// Extract colors from (Ensembl) INI files
			// eg. https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			//  OR https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini
			//  OR in TADkit: assets/defaults/ensembl-webcode-COLOUR.ini
			colorsFromIni: function(data) {
				var regex = {
					section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
					param: /^\s*([\w\.\-\_]+)\s*=\s*([\w\.\-\_]+)/,
					comment: /^\s*#.*$/
				};
				var colors = {};
				var lines = data.split(/\r\n|\r|\n/);
				var section = null;
				lines.forEach(function(line){
					if(regex.comment.test(line) || line === ""){
						return;
					}
					var match;
					if(regex.param.test(line)){
						match = line.match(regex.param);
						if(section){
							var hexColor = ColorConvert.nameToHex( match[2] );
							colors[section][match[1]] = hexColor;
						}else{
							colors[match[1]] = match[2];
						}
					}else if(regex.section.test(line)){
						match = line.match(regex.section);
						colors[match[1]] = {};
						section = match[1];
					}else if(line.length === 0 && section){
						section = null;
					}
				});
				return colors;
			},

			// UNUSED: Generate THREE colors from array of arrayed RGB decimal colorss (0.0-1.0)
			//   eg. [[r,g,b],[r,g,b],[r,g,b],...]
			colorsFromTriplets: function(data) {
				var offset = 0, rgb, color,
					 colors = [];
				var totalcolorss = data.length;
				while ( offset < totalcolorss ) {
					rgb = data[offset];
					color =  new THREE.Color(rgb[0], rgb[1], rgb[2]);
					colors.push(color);
					offset ++;
				}
				return colors;
			},
			// Generate THREE colors from array of RGB decimal colorss (0.0-1.0)
			//  eg. [r,g,b,r,g,b,r,g,b,...]
			colorsFromArray: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i=i-1) {
					var b = data[i]/255.0;
					i = i-1;
					var g = data[i]/255.0;
					i = i-1;
					var r = data[i]/255.0;
					var color =  new THREE.Color(r,g,b);
					colors.unshift(color);
				}
				return colors;
			},
			// Generate THREE colors from array of RGB hex values (#000000-#ffffff)
			//  eg. [#rrggbb,#rrggbb,#rrggbb,...]
			colorsFromHex: function(data) {
				var colors = [];
				for (var i = data.length - 1; i >= 0; i--) {
					var color =  new THREE.Color(data[i]);
					colors.unshift(color);
				}
				return colors;
			},
			// Generate THREE Vertex Colors from array of THREE colors
			// 
			vertexColorsFromColors: function(colors) {
				// Buffer Geomptry to be used as LinePieces so
				// colors stored as one per data-position-pair
				// so the array needs an RGB (*3) for each pair (*2)
				// ie. each distance needs to be replicated 6 times
				var vertexColors = new Float32Array( colors.length * 6 );
				for (var i = colors.length - 1; i >= 0; i--) {
					var pos = i * 6;
					var RGB = colors[i];
					vertexColors[pos  ] = RGB.r;
					vertexColors[pos+1] = RGB.g;
					vertexColors[pos+2] = RGB.b;
					vertexColors[pos+3] = RGB.r;
					vertexColors[pos+4] = RGB.g;
					vertexColors[pos+5] = RGB.b;
				}
				return vertexColors;
			},
			// Generate a specific number of random colors
			getRandomColors: function(count) {
				var randomColors = [];
				for(var i=0; i<count; i++){
					var color = "#" + Math.floor(Math.random()*16777215).toString(16);
					randomColors.push(color);
				}
				return randomColors;
			},
			// Generate a specific number of random colors
			getRandomRGB: function(count) {
				var randomRGB = [];
				for(var i=0; i<count; i++){
					var color = "#" + Math.floor(Math.random()*16777215).toString(16);
					var RGB = new THREE.Color(color);
					randomRGB.push(RGB);
				}
				return randomRGB;
			},
				// UNUSED: Generate a math linear gradient between to hex colors values
			//     Note this is NOT a L*a*b or HCL correct gradient
			//     See Mike Bostock's D3 comments: http://bl.ocks.org/mbostock/3014589
			getGradientColor: function(start_color, end_color, percent) {
				// strip the leading # if it's there
				start_color = start_color.replace(/^\s*#|\s*$/g, '');
				end_color = end_color.replace(/^\s*#|\s*$/g, '');

				// convert 3 char codes --> 6, eg. `E0F` --> `EE00FF`
				if(start_color.length == 3){
					start_color = start_color.replace(/(.)/g, '$1$1');
				}

				if(end_color.length == 3){
					end_color = end_color.replace(/(.)/g, '$1$1');
				}

				// get colors
				var start_red = parseInt(start_color.substr(0, 2), 16),
					start_green = parseInt(start_color.substr(2, 2), 16),
					start_blue = parseInt(start_color.substr(4, 2), 16);

				var end_red = parseInt(end_color.substr(0, 2), 16),
					end_green = parseInt(end_color.substr(2, 2), 16),
					end_blue = parseInt(end_color.substr(4, 2), 16);

				// calculate new color
				var diff_red = end_red - start_red;
				var diff_green = end_green - start_green;
				var diff_blue = end_blue - start_blue;

				diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
				diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
				diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

				// ensure 2 digits by color
				if( diff_red.length == 1 )
					diff_red = '0' + diff_red;

				if( diff_green.length == 1 )
					diff_green = '0' + diff_green;

				if( diff_blue.length == 1 )
					diff_blue = '0' + diff_blue;

				return '#' + diff_red + diff_green + diff_blue;
			}

		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Components', Components);

	function Components($q, $http, uuid4) {
		var components = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-components.json";
				if( components.loaded.length > 0 ) {
					deferral.resolve(components);
				} else {
					$http.get(dataUrl)
					.then( function(data) {
						components.loaded = data.data;
						console.log("Components (" + data.data.length + ") loaded from " + dataUrl);
						deferral.resolve(components);
					});
				}
				return deferral.promise;
			},
			add: function(details) {
				details = details || ["","","","","","","",[]];
				var component = {
					metadata : {
						version : 1.0,
						type : "component",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						type : details[2],
						state : {
							width : details[3],
							height : details[4],
							margin : details[5],
							padding : details[6],
							position : details[7]
						}
					},
					view : details[8]
				};
				components.loaded.push(component);
				components.current = components.loaded.length - 1;
				return components;
			},
			remove: function(index) {
				index = index || components.current.index;
				var component = components.loaded.indexOf(index);
				components.loaded.splice(component, 1);
				return components;
			},
			set: function(index) {
				if (index !== undefined || index !== false) components.current.index = index;
				var component = components.loaded[components.current.index];
				return component;
			},
			setViewpoint: function(chromStart, chromEnd, scaleOrig) {
				chromStart = chromStart || 0;
				chromEnd = chromEnd || 4999999;
				var currentComponents = components.loaded;
				// console.log(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-icon") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return components;
			},
			get: function() {
				return components;
			},
			getComponent: function(index) {
				if (index === undefined || index === false) index = components.current.index;
				var component = components.loaded[index];
				return component;
			},
			getComponentById: function (id) {
				var component, found;
				if (id !== undefined || id !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.id === id) {
							component = components.loaded[i];
							found = i;
							// console.log("Component '" + id + "' found!");
						}
					}
				}
				if (!found) {
					component = components.loaded[components.current.index];
					console.log("Component '" + id + "' not found: returning current.");
				}
				return component;
			},
			getComponentByType: function (type) {
				var component, defaultComponent, found;
				found = -1;
				if (type !== undefined || type !== false) {
					for (var i = components.loaded.length - 1; i >= 0; i--) {
						if (components.loaded[i].object.type === type) {
							component = components.loaded[i];
							found = i;
							// console.log("Component type '" + type + "' found!");
						}
						if (components.loaded[i].object.type === "default") {
							defaultComponent = components.loaded[i];
						}
					}
				}
				if (found<0) {
					component = defaultComponent;
					console.log("Component type '" + type + "' not found: returning default.");
				}
				return component;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('d3', [])
		.factory('d3Service', d3Service);

	function d3Service($document, $q, $rootScope, Settings) {
			var d = $q.defer();
			function onScriptLoad() {
				// Load client in the browser
				$rootScope.$apply(function() { d.resolve(window.d3); });
			}
			// Create a script tag with d3 as the source
			// and call our onScriptLoad callback when it
			// has been loaded
			var scriptTag = $document[0].createElement('script');
			scriptTag.type = 'text/javascript'; 
			scriptTag.async = true;
			var online = Settings.getOnline();
			if (online) {
				scriptTag.src = 'http://d3js.org/d3.v3.min.js';
			} else {
				scriptTag.src = 'assets/js/d3.min.js';
			}
			scriptTag.onreadystatechange = function () {
				if (this.readyState == 'complete') onScriptLoad();
			};
			scriptTag.onload = onScriptLoad;

			var s = $document[0].getElementsByTagName('body')[0];
			s.appendChild(scriptTag);

			return {
				d3: function() { return d.promise; }
			};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Datasets', Datasets);

	function Datasets($q, $http, uuid4, Settings, Resources, Proximities, Restraints, Overlays, Hic_data, Track_data) {
		var datasets = {
			loaded : [],
			current : {
				index : 0,
				cluster : 1,
				centroid : 1
			}
		};
		var model = {
				"ref":-1, 
				"data":[]
		};
		return {
			load: function(dataUrl, clear) {
				var self = this;
				var deferral = $q.defer();
				
				$http.get(dataUrl)
				.then( function(dataset) {
					dataset.data.object.filename = dataUrl;
					self.add(dataset.data);
					deferral.resolve(datasets.data);
				});
				return deferral.promise;
			},
			add: function(data) {
				var self = this;
				var dataset = self.validate(data);
				// var uuid = dataObj.uuid || uuid4.generate(),
				// if (!projects.default.datasets[uuid]) {
					datasets.loaded.push(dataset);
					datasets.current.index = datasets.loaded.length - 1;
					self.setSpeciesUrl();
					self.setRegion();
					self.init(dataset);
					console.log("Dataset " + dataset.object.species + " " + dataset.object.region + " loaded from file.");
				// }
				return datasets;
			},
			validate: function(data) {
				var validDataset = {};
				var objectType = Resources.whatIsIt(data);
				if (objectType === "String") {
					validDataset = JSON.parse(data);
				} else {
					// TODO: add specific options for Array, Object, null, etc.
					validDataset = data;
				}
				var validation = true;
				// ADD VALIDATION LOGIC...
				// check structure
				// check content type
				if (validation) {
					return validDataset;
				} else {
					// give error message
					// return to Project Loader page
				}
			},
			init: function(dataset) {
				var self = this;
				if(dataset.centroids.length===0) {
					for (var m = 0; m < dataset.models.length; m++) {
						dataset.centroids.push(dataset.models[m].ref);
						dataset.clusters.push([dataset.models[m].ref]);
					}
				}
				var currentModel = self.getModel();
				Settings.set(dataset);
				if(typeof currentModel !== 'undefined') {
					Proximities.set(currentModel.data);
					Restraints.set(currentModel.data, dataset.restraints);
					Overlays.update(Proximities.get().distances, dataset.restraints);
				}
				if(!angular.isUndefined(dataset.hic_data)) {
					var chromosomeIndex = 0;
					if (dataset.object.chromosomeIndex) {
						chromosomeIndex = dataset.object.chromosomeIndex;	
					}
					var offset=0;
					var resolution = dataset.object.resolution;
					for(var i=0;i<chromosomeIndex;i++) offset += Math.round(dataset.object.chromEnd[l]/resolution)-Math.round(dataset.object.chromStart[l]/resolution)+1; 
					
					var posStart = (dataset.object.chromStart[chromosomeIndex]/resolution + offset)-dataset.object.chromStart[0]/resolution;
					var posEnd = (dataset.object.chromEnd[chromosomeIndex]/resolution + offset)-(dataset.object.chromStart[0]/resolution);
					Hic_data.set(dataset.hic_data,[Math.round(posStart)],[Math.round(posEnd)]); //+1
					
				} else Hic_data.clear();
				Track_data.clear();
				// if (dataset.object.filename) {
				//	var filetype = "tsv";
				//	var resetToDefaults = true;
				//	Overlays.loadTSV(dataset.object.filename, filetype, resetToDefaults);	
				// }
				console.log("Settings, Proximities, Restraints & Overlays initialized.");
			},
			clear: function() {
				while (datasets.loaded.length > 0) {
					datasets.loaded.shift();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded.indexOf(index);
				datasets.loaded.splice(dataset, 1);
				return datasets;
			},
			getSpecies: function(index) {
				if(typeof datasets.loaded[index].object.species === 'undefined' && typeof datasets.loaded[index].object.taxon_id !== 'undefined') {
					var dataUrl = "https://www.ebi.ac.uk/ena/data/taxonomy/v1/taxon/tax-id/"+ datasets.loaded[index].object.taxon_id;
				    return $http({method:"GET", url:dataUrl}).then(function(result){
				       console.log('Retrieved species ' + result.data.scientificName + ' from taxon_id '+datasets.loaded[index].object.taxon_id);
				       return result.data.scientificName;
				    });    
				} else {
					return datasets.loaded[index].object.species;
				}
			},
			setSpeciesUrl: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var species,speciesUrl;
				var mygetSpecie = this.getSpecies(index);
				if(typeof datasets.loaded[index].object.species !== 'undefined') {
					speciesUrl = datasets.loaded[index].object.species.replace(/[^a-z0-9]/gi, '_').toLowerCase();
					datasets.loaded[index].object.speciesUrl = speciesUrl;
					return speciesUrl;
				} else {
					mygetSpecie.then(function(scientificName) {  
				    	datasets.loaded[index].object.species = scientificName;
						speciesUrl = scientificName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
						datasets.loaded[index].object.speciesUrl = speciesUrl;
						return speciesUrl;
				     });
				}
			},
			setRegion: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var chromosomeIndex = 0;
				if (datasets.loaded[index].object.chromosomeIndex) {
					chromosomeIndex = datasets.loaded[index].object.chromosomeIndex;	
				}
				var chrom = datasets.loaded[index].object.chrom[chromosomeIndex];
				var chromStart = datasets.loaded[index].object.chromStart[chromosomeIndex];
				var chromEnd = datasets.loaded[index].object.chromEnd[chromosomeIndex];
				
				var region = chrom + ":" + chromStart + "-" + chromEnd;
				datasets.loaded[index].object.region = region;
				return region;
			},
			set: function(index) {
				if (index !== undefined || index !== false) datasets.current.index = index;
				this.setCluster(datasets.current.cluster); // need to determine which cluster is current?
				var dataset = datasets.loaded[datasets.current.index];
				return dataset;
			},
			setCluster: function(ref) { // from cluster ref
				ref = ref || 1; // from ref or just set as the first cluster
				datasets.current.cluster = ref;
				var clusterCentroid = this.getCentroid(datasets.current.cluster);
				this.setCentroid(clusterCentroid);
				var cluster = this.getCluster();
				return cluster; // array of model indices
			},
			setCentroid: function(ref) { // from model ref
				ref = ref || this.getCentroid(); // from ref or from current cluster
				datasets.current.centroid = ref;
				var centroid = this.setModel(datasets.current.centroid);
				return centroid; // array of vertices
			},
			setModel: function(ref,chromosomeIndex) { // from model ref
				ref = ref || this.getCentroid();
				var model = this.getModel(ref,chromosomeIndex);
				// Store as current model for dataset in datasets.loaded[datasets.current.index].data
				datasets.loaded[datasets.current.index].data = model;
				Proximities.set(model.data);
				return model; // array of vertices
			},
			get: function() {
				return datasets;
			},
			getDataset: function(index) {
				if (index === undefined || index === false) index = datasets.current.index;
				var dataset = datasets.loaded[index];
				return dataset;
			},
			getCluster: function(ref) { // from cluster ref
				ref = ref || datasets.current.cluster;
				var cluster = datasets.loaded[datasets.current.index].clusters[ref - 1];
				return cluster; // array of model refs
			},
			getClusterId: function() { 
				return datasets.current.cluster;
			},
			getCentroid: function(ref) { // from cluster ref (NOT model ref)
				ref = ref || datasets.current.cluster;
				var centroid = datasets.loaded[datasets.current.index].centroids[ref - 1];
				return centroid; // single model ref
			},
			getModel: function(ref, chromosomeIndex) { // from model ref
				var self = this;
				ref = ref || this.getCentroid();
				var dataset = self.getDataset();
				var settings = Settings.get();
				if (chromosomeIndex === undefined || chromosomeIndex === false) chromosomeIndex = [dataset.object.chrom[0]];
				
				var chromIdx;
				var chromStart = [];
				var chromEnd = [];
				var resolution = dataset.object.resolution;
				var offset = 0;
				for (var l = 0 ; l < dataset.object.chrom.length; l++) {
					chromIdx = chromosomeIndex.indexOf(dataset.object.chrom[l]);
					if(chromIdx > -1) {
						chromStart.push(Math.round((dataset.object.chromStart[l]-dataset.object.chromStart[0])/resolution)+offset);
						chromEnd.push(Math.round((dataset.object.chromEnd[l]-dataset.object.chromStart[0])/resolution)+offset);
					}
					offset += Math.round(dataset.object.chromEnd[l]/resolution)-Math.round(dataset.object.chromStart[l]/resolution);
				}
				
				var models = datasets.loaded[datasets.current.index].models;
				model.data = [];
				// console.log(ref);
				for (var i = models.length - 1; i >= 0; i--) {
					if (models[i].ref == ref) {
						for (var k = 0 ; k < chromStart.length; k++) {
							for (var j = dataset.object.components*(chromStart[k]) ; j < dataset.object.components*(chromEnd[k]); j += 3) {
								model.data.push(models[i].data[j],models[i].data[j+1],models[i].data[j+2]);
							}
						}
					}
				}
				// console.log(model);
				model.ref = ref;
				return model; // array of model vertices
			},
			loadHic: function() {
				var dataset = this.getDataset();
				return Hic_data.loadExternal(dataset);
			},
			parse: function(data) {
				Papa.DefaultDelimiter = " ";
				var parsedData = Papa.parse(data,{
					dynamicTyping: true,
					skipEmptyLines: true,
					fastMode: true,
					beforeFirstChunk: function(chunk) {
				      var rows = chunk.split( /\r\n|\r|\n/ );
				      var cleaned_rows = [];
				      for(var i=0;i<rows.length;i++) {
				      	if(rows[i].indexOf('#')!==0) cleaned_rows.push(rows[i]);
				      }
				      return cleaned_rows.join('\r\n');
				    }
				});
				return parsedData;
			},
			import: function(fileData, skipRows, bp_per_nm, selectedCols) {
				var self = this;
				// TODO: if not valid fileData return...
				skipRows = skipRows || 0;
				selectedCols = selectedCols || [];

				var parsedData;
				var dataType = Resources.whatIsIt(fileData);
				if (dataType == "String") {
					parsedData = self.parse(fileData).data;
				} else {
					parsedData = fileData; // already parsed to JSON object
				}

				var dataset = datasets.loaded[datasets.current.index];
				var settings = Settings.get();
				var chromosomeIndex = settings.current.chromosomeIndexes;
				var resoData = 1;
				var importedCoords = 0;
				var resolution = settings.current.segmentLength*settings.current.particleSegments;
				var cur_model,offset;
				var i,j,k;
				
				if(dataset.models.length>0) {
					var ref = this.getCentroid();
					for (i = dataset.models.length - 1; i >= 0; i--) {
						if (dataset.models[i].ref == ref) {
							cur_model = dataset.models[i];
							break;
						}
					}
					for (j = 0; j < cur_model.data.length; j++) {
						cur_model.data[j] = 0;
					}
				} else {
					cur_model = {"ref": 1,"data": [] };
					offset = 0;
					for (i = 0 ; i < dataset.object.chrom.length; i++) {
						offset += Math.round(dataset.object.chromEnd[i]/resolution)-Math.round(dataset.object.chromStart[i]/resolution);
					}
					for (j = 0; j < offset; j++) {
						cur_model.data.push(0,0,0);
					}
					dataset.models.push(cur_model);
					dataset.centroids.push(1);
					dataset.clusters.push([1]);
					datasets.current.centroid = 1;
					datasets.current.cluster = 1;
				}
				var scale = bp_per_nm / 0.01;
				var pos,x,y,z,nb,startb,endb,chr_bins;
				offset = 0;
				
				for (i = 0 ; i < dataset.object.chrom.length; i++) {
					chr_bins = Math.round(dataset.object.chromEnd[i]/resolution)-Math.round(dataset.object.chromStart[i]/resolution);
					for (j = 0; j < 3*chr_bins; j+=3) {
						startb = (dataset.object.chromStart[i])+(j/3)*resolution;
						endb = startb + resolution;
						k = skipRows;
						while(true) {
							if(k>=parsedData.length) break;
							nb = 0;
							x = y = z = 0;
							while ( (dataset.object.chrom[i] == parsedData[k][0].toString() || dataset.object.chrom[i] == parsedData[k][0].toString().replace('chr','')) && 
									(parsedData[k][1]*resoData>=startb) && 
						    		(parsedData[k][1]*resoData<endb) 
						    ) {
								
								x += parsedData[k][2];
						    	y += parsedData[k][3];
						    	z += parsedData[k][4];
						    	nb++;
						    	if(k>=parsedData.length-1) break;
						    	k++;
								
						    }
							if(nb>0) {
								cur_model.data[j+3*offset] = scale * Math.round(x/nb);
						    	cur_model.data[j+3*offset+1] = scale * Math.round(y/nb);
						    	cur_model.data[j+3*offset+2] = scale * Math.round(z/nb);	
								importedCoords++;
								break;
							}
							k++;
							
						}
						
					}
					offset += chr_bins;
				}
				
				
				

				return importedCoords;
			},
/*			parse: function(indata) {
				// split content based on new line
			    var allTextLines = indata.split(/\r\n|\n/);
			    var headers = allTextLines[0].split(',');
			    var lines = [];

			    for ( var i = 0; i < allTextLines.length; i++) {
			        // split content based on comma
			        var data = allTextLines[i].split(',');
			        if (data.length == headers.length) {
			            var tarr = [];
			            for ( var j = 0; j < headers.length; j++) {
			                tarr.push(data[j]);
			            }
			            lines.push(tarr);
			        }
			    }
			    return lines;
			},*/
		};
	}
})();

(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Ensembl', Ensembl);

	function Ensembl($q, $http, Settings) {
		var ensembl = {
			ping : 0
		};
		return {
			ping: function() {
				console.log("Pinging Ensembl RESTful genomic data server...");
				var deferral = $q.defer();
				var dataUrl = "http://rest.ensemblgenomes.org/info/ping?content-type=application/json";
				$http.get(dataUrl)
				.then(function(data){
					ensembl.ping = data.data.ping;
					console.log("Ensembl RESTful is contactable.");
				});
				return deferral.promise;
			},
			load: function(overlay) {
				// TODO: clear odd colors while loading...
				var deferral = $q.defer();
				var dataUrl;
				var settings = Settings.get();
				var species = settings.current.species;
				var speciesUrl = settings.current.speciesUrl;
				// var chromosomeIndex = 0;
				// if (datasetObject.chromosomeIndex) {
				// 	chromosomeIndex = datasetObject.chromosomeIndex;	
				// }
				var chrom = settings.current.chrom;
				var chromStart = settings.current.chromStart;
				var chromEnd = settings.current.chromEnd;
				var self = this;
				var online = Settings.getOnline();
				if (online) {
					dataUrl = overlay.object.url[0] + speciesUrl + overlay.object.url[2] + chrom + overlay.object.url[4] + chromStart + overlay.object.url[6] + chromEnd + overlay.object.url[8];
				} else {
					dataUrl = "assets/offline/" + speciesUrl + "-genes.json";
				}
				$http.get(dataUrl)
				.then(function(data){
					var genes = self.setBiotypeStyle(data.data);
					overlay.data = genes;
					var region = chrom + ":" + chromStart + "-" + chromEnd;
					var source = online ? "Ensembl" : "local storage";
					console.log("Genes for " + species + " "+ region + " retreived from " + source + ".");
					deferral.resolve(overlay);
				});
				return deferral.promise;
			},
			setBiotypeStyle: function(genes) {
				// This generates a index in lowercase to be used in CSS styling
				// now running directly in segmentFeatures
				angular.forEach(genes, function(gene, key) {
					// var biotypeStyle = gene.biotype.replace(/_/g, '-').toLowerCase(); // SWAP underscores for dashes
					var biotypeStyle = gene.biotype.toLowerCase();
					gene.biotypeStyle = biotypeStyle;
				});
				return genes;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Hic_data', Hic_data);

	function Hic_data($q, $http, Resources, Storyboards) {
		var hic_data = {
			n: 0,
			max: 0,
			min: 99999999999,
			pos: [],
			value: [],
			tads: []
		};
		var interaction_freq = 0;
		return {
			set: function (datasetHic_data, starts, ends) {
				var self = this;
				self.clear();
				hic_data.n = parseInt(datasetHic_data.n);
				
				var x,y,j,k,pos,new_pos;
				var i = 0;
				var n = 0;
				var tot_n = 0;
				var offset = [0];
				for (j = 0; j < starts.length; j++) {
					tot_n += ends[j]-starts[j];
					offset.push(tot_n);
				}
				for (j = 0; j < starts.length; j++) {
					n = ends[j]-starts[j];
					for (pos in datasetHic_data.data) {
						//hic_data.x.push(Math.floor(parseInt(pos)%hic_data.n));
						//hic_data.y.push(Math.floor(parseInt(pos)/hic_data.n));
						x = Math.floor(parseInt(pos)%hic_data.n);
						y = Math.floor(parseInt(pos)/hic_data.n);
						new_pos=-1;
						if ((x >= (starts[j]) && x <= (ends[j]-1)) && (y >= (starts[j]) && y <= (ends[j]-1))) {
							new_pos=(x-(starts[j])+offset[j])+(y-(starts[j])+offset[j])*tot_n;
						} else {
							for (k = 0; k < j; k++) {
								if (((x >= (starts[j]) && x <= (ends[j]-1)) && (y >= (starts[k]) && y <= (ends[k]-1)))) {
									new_pos=(x-(starts[j])+offset[j])+(y-(starts[k])+offset[k])*tot_n;
									break;
								}   
								if (((x >= (starts[k]) && x <= (ends[k]-1)) && (y >= (starts[j]) && y <= (ends[j]-1)))) {
									new_pos=(x-(starts[k])+offset[k])+(y-(starts[j])+offset[j])*tot_n;
									break;
								}
							}
						}
						if(new_pos > -1) {
							hic_data.pos.push(parseInt(new_pos));
							hic_data.value.push(datasetHic_data.data[pos]);
							if(datasetHic_data.data[pos]<hic_data.min) hic_data.min = datasetHic_data.data[pos];
							if(datasetHic_data.data[pos]>hic_data.max) hic_data.max = datasetHic_data.data[pos];
							i++;	
						}
						if ((x > (ends[j]-1)) && (y > (ends[j]-1))) {
							break;
						}
					}
				}
				hic_data.n = tot_n;
				 
				if(!angular.isUndefined(datasetHic_data.tads))	self.setTADS(datasetHic_data.tads);
				else self.setTADS([]);
				
				return hic_data;
			},
			getDiff: function (data1, data2, ratio, starts, ends) {
				
				var dataf = {
	    			n: 0,
	    			max: 0,
	    			min: 99999999999,
	    			pos: [],
	    			value: [],
	    			tads: []
	    		};
				var self = this;
				var x,y,j,k,pos,pos2,new_pos,val;
				var i = 0;
				var n = 0;
				var tot_n = 0;
				var offset = [0];
				for (j = 0; j < starts.length; j++) {
					tot_n += ends[j]-starts[j];
					offset.push(tot_n);
				}
				for (j = 0; j < starts.length; j++) {
					n = ends[j]+offset[j];
					for (pos = 0; pos < data1.n*data1.n; pos++) {
						x = Math.floor(parseInt(pos)%data1.n);
						y = Math.floor(parseInt(pos)/data1.n);
						new_pos=-1;
						if ((x >= (starts[j]) && x <= (ends[j]-1)) && (y >= (starts[j]) && y <= (ends[j]-1))) {
							new_pos=(x-(starts[j])+offset[j])+(y-(starts[j])+offset[j])*tot_n;
						} else {
							for (k = 0; k < j; k++) {
								if (((x >= (starts[j]) && x <= (ends[j]-1)) && (y >= (starts[k]) && y <= (ends[k]-1)))) {
									new_pos=(x-(starts[j])+offset[j])+(y-(starts[k])+offset[k])*tot_n;
									break;
								}   
								if (((x >= (starts[k]) && x <= (ends[k]-1)) && (y >= (starts[j]) && y <= (ends[j]-1)))) {
									new_pos=(x-(starts[k])+offset[k])+(y-(starts[j])+offset[j])*tot_n;
									break;
								}
							}
						}
						if(new_pos > -1) {
							val = -1;
							if(pos in data1.data) val = (1-ratio)*data1.data[pos];
							pos2 = x + y*data2.n;
							if(val >= 0 && pos2 in data2.data) {
								val -= ratio*data2.data[pos2];
								dataf.pos.push(parseInt(new_pos));
								dataf.value.push(val);
								if(val<dataf.min) dataf.min = val;
								if(val>dataf.max) dataf.max = val;
							}
							i++;	
						}
						if ((x > (ends[j]-1)) && (y > (ends[j]-1))) {
							break;
						}
					}
				}
				dataf.n = tot_n;
				/*if(dataf.min < 0) {
					for(i=0;i<dataf.value.length;i++) {
						dataf.value[i] += -dataf.min;
					}
					dataf.max += -dataf.min;
					dataf.min = 0;
				}*/
				
				return dataf;
			},
			setDirect: function (datasetHic_data) {
				var self = this;
				self.clear();
				hic_data = datasetHic_data;
							
				return hic_data;
			},
			setInteractionFreq: function (freq) {
				interaction_freq = freq;
							
				return;
			},
			setTADS: function (datasetTADS) {
				hic_data.tads = datasetTADS;
			},
			get: function() {
				return hic_data;
			},
			loadExternal: function(dataset) {
				
				var self = this;
				self.clear();
				var hic_panel = Storyboards.getComponentById('Hic Data');
				if(angular.isUndefined(hic_panel.view.settings.species_data[dataset.object.speciesUrl])) return false;
				var dataUrl = hic_panel.view.settings.species_data[dataset.object.speciesUrl].url;
				//dataUrl += '&res=10000';
				dataUrl += '&res='+dataset.object.resolution;
				var chrom = dataset.object.chrom[0].replace('chr','');
				dataUrl += '&chr='+chrom+'&limit_chr='+chrom;
				//dataUrl += '&chr=1&limit_chr=1';
				dataUrl += '&start='+dataset.object.chromStart+'&end='+dataset.object.chromEnd+'&limit_start='+dataset.object.chromStart+'&limit_end='+dataset.object.chromEnd;
				
				var deferred = $q.defer();
			    
				$http.get(dataUrl)
				.then( function(datasetHic) {
					var datasetHic_data = datasetHic.data;
					var hic_data = {
							n: 0,
							max: 0,
							min: 99999999999,
							pos: [],
							value: [],
							tads: []
					};
					var start_pos = parseInt(datasetHic_data.start);
					var end_pos = parseInt(datasetHic_data.end);
					hic_data.n = Math.round((end_pos-start_pos)/datasetHic_data.resolution);
					for (var val_id in datasetHic_data.values) {
						var val = datasetHic_data.values[val_id];
						var col,row;
						if(val.chrA == val.chrB && val.startA < end_pos && val.startA >= start_pos && val.startB < end_pos && val.startB >= start_pos) {
							col = (val.startB-start_pos)/datasetHic_data.resolution;
							row = (val.startA-start_pos)/datasetHic_data.resolution;
							hic_data.pos.push(Math.round(row*hic_data.n+col));
							hic_data.value.push(val.value);
							if(val.value<hic_data.min) hic_data.min = val.value;
							if(val.value>hic_data.max) hic_data.max = val.value;
						}	
					}
					self.setDirect(hic_data);
					deferred.resolve(hic_data);
				});
				return deferred.promise;
				
			},
			clear: function() {
				hic_data = {
						n: 0,
						max: 0,
						min: 99999999999,
						pos: [],
						value: [],
						tads: []
				};
			},
			import: function(fileData, skipRows, offset_bin, selectedCols, n) {
				var self = this;
				// TODO: if not valid fileData return...
				skipRows = skipRows || 0;
				selectedCols = selectedCols || [];

				self.clear();

				var parsedData;
				var dataType = Resources.whatIsIt(fileData);
				if (dataType == "String") {
					parsedData = self.parse(fileData).data;
				} else {
					parsedData = fileData; // already parsed to JSON object
				}

				var i;
				var colnum = [];
				for(i=0; i<selectedCols.length; i++) {
					if(selectedCols[i]) colnum.push(i);
				}
				
				hic_data.n = n;
				for (i = skipRows ; i < parsedData.length; i++) {

					var val = parseFloat(parsedData[i][colnum[2]]);
					var row = parseInt(parsedData[i][colnum[0]])-offset_bin;
					var col = parseInt(parsedData[i][colnum[1]])-offset_bin;
					if(row>hic_data.n || col>hic_data.n) break;
					hic_data.pos.push(Math.round(row*hic_data.n+col));
					hic_data.value.push(val);
					if(val<hic_data.min) hic_data.min = val;
					if(val>hic_data.max) hic_data.max = val;
				
				}
				
				return hic_data.n;
			},
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.service('initMain', initMain);

	function initMain($q, Settings, Components, Storyboards, Overlays, Users, Datasets) {

		return function() {
			var settings = Settings.load();
			//var users = Users.load();
			//var projects = Projects.load();
			//var datasets = Datasets.get();
			var overlays = Overlays.load();
			var components = Components.load();
			var storyboards = Storyboards.load();
			//var featureColors = Resources.loadBiotypeColors();

			return $q.all([settings, components, storyboards])
			.then(function(results){
				return {
					settings: results[0],
					components: results[1],
					storyboards: results[2]
				};
			});
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Networks', Networks);

	function Networks(Color) {
		return {
			linePiecesRGB: function(overlay, edgeCount) {
				// from an array of features colors eg. restraints
				// from an array of color RGB Pairs to match Vertex Pairs
				// eg. [R1,G1,B1,R2,G2,B2,R1,G1,B1,R3,G3,B3,...Rn,Gn,Bn,Rm,Gm,Bm]
				// such that all color pairs are represented uniquely
				// ie. one half of matrix where array length = (n^2-n)/2
				// eg.  1 2 3 4
				//     1  x x x  ==  1-2 1-3 1-4    3
				//     2    x x  ==  2-3 2-4      + 2
				//     3      x  ==  3-4          + 1
				//     4         ==  ((4*4)-4)*0.5  = 6 pairs of colors
				var self = this;
				var featuresCount = overlay.data.length;
				var usedEdgeCount = edgeCount*6;
				if( usedEdgeCount > Math.pow(2, 10)-1) usedEdgeCount = Math.pow(2, 10)-1;
				var colorPairs = new Float32Array(usedEdgeCount); // ie. * 2 (vertices) * 3 (RGB)
				var defaultRGB = new THREE.Color("#000000");
				for (var h = colorPairs.length - 1; h >= 0; h--) {
					colorPairs[i] = defaultRGB;
				}
				var randomRGB = Color.getRandomRGB(featuresCount);
				for (var i = 0; i < featuresCount; i++) {
					var particle1 = overlay.data[i][0];
					var particle2 = overlay.data[i][1];
					var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount) * 6;
					var RGB = randomRGB[i];
					if (overlay.object.id == "restraints"){
						var restraintsColors = {"H":"#4CAF50","L":"#0000ff","U":"#ff00ff","C":"#00ff00"};
						RGB = self.getFeatureRGB(overlay.data[i][2], restraintsColors);
					}
					// vertex 1
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b; pairIndex++;
					// vertex 2
					colorPairs[pairIndex] = RGB.r; pairIndex++;
					colorPairs[pairIndex] = RGB.g; pairIndex++;
					colorPairs[pairIndex] = RGB.b;
				}
				colorPairs.name = "Network LinePieces RGB";
				// console.log(colorPairs);
				return colorPairs;
			},
			linePiecesAlpha: function(overlay, edgeCount) {
				var self = this;
				var usedEdgeCount = edgeCount*2;
				if( usedEdgeCount > Math.pow(2, 10)-1) usedEdgeCount = Math.pow(2, 10)-1;
				
				var alphaPairs = new Float32Array(usedEdgeCount); // ie. * 2 (vertices)
				var defaultAlpha = 0.0;
				for (var h = alphaPairs.length - 1; h >= 0; h--) {
					alphaPairs[h] = defaultAlpha;
				}
				if (overlay.data) {
					var featuresCount = overlay.data.length;
					for (var i = 0; i < featuresCount; i++) {
						var particle1 = overlay.data[i][0];
						var particle2 = overlay.data[i][1];
						var pairIndex = self.getMatrixIndex(particle1, particle2, edgeCount);
						var alpha = (overlay.data[i][3] * overlay.data[i][3]) / 5;
						// if (overlay.data[i][2] == ("U"||"C")) alpha = 0.0;
						alphaPairs[pairIndex] = alpha; pairIndex++;
						alphaPairs[pairIndex] = alpha;
					}
				}
				alphaPairs.name = "Network LinePieces Alphas";
				// console.log(alphaPairs);
				return alphaPairs;
			},
			getMatrixIndex: function(row, col, size) {
				// Matrix size == array.length
				var index = 0;
				var sigma = row - 1;
				for (var i = 0; i <= sigma; i++){
					index += (size - (size - i));
				}
				index += (col - row) - 1;
				return index;
			},
			getFeatureRGB: function(code, colors) {
				colors = colors || {"0":"#000000"};
				var RGB;
				angular.forEach(colors, function(color, key) {
					if (code == key) {
						RGB = new THREE.Color(color);
					}
				});
				return RGB;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Overlays', Overlays);

	function Overlays($q, $http, uuid4, d3Service, Settings, Storyboards, Ensembl, Segments, Networks, Resources) {
		var overlays = {
			loaded : [],
			current : {index:-1}
		};

		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-overlays.json";
				if( overlays.loaded.length > 0 ) {
					deferral.resolve(overlays);
				} else {
					$http.get(dataUrl)
					.then( function(data) {
						overlays.loaded = data.data;
						overlays.current.index = overlays.loaded.length - 1;
						console.log("Overlays (" + data.data.length + ") loaded from " + dataUrl);
						deferral.resolve(overlays);
					});
				}
				return deferral.promise;
			},
			loadTSV: function(filename, filetype, defaults) {
				filename = filename || "tk-example-dataset";
				filetype = filetype || "tsv";
				if (typeof defaults === 'undefined') defaults = true;

				var self = this;
				if (defaults) {
					self.defaults();	
					Storyboards.defaultComponents();
				}

				var deferral = $q.defer();
				var datapath = "defaults";
				if (filename != "tk-example-dataset") datapath = "examples";
				var dataUrl = "assets/" + datapath + "/" + filename + "." + filetype;
				$http.get(dataUrl)
				.then( function(fileData) {
					var importedOverlays = self.import(fileData,[],[],defaults);
					console.log("Overlays (" + importedOverlays.length + ") imported from " + dataUrl);
					deferral.resolve(overlays);
				})
				.error(function(fileData) {
					console.log("No associated data tracks found.");
				});
				return deferral.promise;
			},
			import: function(fileData, selectedRows, selectedCols) {
				var self = this;
				// TODO: if not valid fileData return...
				selectedRows = selectedRows || [];
				selectedCols = selectedCols || [];

				var parsedData;
				var dataType = Resources.whatIsIt(fileData);
				if (dataType == "String") {
					parsedData = self.parse(fileData).data;
				} else {
					parsedData = fileData; // already parsed to JSON object
				}

				var filteredData;
				if (selectedRows.length > 0 && selectedCols.length > 0) {
					filteredData = self.filter(parsedData, selectedRows, selectedCols);
				} else {
					filteredData = parsedData; // no filtering required
				}

				var aquiredOverlays = self.aquire(filteredData);
				self.add(aquiredOverlays);

				return aquiredOverlays;
			},
			parse: function(data) {
				Papa.DefaultDelimiter = " ";
				var parsedData = Papa.parse(data,{
					dynamicTyping: true,
					skipEmptyLines: true,
					fastMode: true
				});
				return parsedData;
			},
			filter: function(dataTable, selectedRows, selectedCols) {
				// dataTable [[row1col1,row1col2...],[row2col1,row2col2...]...]
				// Remove rows/cols marked false in selectedRows/Cols arrays
				var filteredData = [];
				var rows = selectedRows.length;
				var cols = selectedCols.length;
				for (var i = 0; i < rows; i++) {
					var newRow = [];
					if (selectedRows[i]) {
						for (var j = 0; j < cols; j++) {
							if (selectedCols[j]) newRow.push(dataTable[i][j]); // else column not added
						}
						filteredData.push(newRow);
					} // else row not added
				}
				return filteredData;
			},
			aquire: function(data) {
				// d3Service.d3().then(function(d3) {
					// var colorRange = ["#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff","#ff0000","#00ff00","#0000ff"];
					var colorFilion = ["#227c4f","#e71818","#8ece0d","#6666ff","#424242"];
					var colorRange = d3.scale.category20();

					// columns to overlays
					// skip row 1 = headers ie. length - 2
					// skip colums 1 and 2 = coords ie. length - 3
					var acquiredOverlays = [];
					// check for bigwig data the step and start
					// var step = 1; // override below if fixed
					// if none find which is start and end eg. Marie's and Filion's data
					// cycle through first lineto determine columns
					// create as BedGraph
					var headerRow = 0;
					var firstDataRow = 1;
					var startColumn = 0;
					var endColumn = 1;
					var colsCount = data[headerRow].length;

					// Check if fixed steps
					var step = data[firstDataRow][endColumn] - data[firstDataRow][startColumn] + 1; // get step from chromEnd to chromStart
					var step2 = data[firstDataRow+1][endColumn] - data[firstDataRow+1][startColumn] + 1; // check next row
					var type, format, stepType;
					if (step == step2) {
						type = "wiggle_0";
						format = "fixed";
						stepType = "fixed";
					} else {
						type = "bedgraph";
						format = "variable";
						stepType = "variable";
					}

					// Check if Filion proteins ie. chromatin colors
					var filion = false;
					if (colsCount == 7){
						var filionProteins = 0;
						for (var h = 2; h < colsCount; h++) { // h=2 to skip start and end cols
							var header = data[headerRow][h].toLowerCase();
							if (header=="hp1" || header=="brm" || header=="mrg15" || header=="pc" || header=="h1") filionProteins++;
						}
						if (filionProteins == 5) filion = true;
					}

					for (var i = colsCount - 1; i >= 2; i--) { // i >= 2 to skip, start and end columns
						var colored;
						if (filion) {
							colored = colorFilion[i-2];
						} else {
							colored = colorRange(i);
						}				
						acquiredOverlays.unshift(
							{
								"metadata": {
									"version" : 1.0,
									"type" : "overlay",
									"generator" : "TADkit"
								},
								"object" : {
									"uuid" : uuid4.generate(),
									"id" : data[headerRow][i],
									"title" : data[headerRow][i],
									"source" : "Research output",
									"url" : "local",
									"description" : "center_label", //also BigWig description (track title): "User Supplied Track"
									"type" : type, //also BigWig type
									"format" : format,
									"components" : 2,
									"name" : data[headerRow][i], //BigWig: "User Track"
									"visibility" : "full", //BigWig: "full", "dense" or "hide"
									"color" : colored, // random from D3.js function. NOTE: convert to RGB for BigWig: eg. 255,255,255
									"altColor" : "#cccccc", // light grey gives best 3D render vis. NOTE: convert to RGB for BigWig: eg. 128,128,128
									"priority" : "100", //BigWig: 100
									"stepType" : stepType, //BigWig: "variable" or "fixed"
									"chrom" : "", //BigWig: derive from dataset...???
									"start" : data[firstDataRow][startColumn], //BigWig
									"step" : step, //BigWig
									"state" : {
										"index" : 0, // make real index???
										"overlaid" : false
									}
								},
								"palette" : [colored,"#cccccc"],
								"data" : [],
								"colors" : {
									"particles" : [],
									"chromatin" : [],
									"network" : {
										"RGB" : [],
										"alpha" : []
									}
								}
							}
						);
						// convert column data to array
						for (var j = data.length - 1; j >= 1; j--) { // j >= 1 to skip first header row
							if (format == "variable") {
								acquiredOverlays[0].data.unshift({
									"start" : data[j][startColumn],
									"end" : data[j][endColumn],
									"read" : data[j][i]
								});
							} else {
								acquiredOverlays[0].data.unshift(data[j][i]);
							}				
						}
					}
					return acquiredOverlays;
				// }); // End d3 Service
			},
			add: function(importedOverlays) {
				var self = this;
				// convert to function in Overlays service
				var newOverlays = [];
				var currentOverlaysIndex = overlays.loaded.length - 1;
				angular.forEach(importedOverlays, function(overlay, key) {
					var overlayExists = false;
					// for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						// console.log(overlays.loaded[i].object.uuid);
						// console.log(overlay.object.uuid);
						// if (overlays.loaded[i].object.uuid == overlay.object.uuid) overlayExists = true;
					// }
					if (!overlayExists) {
						currentOverlaysIndex++;
						overlay.object.state.index = currentOverlaysIndex;
						overlay.object.state.overlaid = false;
						newOverlays.push(overlay);
						Storyboards.addComponent(overlay);
					}
				});
				// Add newOverlays to Overlays
				overlays.loaded = overlays.loaded.concat(newOverlays);
				// Generate colors arrays for new overlays
				self.segment();

				return newOverlays;
			},
			addDirect: function(newOverlay) {
				var self = this;
				var currentOverlaysIndex = overlays.loaded.length - 1;
				for (var i = overlays.loaded.length - 1; i >= 0; i--) {
					if (overlays.loaded[i].object.uuid == newOverlay.object.uuid) return true;
				}
				currentOverlaysIndex++;
				newOverlay.object.state.index = currentOverlaysIndex;
				overlays.loaded = overlays.loaded.concat(newOverlay);
				
				return currentOverlaysIndex;
			},
			clear: function() {
				while (overlays.loaded.length > 0) { // remove all overlays
					overlays.loaded.shift();
				}
			},
			defaults: function() {
				while (overlays.loaded.length > 4) { // remove all except defaults
					overlays.loaded.pop();
				}
			},
			remove: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var overlay = overlays.loaded.indexOf(index);
				overlays.loaded.splice(overlay, 1);
				return overlays;
			},
			set: function(index) {
				if (index !== undefined || index !== false) overlays.current.index = index;
				var current = overlays.loaded[overlays.current.index];
				return current;
			},
			setOverlaid: function (index) {
				index = index || "";
				angular.forEach(overlays.loaded, function(overlay) {
					if (overlay.object.state.index === index) {
						overlay.object.state.overlaid = true;
					} else {
						overlay.object.state.overlaid = false;
					}
				});
				return index;
			},
			update: function(distances, restraints) {
				// things that need updating for changes:
				// - ext.data eg. Ensembl
				// - proximities (derived from datsets)
				// - segments (derived from datsets)
				var self = this;
				var overlaysAsync = []; // push async functions into list for subsequent processing
				var overlaysToUpdate = [];
				angular.forEach(overlays.loaded, function(overlay, key) {

					// For Overlays with Aync Ensembl Data eg. genes
					// check if changed...
					if (overlay.object.type == "ensembl") { // more generic than id == "genes"
						var ensembl = Ensembl.load(overlay);
						overlaysAsync.push(ensembl);
						overlaysToUpdate.push(overlay);
					}

					if (overlay.object.id == "proximities") {
						overlay.data = distances;
					}

					if (overlay.object.id == "restraints") {
						overlay.data = restraints;
					}

				});
				return $q.all(overlaysAsync)
				.then(function(results) {
					for (var i = 0; i < overlaysToUpdate.length; i++) {
						Storyboards.update(overlaysToUpdate[i]);
					}
					self.segment();
					return results;
				});

			},
			segment: function() {
				var settings = Settings.get();
				var self = this; // SYNChronous functions...
				angular.forEach(overlays.loaded, function(overlay, key) {
					// check if colors already exist (for chromatin as principal set) or number of segments have changed
					var test = true;
					if (test) {
					// if (!overlay.colors.chromatin || overlay.colors.chromatin.length === 0) { // ??? || (overlay.colors.chromatin && segmentsCount != settings.segmentsCount)
						// run function based on object type
						var type = overlay.object.type;
						var format = overlay.object.format;
						if (type == "gradient" && format == "hex") {
							// palette must contain 2 hex values
							overlay.colors.particles = Segments.gradientHCL(overlay, settings.current.particlesCount);
							var counts = [];
							var resolution = settings.current.segmentLength*settings.current.particleSegments;
							var num_segments = 0;
							for (var l = 0 ; l < settings.current.chromosomeIndexes.length; l++) {
								num_segments = Math.round((settings.current.chromEnd[l]-settings.current.chromStart[l])/resolution);
								counts.push(num_segments*settings.current.particleSegments);
							}
							overlay.colors.chromatin = Segments.gradientHCL(overlay, settings.current.segmentsCount, counts);
							overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
							overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
						} else if (type == "wiggle_0" && format == "fixed") {
							// OJO! create additional option for format = "bigwig-variable"
							overlay.colors.particles = Segments.bicolor(overlay, settings.current.particlesCount);
							overlay.colors.chromatin = Segments.bicolor(overlay, settings.current.segmentsCount);
							overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
							overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
						} else if (type == "wiggle_0" && format == "variable") {
							// To Do...
						} else if (type == "bedgraph") {
							overlay.colors.particles = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.particlesCount, 1);
							overlay.colors.chromatin = Segments.bicolorVariable(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength);
							overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
							overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
						} else if (type == "matrix") {
							// Distances are per edge so just convert to color
							overlay.colors.particlesMatrix = Segments.matrix(overlay, 1); // ie. per particle
							overlay.colors.chromatinMatrix = Segments.matrix(overlay, settings.current.particleSegments);
							overlay.colors.networkMatrix = overlay.colors.particlesMatrix; // ie. also color network edges by matrix
							self.at(1, settings.current.particlesCount, settings.current.particleSegments);
						} else if (type == "misc" && format == "variable") { // eg. restraints
							overlay.colors.particles = [];
							overlay.colors.chromatin = [];
							overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
							overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
						} else if (type == "ensembl" && format == "json") {
							// data must have .start and .end
							var features = Resources.get().biotypes;
							var singleSegment = 1;
							overlay.colors.particles = Segments.features(overlay, settings.current.chromStart, settings.current.particlesCount, singleSegment, features);
							overlay.colors.chromatin = Segments.features(overlay, settings.current.chromStart, settings.current.segmentsCount, settings.current.segmentLength, features);
							overlay.colors.network.RGB = Networks.linePiecesRGB(overlay, settings.current.edgesCount);
							overlay.colors.network.alpha = Networks.linePiecesAlpha(overlay, settings.current.edgesCount);
						}
					} else {
						// already segmented
						console.log("Overlay '" + overlay.object.title + "' already segmented as color array matching current dataset length");
					}

				});
				return overlays;
			},
			at: function(currentParticle) {
				var settings = Settings.get();
				angular.forEach(overlays.loaded, function(overlay, key) {
					var type = overlay.object.type;
					if (type == "matrix") {
						var particleStart = (currentParticle - 1) * settings.current.particlesCount;
						var particleEnd = currentParticle * settings.current.particlesCount;
						var chromatinStart = particleStart * settings.current.particleSegments;
						var chromatinEnd = particleEnd * settings.current.particleSegments;

						overlay.colors.particles = overlay.colors.particlesMatrix.slice(particleStart, particleEnd);
						overlay.colors.chromatin = overlay.colors.chromatinMatrix.slice(chromatinStart, chromatinEnd);
						overlay.colors.network = overlay.colors.networkMatrix.slice(particleStart, particleEnd);
					}
				});
				return overlays;
			},
			get: function() {
				return overlays;
			},
			getOverlay: function(index) {
				if (index === undefined || index === false) index = overlays.current.index;
				var overlay = overlays.loaded[index];
				return overlay;
			},
			replaceOverlay: function(overlay, index) {
				if (index === undefined || index === false) index = overlays.current.index;
				overlays.loaded[index] = overlay;
				return;
			},
			getOverlayById: function (id) {
				var overlay, found;
				if (id !== undefined || id !== false) {
					for (var i = overlays.loaded.length - 1; i >= 0; i--) {
						if (overlays.loaded[i].object.id === id) {
							overlay = overlays.loaded[i];
							overlay.object.state.index = i;
							found = true;
							// console.log("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					overlay = overlays.loaded[overlays.current.index];
					overlay.object.state.index = overlays.current.index;
					console.log("Overlay \"" + id + "\" not found: returning current.");
				}
				// console.log(overlay);
				return overlay;
			},
			getCurrentIndex: function() {
				return overlays.current.index;
			}
		};
	}
})();
 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('PathControls', PathControls);

	// constructor for chromatin model instances
	function PathControls() {
		return {
			simple: function(vertices) {
				var division = "EnsemblBacteria";

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = [];
				for (var i = 0 ; i < totalParticles - 1 ; i++) {
					var baseParticle = vertices[i];
					var foreParticle = vertices[i + 1];
					var midCoord = new THREE.Vector3(0,0,0);
					midCoord.addVectors(baseParticle,foreParticle).divideScalar(2);
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midCoord).sub(baseParticle);
					if (i === 0 && division != "EnsemblBacteria") { // insert backprojected first coord
						var preCoord;
						// if (division == "EnsemblBacteria") {
						// 	preCoord = vertices[totalParticles - 1];
						// } else {
							preCoord = new THREE.Vector3(0,0,0);
						// }
						preCoord.copy(baseParticle).sub(midOffset);
						pathControls.push(preCoord);
					}
					//pathControls.push(baseParticle);
					pathControls.push(midCoord);
					// if (i == totalParticles - 2) {
					// //	pathControls.push(foreParticle);
					// 	var chromEnd = new THREE.Vector3(0,0,0);
					// 	chromEnd.copy(foreParticle).add(midOffset);
					// 	pathControls.push(chromEnd);
					// };
					if (i == totalParticles - 2 && division != "EnsemblBacteria") {
					//	pathControls.push(foreParticle);
						var chromEnd;
						// if (division == "EnsemblBacteria") {
						// 	chromEnd = vertices[0];
						// } else {
							chromEnd = new THREE.Vector3(0,0,0);
						// }
						chromEnd.copy(foreParticle).add(midOffset);
						pathControls.push(chromEnd);
					}
				}
				return pathControls;
			},
			cubic: function(vertices, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var controlLength = 1; // variable for possible corner tweaking

				// (totalParticles - 1) because (fore = [i+1])
				var totalParticles = vertices.length;
				var pathControls = {};
				pathControls.vertices = [];
				pathControls.colors = [];
				var previousOffset = new THREE.Vector3(0,0,0);

				// if (closed) {
				// 	var firstParticle = vertices[0];
				// 	var nthParticle = vertices[totalParticles - 1];
				// 	var closedControl = new THREE.Vector3(0,0,0);
				// 	if (closed) closedControl.addVectors(nthParticle, firstParticle).divideScalar(2);
				// }

				for (var i = 0 ; i < totalParticles ; i++) {

					var baseParticle = vertices[i];
					var foreParticle = new THREE.Vector3(0,0,0);
					if (i == totalParticles - 1) {
						if (closed) {
							// fore particle == first particle
							foreParticle = vertices[0];
						} else {
							// fore particle == extend same dist as to previous particle
							// really ???
							//foreParticle.copy(baseParticle).addVectors(baseParticle, vertices[i - 1]);
							foreParticle.copy(baseParticle).add(new THREE.Vector3(0.5, 0.5, 0.5));
						}
					} else {
						foreParticle = vertices[i + 1];
					}
					
					var midControl = new THREE.Vector3(0,0,0);
					// if (i == totalParticles - 1) {
					// 	if (closed) {
					// 		// use first particle mid point as closed chromatin...
					// 		midControl.copy(closedControl);
					// 	} else {
					// 		// use previous particle mid point as no more foreward...
					// 		midControl.addVectors(baseParticle, vertices[i - 1]).divideScalar(2);
					// 	}
					// } else {
						midControl.addVectors(baseParticle, foreParticle).divideScalar(2);
					// }
					
					var midOffset = new THREE.Vector3(0,0,0);
					midOffset.copy(midControl).sub(baseParticle);

					if (i === 0) {
						if (closed) {
							// set previous for first particle
							var previousControl =  new THREE.Vector3(0,0,0);
							previousControl.addVectors(vertices[totalParticles - 1], vertices[0]).divideScalar(2);
							previousOffset.copy(previousControl).sub(vertices[totalParticles - 1]);
						} else {
							previousOffset.copy(midOffset);
						}
					}

					var backControl = new THREE.Vector3(0,0,0);
					backControl.copy(baseParticle).sub(midOffset);

					var foreControl = new THREE.Vector3(0,0,0);
					foreControl.copy(baseParticle).add(previousOffset);

					// Node tangent
					var baseTangent =  new THREE.Vector3(0,0,0);
					baseTangent.subVectors(foreControl, backControl).divideScalar(controlLength);
					backControl.copy(baseParticle).sub(baseTangent);
					foreControl.copy(baseParticle).add(baseTangent);

					// Add controls to array
					pathControls.vertices.push(backControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));
					pathControls.vertices.push(baseParticle);
						pathControls.colors.push(new THREE.Color(0x000000));
					pathControls.vertices.push(foreControl);
						pathControls.colors.push(new THREE.Color(0xcccccc));

					previousOffset = midOffset;
				}
				// add start and end controls
				// requires calc of join midway on cubicBezier between start and end
				var startBackControl = new THREE.Vector3(0,0,0);
				var startPoint = new THREE.Vector3(0,0,0);
				var endForeControl = new THREE.Vector3(0,0,0);
				var endPoint = new THREE.Vector3(0,0,0);

				var totalControls = pathControls.vertices.length;
				var p1 = pathControls.vertices[totalControls-2]; // last particle
				var p2 = pathControls.vertices[totalControls-1]; // last fore control
				var p3 = pathControls.vertices[0]; // first back control
				var p4 = pathControls.vertices[1]; // first particle
				if (closed) {
					// curve between start and end Controls
					var joinCurve = new THREE.CubicBezierCurve3(p1,p2,p3,p4);
					// split join curve in two
					var joinMidpoint = joinCurve.getPointAt(0.5);
					var joinTangent = joinCurve.getTangent(0.5).multiplyScalar(1);

					// NEEDS ROUNDING OFF TO NEAREST 0.5??? Math.round(num*2)/2;
					startBackControl.copy(joinMidpoint).sub(joinTangent);
					startPoint.copy(joinMidpoint);
					endForeControl.copy(joinMidpoint).add(joinTangent);
					endPoint.copy(joinMidpoint);
				} else {
					startBackControl.copy(p3);
					startPoint.copy(p3);
					endForeControl.copy(p2);
					endPoint.copy(p2);
				}
				pathControls.vertices.unshift(startBackControl);
					pathControls.colors.unshift(new THREE.Color(0xffff00));
				pathControls.vertices.unshift(startPoint);
					pathControls.colors.unshift(new THREE.Color(0xff0000));
				pathControls.vertices.push(endForeControl);
					pathControls.colors.push(new THREE.Color(0x00ffff));
				pathControls.vertices.push(endPoint);
					pathControls.colors.push(new THREE.Color(0x0000ff));

				return pathControls;
			}
		};
	}

})();
 (function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Paths', Paths);

	// constructor for chromatin model instances
	function Paths() {
		return {
			splineNearFit: function(controls, segments) {
				var division = "EnsemblBacteria";
				var splinePath;
				if (division == "EnsemblBacteria") {
					splinePath = new THREE.ClosedSplineCurve3(controls);
				} else {
					splinePath = new THREE.SplineCurve3(controls);			
				}
				// var splineDivisions = splinePath.getSpacedPoints(segments);
				return splinePath;
			},
			// Following paths constructed from curve segments passing through particle centers
			spline: function(controls, segments) {
				var division = "NotEnsemblBacteria";
				var curvePath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (division == "EnsemblBacteria") {
					// REVISE THIS
					curvePath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var splineCurve = new THREE.CatmullRomCurve3([p1,p23,p4]);
						curvePath.add(splineCurve);
					}
				}
				return curvePath;
			},			
			quadraticBezier: function(controls, segments) {
				var division = "NotEnsemblBacteria";
				var quadPath = new THREE.CurvePath();
				var totalControls = controls.length;

				if (division == "EnsemblBacteria") {
					// REVISE THIS
					quadPath= new THREE.ClosedSplineCurve3(controls);
				} else {
					for (var i = 1 ; i < totalControls - 2 ; i = i + 3) {
						var p1 = controls[i];
						var p2 = controls[i+1];
						var p3 = controls[i+2];
						var p4 = controls[i+3];

						var p23 = new THREE.Vector3(0,0,0);
						p23.addVectors(p3,p2).divideScalar(2);

						var quadCurve = new THREE.QuadraticBezierCurve3(p1,p23,p4);
						quadPath.add(quadCurve);
					}
				}
				return quadPath;
			},			
			cubicBezier: function(controls, segments, closed) {
				closed = closed || false; // closed if circular chromosome eg. Bacteria
				var cubicPath = new THREE.CurvePath();
				var totalControls = controls.length;
				var cubicCurveStart, cubicCurveEnd;

					// controls[0] == start point
					// controls[1] == start point fore control
					// controls[2] == first particle back control
					// controls[3] == first particle
					// ...
					// n == totalControls - 1
					// controls[n-3] == last particle
					// controls[n-2] == last particle fore control
					// controls[n-1] == end point back control
					// controls[n] == end point (if closed, end point == start point)

					for (var i = 0 ; i < totalControls - 1 ; i = i + 3) {

						var c1 = controls[i];
						var c2 = controls[i+1];
						var c3 = controls[i+2];
						var c4 = controls[i+3];

						var cubicCurve = new THREE.CubicBezierCurve3(c1,c2,c3,c4);
						 cubicPath.add(cubicCurve);
					}
				return cubicPath;
			}
		};
	}

})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Projects', Projects);

	function Projects($q, $http, uuid4) {
		var projects = {
			loaded : [],
			current : {index:0}
		};

		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-projects.json";
				if( projects.loaded.length > 0 ) {
					deferral.resolve(projects);
				} else {
					$http.get(dataUrl)
					.then( function(data) {
						projects.loaded = data.data;
						console.log("Projects (" + data.data.length + ") loaded from " + dataUrl);
						deferral.resolve(projects);
					});
				}
				return deferral.promise;
			},
			add: function(details) {
				var newProject = {
					metadata : {
						version : 1.0,
						type : "project",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						description : details[2],
						group : details[3],
						state : details[4]
					},
					datasets : details[5],
					overlays : details[6],
					storyboards : details[7]
				};
				projects.loaded.push(newProject);
				projects.current = projects.loaded.length - 1;
				return projects;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var project = projects.loaded.indexOf(index);
				projects.loaded.splice(project, 1);
				return projects;
			},
			set: function(index) {
				if (index !== undefined || index !== false) projects.current.index = index;
				var current = projects.loaded[projects.current.index];
				return current;
			},
			get: function() {
				return projects;
			},
			getProject: function(index) {
				if (index === undefined || index === false) index = projects.current.index;
				var project = projects.loaded[index];
				return project;
			},
			getState: function(index) {
				if (index === undefined || index === false) index = projects.current.index;
				var state = projects.loaded[index].object.state;
				return state;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Proximities', Proximities);

	function Proximities() {
		// Matrix - n x m dimensions == particleCount */
		var proximities = {
			dimension: 0,
			positions: [],
			distances: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			positions: [],
			distances: []
		};
		return {
			set: function (vertices, settings) {
				// Generate a matrix of proximity between points
				// from vertices = array of point coordinates components
				// up to minDistance = threshold for proximity
				// eg. [u1,v1,z1,w1,y1,z1,x1,u2,v2,w2,x2,y2,z2 ... un,vn,wn,xn,yn,zn]
				
				// To be used by THREE.Line( geometry, material, THREE.LinePieces )
				// where LinePieces is the equivalent to GL_LINES in OpenGL terms.
				// THREE.LinePieces will draw a series of pairs of segments
				// ie. (u1,v1,w1) to (x1,y1,z1), (u2,v2,w2) to (x2,y2,z2), etc.

				// Stored in proximities object {positions:[],distances[]}
				// as vertex components (rather than THREE.Vertex)
				// for processing as THREE.BufferGeometry attributes:
				// 'position' as positions; 'color' derived from distances.

				var defaults = {
					minDistance: 150,
					maxDistance: 400,
					limitConnections: true,
					maxConnections: 200
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				this.maxDistance = this.getMaxDistance(vertices);

				var vertexpos = 0;
				var distancepos = 0;

				proximities.dimension = vertices.length / 3; // 3 == xyz components of vertices
				var lines = proximities.dimension * proximities.dimension; // matrix of all against all points
				var linePieces = lines * 2; // pairs of points to make THREE.LinePieces
				
				// Matrix of positions of point pairs (*3 as xyz components)
				var positions = new Float32Array( linePieces * 3 );
				// Matrix of distances between point pairs
				var distances = new Float32Array( lines );

				var dimensionIndex = proximities.dimension - 1;
				for (var i = dimensionIndex; i >= 0; i--) {

					// Check collision
					for (var j = dimensionIndex; j >= 0; j--) {

						var dx = vertices[ i * 3     ] - vertices[ j * 3     ];
						var dy = vertices[ i * 3 + 1 ] - vertices[ j * 3 + 1 ];
						var dz = vertices[ i * 3 + 2 ] - vertices[ j * 3 + 2 ];
						var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

						// if ( dist < this.minDistance ) {
							// if (i == "0" && j=="0") console.log("i:"+i+" ("+vertices[i*3]+","+vertices[i*3+1]+","+vertices[i*3+2]+") j:"+j+" ("+vertices[j*3]+","+vertices[j*3+1]+","+vertices[j*3+2]+")");
							// FROM PARTICLE
							positions[ vertexpos++ ] = vertices[ i * 3     ]; // from u
							positions[ vertexpos++ ] = vertices[ i * 3 + 1 ]; // from v
							positions[ vertexpos++ ] = vertices[ i * 3 + 2 ]; // from w
							// TO PARTICLE
							positions[ vertexpos++ ] = vertices[ j * 3     ]; // to x
							positions[ vertexpos++ ] = vertices[ j * 3 + 1 ]; // to y
							positions[ vertexpos++ ] = vertices[ j * 3 + 2 ]; // to z

							// Distance as value (0.00-1.00) between (u,v,w) and (x,y,z)
							// is stored as RGB 0.00-1.00 (equal RGB ie greyscale)
							// for each position, start == end ie. not a gradient.

							// Can be added as 'color' to THREE.BufferGeometry
							// using THREE.BufferAttribute to store the array
							// but would need *6 to give RGB for each position.
							var distance = (1.0 - (dist / this.maxDistance)); // .toFixed(2)
							distances[ distancepos++ ] = distance;

						// }

					}
				}
				proximities.positions = positions;
				proximities.distances = distances;
				return proximities;
			},
			getMaxDistance: function(vertices) {
				// Where maxDistance is the max diameter of the cluster of vertices
				// Calculation is of distance from center to each vertex.
				var typedArr = new Float32Array(vertices);
				var maxDistCalc = 0;
				var clusterGeometry = new THREE.BufferGeometry();
				clusterGeometry.addAttribute( 'position', new THREE.BufferAttribute( typedArr, 3 ) );
				clusterGeometry.computeBoundingSphere();
				var clusterDiameter = Math.ceil(clusterGeometry.boundingSphere.radius * 2.0);
				return clusterDiameter;
			},
			at: function(currentParticle) {
				current.dimension = currentParticle;
				var dataStart = (currentParticle - 1) * proximities.dimension;
				var dataEnd = currentParticle * proximities.dimension;
				current.positions = proximities.positions.subarray((dataStart * 2 * 3), (dataEnd * 2 * 3));
				current.distances = proximities.distances.subarray(dataStart, dataEnd);
				return current;
			},
			get: function() {
				return proximities;
			},
			getCurrent: function() {
				return current;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Resources', Resources);

	function Resources($q, $http, uuid4, Color, Settings) {
		var resources = {};
		var ensemblRoot = "http://rest.ensemblgenomes.org/";
		resources.assembly = {};
		resources.featureColors = {};
		return {
			setLengthBP: function(top_level_region) {
				var lengthBP = 0;
				var regionBPs = top_level_region;
				for (var regionBP in regionBPs) {
					if (regionBPs.hasOwnProperty(regionBP)) {
						for (var i = 0, j = regionBPs.length; i < j; i++) {
							lengthBP += regionBPs[i].length;
						}
					}
				}
				return lengthBP;
			},
			// loadInfoAssembly: function(speciesUrl, online) { // *** UNUSED ***
			// 	var deferral = $q.defer();
			// 	var self = this;
			// 	var dataUrl;
			// 	if (online) {
			// 		dataUrl = ensemblRoot + "info/assembly/" + speciesUrl + "?content-type=application/json";
			// 	} else {
			// 		dataUrl = "assets/defaults/" + speciesUrl + "-assembly.json";
			// 	}
			// 	$http.get(dataUrl)
			// 	.success(function(data){
			// 		var source = online ? "Ensembl" : "local storage";
			// 		console.log("Assembly Info for " + speciesUrl + " retreived from " + source + ".");
			// 		data.lengthBP = self.setLengthBP(data.top_level_region);
			// 		console.log("Assembly length for " + speciesUrl + " = " + data.lengthBP);
			// 		resources.assembly = data;
			// 		deferral.resolve(data);
			// 	});
			// 	return deferral.promise;
			// },
			loadBiotypeColors: function() {
				var deferral = $q.defer();
				var dataUrl;
				var online = false; // Settings.getOnline(); // Most up-to-date version not strictly necessary
				if (online) {
				// dataUrl = "https://raw.githubusercontent.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini" // NOT PERMITTED
					dataUrl = "https://cdn.rawgit.com/Ensembl/ensembl-webcode/release/75/conf/ini-files/COLOUR.ini";
				} else {
					dataUrl = "assets/offline/ensembl-webcode-COLOUR.ini";

				}
				$http.get(dataUrl)
				.then(function(data){
					var iniData = Color.colorsFromIni(data.data);
					resources.featureColors = iniData;
					resources.biotypes = iniData.gene;
					console.log("Ensembl webcode biotype colors retrieved Ensembl.");
					deferral.resolve(iniData);
				});
				return deferral.promise;
			},
			// loadInfoBiotypes: function(speciesUrl) { // *** UNUSED ***
			// 	var deferral = $q.defer();
			// 	var dataUrl;
			// 	if (online) {
			// 		dataUrl = ensemblRoot + "info/biotypes/" + speciesUrl + "?content-type=application/json";
			// 	} else {
			// 		dataUrl = "assets/defaults/" + speciesUrl + "-biotypes.json";
			// 	}
			// 	$http.get(dataUrl).
			// 	success(function(data){
			// 		console.log("Biotypes for " + speciesUrl + " retreived from Ensembl.");
			// 		deferral.resolve(data);
			// 	});
			// 	return deferral.promise;
			// },
			get: function () {
				return resources;
			},
			// getRegionBiotypes: function (genes) {
			// 	// GET BIOTYPES AND SET BIOTYPE COLORS
			// 	var biotypes = [];
			// 	var featureColors = [
			// 		// other: 16753920
			// 		// protein_alignment: 255
			// 		// protein_coding: 12009742
			// 		// pseudogene: 6710886
			// 	];
			// 	var biotypesLookup = {};
			// 	for (var item, i = 0; item == genes[i++];) {
			// 		var geneBiotype = item.biotype;
			// 		if (!(geneBiotype in biotypesLookup)) {
			// 		biotypesLookup[geneBiotype] = 1;
			// 		biotypes.push(geneBiotype);
			// 		}
			// 	}
			// 	console.log("Biotypes");
			// 	console.log(biotypes);
			// 	var totalbiotypes = biotypes.length;
			// 	console.log("Total Biotypes: %s", totalbiotypes);
			// },
			whatIsIt: function(object) {
				var stringConstructor = "test".constructor;
				var arrayConstructor = [].constructor;
				var objectConstructor = {}.constructor;
				if (object === null) {
					return "null";
				}
				else if (object === undefined) {
					return "undefined";
				}
				else if (object.constructor === stringConstructor) {
					return "String";
				}
				else if (object.constructor === arrayConstructor) {
					return "Array";
				}
				else if (object.constructor === objectConstructor) {
					return "Object";
				}
				else {
					return "don't know";
				}
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Restraints', Restraints);

	function Restraints() {
		// Matrix - n x m dimensions == particleCount */
		var restraints = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		// Single Matrix row at current Particle/Position
		var current = {
			dimension: 0,
			harmonics: [],
			lowerBounds: [],
			upperBounds: [],
			neighbours: []
		};
		return {
			set: function (vertices, datasetRestraints, settings) {
				// Generate a matrix of proximity between points

				var defaults = {
					setting: true
				};
				settings = settings || {};
				angular.extend(this, angular.copy(defaults), settings);

				restraints = {
					dimension: 0,
					harmonics: [],
					lowerBounds: [],
					upperBounds: [],
					neighbours: []
				};
				restraints.dimension = vertices.length / 3; // 3 == xyz components of vertices

				for (var i = 0; i < datasetRestraints.length; i++) {
					if (datasetRestraints[i][2] == "H") restraints.harmonics.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "L") restraints.lowerBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "U") restraints.upperBounds.push(datasetRestraints[i]);
					if (datasetRestraints[i][2] == "C") restraints.neighbours.push(datasetRestraints[i]);
				}
				return restraints;
			},
			at: function(currentParticle) {
				current.dimension = currentParticle;
				current.harmonics = [];
				current.lowerBounds = [];
				current.upperBounds = [];
				current.neighbours = [];
				angular.forEach(restraints, function(restraint, name) {
					if (name != "dimension") {
						for (var j = restraint.length - 1; j >= 0; j--) {
							if (restraint[j][0] == currentParticle) {
								current[name].push(restraint[j]);
							}
							if (restraint[j][1] == currentParticle) {
								var reorderedRestraint = [];
								reorderedRestraint.push(restraint[j][1]);
								reorderedRestraint.push(restraint[j][0]);
								reorderedRestraint.push(restraint[j][2]);
								reorderedRestraint.push(restraint[j][3]);
								current[name].push(reorderedRestraint);
							}
						}
					}
				});
				return current;
			},
			get: function() {
				return restraints;
			},
			getCurrent: function() {
				return current;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Segments', Segments);

	function Segments(d3Service, Color) {
		return {
			gradientHCL: function(overlay, count, counts) {
				// Using D3 HCL for correct perceptual model
				// Data is an array of 2 hex colors eg. ff0000
				// Output is RGB hex (000000-ffffff) eg. [rrggbb,rrggbb,rrggbb...]
				// Note: prefix depends API ie. THREE == 0xrrggbb and D3 == #rrggbb
				if (counts === undefined || counts === false) counts = [count];
				var gradient = [];
				var hexStart = overlay.palette[0];
				var hexEnd = overlay.palette[1];

				//var hStart = new THREE.Color(hexStart);
				//var hEnd = new THREE.Color(hexEnd);
				var c;
				for (var j = 0; j < counts.length;j++) {
					c = counts[j];
					for (var i = c - 1; i >= 0; i--) {
						var step = i / c; // This should be between 0 and 1
						var hex = d3.interpolateHcl(hexStart, hexEnd)(step);
						gradient.push(hex);
					}
				}
				// for (var i = 0; i < count; i++) {
				// 	var step = i / count; // This should be between 0 and 1
				// 	var hex = '#'+hStart.lerp(hEnd,step).getHexString();
				// 	gradient.push(hex);
				// }
				return gradient;
			},
			gradientComponentRGB: function(overlay, count) { // UNUSED
				// where overlay.palette is an array of 2 hex colors eg. ["#ff0000","#0000ff"]
				// output is RGB decimal (0.0-1.0) eg. [r,g,b,r,g,b,r,g,b,...]
				var gradient = [];
				// convert "#" to "0x" for following manipulation
				var hexStart = "0x" + overlay.palette[0].substring(1);
				var hexEnd = "0x" + overlay.palette[1].substring(1);
				var red1, green1, blue1,
					red2, green2, blue2,
					step, outred, outgreen, outblue;
					// convert hexStart to RGB components (0.0-255.0)
					red1 = hexStart >> 16;
					green1 = (hexStart >> 8) & 0xFF;
					blue1  = hexStart & 0xFF;
					// convert hexEnd to RGB components (0.0-255.0)
					red2 = hexEnd >> 16;
					green2 = (hexEnd >> 8) & 0xFF;
					blue2  = hexEnd & 0xFF;
				// generate gradient as array of RGB component triplets
				for (var i = count - 1; i >= 0; i--) {
					step = i / count; // This should be between 0 and 1
					outred = +(step * red1 + (1-step) * red2).toFixed(2);
					outgreen = +(step * green1 + (1-step) * green2).toFixed(2);
					outblue = +(step * blue1 + (1-step) * blue2).toFixed(2);
					gradient.push(outred, outgreen, outblue);
				}
				return gradient;
			},
			bicolor: function(overlay, count) {
				// if palette is not an array of hex colors then:
				// colors derived from BigWig color and altColor
				// featureTypes == single hex for use as color 
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];
				var colors = [];
				for(var i = 0; i < count; i++){
						var color;
						if (overlay.data[i] === 1) {
							color = featureColor;
						} else {
							color = defaultColor;
						}
					colors.push(color);
				}
				return colors;
			},
			matrix: function(overlay, segments) {
				// where palette is array of hex colors
				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];
				var colors = [];
				for (var i = overlay.data.length - 1; i >= 0; i--) {
					var read = overlay.data[i];
					var intensity = 1 - (read * read);
					var hex = d3.interpolateHsl(featureColor, defaultColor)(intensity);
					for(var j = 0; j < segments; j++){
						colors.push(hex);
					}
				}
				// console.log(colors);
				return colors;
			},
			bicolorVariable: function(overlay, chromStart, segmentsCount, segmentLength) {

				var featureColor = overlay.palette[0];
				var defaultColor = overlay.palette[1];

				var features = overlay.data;
				var colors = [];
				for(var i=0; i < segmentsCount; i++){
					var segmentColor = defaultColor;
					var segmentLower = chromStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;

						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							if (features[j].read === 1) {
								segmentColor = featureColor;
							} else {
								segmentColor = defaultColor;
							}
						}
					}
					colors.push(segmentColor);
				}
				// console.log(colors);
				return colors;
			},
			featureGraph: function(overlay, count) {
				// where palette is array of hex colors
				var featureColor = "#ff0000";
				var defaultColor = "#000000";
				var segmentedColors = this.gradientHCL(overlay, count);
				var overlayColors = Color.THREEColorsFromHex(segmentedColors);
				var vertexColors = Color.vertexColorsFromTHREEColors(overlayColors);
				return vertexColors;
			},
			features: function(overlay, chromStart, segmentsCount, segmentLength, featureTypes) {

				var features = overlay.data;
				var colors = [];

				for(var i=0; i < segmentsCount; i++){

					var featuresPresent = []; 
					var segmentLower = chromStart + (segmentLength * i);
					var segmentUpper = segmentLower + segmentLength;
					var featuresCount = features.length;
					var hex = "cccccc"; // Base color - ie if none found
					var color = "#" + hex; //parseInt(hex,16);

					// For every feaeture [j]...
					for(var j=0; j < featuresCount; j++){
						var start = features[j].start;
						var end = features[j].end;
						var inSegments = [];
						 // check if overlaps current fragment [i]
						if ( Math.max(segmentLower, start) <= Math.min(segmentUpper,end) ) {
							// console.log("Yes feature " + features[j].external_name + "("+j+") in fragment " + i );
							inSegments.push(i);
							var featureTypeKey = "biotype";
							var dominantFeatureType = "protein_coding";
							if (featuresPresent.length > 0) {
								// Simple weight - give preference to smaller segments
								if ( featuresPresent[0] == dominantFeatureType ) {
									// if already contains protein_coding, replace with...
									featuresPresent[0] = features[j][featureTypeKey].toLowerCase();
								} else {
									featuresPresent.push(features[j][featureTypeKey].toLowerCase());
								}
							} else {
								featuresPresent.push(features[j][featureTypeKey].toLowerCase());							
							}
						} else {
							// if (i==3) console.log("No features in fragment " + i );
							// if (j == 0) console.log( JSON.stringify(segmentLower)+", "+JSON.stringify(start)+" <= "+JSON.stringify(segmentUpper)+", "+JSON.stringify(end) );
						}
						// console.log(insegments);
						features[j].inSegments = inSegments;
					}
					for(var k=0; k<featuresPresent.length; k++){
						var feature = featuresPresent[0];
						if (feature in featureTypes) {
							hex = featureTypes[feature].match(/[a-f0-9]{6}/gi);
							color = "#" + hex; //parseInt(hex,16);
						} else {
							hex = "110100";
							color = "#" + hex; //parseInt(hex,16);
						}
					}
					colors.push(color);
				}
				// console.log(colors);
				return colors;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Settings', Settings);

	function Settings($q, $http) {
		var settings = {};

		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-settings.json";
				if( Object.getOwnPropertyNames(settings).length > 0 ) {
					deferral.resolve(settings);
				} else {
					$http.get(dataUrl)
					.then( function(data) {
						settings = data.data;
						console.log("Settings loaded from " + dataUrl);
						deferral.resolve(settings);
					});
				}
				return deferral.promise;
			},
			set: function(dataset, chromosomeIndex, currentChrom) {
				var self = this;
				if (currentChrom === undefined || currentChrom === false) currentChrom = dataset.object.chrom[0];
				if (chromosomeIndex === undefined || chromosomeIndex === false) chromosomeIndex = [currentChrom];
				//settings.current.chrom = dataset.object.chrom[chromosomeIndex];
				//settings.current.chromStart = dataset.object.chromStart[chromosomeIndex];
				//settings.current.chromEnd = dataset.object.chromEnd[chromosomeIndex];
				settings.current.chrom = currentChrom;
				settings.current.chromIdx = chromosomeIndex.indexOf(settings.current.chrom);
				settings.current.chromStart = [];
				settings.current.chromEnd = [];
				var chromIdx;
				//var offset = 0;
				var resolution = dataset.object.resolution;
				settings.current.particlesCount = 0;
				for (var l = 0 ; l < dataset.object.chrom.length; l++) {
					chromIdx = chromosomeIndex.indexOf(dataset.object.chrom[l]);
					if(chromIdx > -1) {
						settings.current.chromStart.push(Math.round(dataset.object.chromStart[l]));
						settings.current.chromEnd.push(Math.round(dataset.object.chromEnd[l]));
						settings.current.particlesCount += Math.round(dataset.object.chromEnd[l]/resolution) - Math.round(dataset.object.chromStart[l]/resolution);
					}
					//offset += Math.round(dataset.object.chromEnd[l])-Math.round(dataset.object.chromStart[l])+1*resolution;
				}
				//settings.current.chromosomeIndexes = [settings.current.chrom];
				settings.current.chromosomeIndexes = chromosomeIndex;
				
				settings.current.species = dataset.object.species;
				settings.current.speciesUrl = dataset.object.speciesUrl;
				if(typeof dataset.object.assembly !== 'undefined') 
					settings.current.assemblyUrl = dataset.object.assembly;
				
				// NOTE: particle segements as lowest resolution of model
				// instead of particleSegments as variable in TADkit
				// i.e settings.current.particleSegments = storyboard.components[0].view.settings.chromatin.particleSegments;
				//settings.current.particleSegments = 20; // ((dataset.object.chromEnd - dataset.object.chromStart) / dataset.object.resolution);
				//settings.current.particleSegments = Math.round((dataset.object.chromEnd - dataset.object.chromStart) / (5*dataset.object.resolution));
				// Max rings in 3d aprox 2000
				//settings.current.particlesCount = dataset.models[0].data.length / dataset.object.components;
				
				//settings.current.particlesCount = Math.round((settings.current.chromEnd-settings.current.chromStart)/dataset.object.resolution);
				settings.current.particleSegments = Math.ceil(2500/settings.current.particlesCount);
				settings.current.edgesCount = ((settings.current.particlesCount*settings.current.particlesCount)-settings.current.particlesCount)*0.5;
				settings.current.segmentsCount = settings.current.particlesCount * settings.current.particleSegments;
				// NOTE: segmentLength can be calculated in 2 ways:
				// 1. particleResolution (TADbit data) / particleSegments (TADkit setting)
				// 2. modelResolution (TADbit chromEnd - TADbit chromStart) / segmentsCount
				// Method 1. is used as it is simpler to calculate and the data is already loaded.
				// Also focus on particles and does not address rounding off of sequence length.
				settings.current.segmentLength = dataset.object.resolution / settings.current.particleSegments; // base pairs
				// SET INITIAL position at midpoint
				
				//settings.current.position = settings.current.chromStart + parseInt((settings.current.chromEnd - settings.current.chromStart) * 0.5);
				settings.current.position = settings.current.chromStart[settings.current.chromIdx] + parseInt((settings.current.chromEnd[settings.current.chromIdx] - settings.current.chromStart[settings.current.chromIdx]) * 0.5);
				settings.current.particle = self.getParticle();
				settings.current.particleSize = Math.ceil(dataset.object.resolution/20);
				// AND SEGMENT IT LIES WITHIN
				settings.current.segment = self.getSegment(settings.current.position);
				settings.current.segmentLower = settings.current.position - (settings.current.segment * 0.5);
				settings.current.segmentUpper = settings.current.position + (settings.current.segment * 0.5);
			},
			add: function(setting) {
				// // rewrite for Object
				// settings.push(settingID);
				return settings;
			},
			remove: function(setting) {
				// // rewrite for Object
				// var index = settings.indexOf(settingID);
				// settings.splice(index, 1);
				return settings;
			},
			getState: function(setting) {
				var settingState = settings[settingID].state;
				return settingState;
			},
			get: function() {
				return settings;
			},
			getOnline: function() {
				var online = false;
				if (settings.app) online = settings.app.online;
				return online;
			},
			getSegment: function (chromPosition) {
				var self = this;
				//var particle = self.getParticle(chromPosition);
				chromPosition = chromPosition || settings.current.position;
				var resolution = settings.current.segmentLength*settings.current.particleSegments; // base pairs
				var chromOffset = chromPosition-settings.current.chromStart[settings.current.chromIdx];
				var chromRange=0;
				for(var l=0;l<settings.current.chromosomeIndexes.length;l++) chromRange += Math.round(settings.current.chromEnd[l])-Math.round(settings.current.chromStart[l]);
				var particlesCount = settings.current.particlesCount;
				var segmentsCount = particlesCount * settings.current.particleSegments;				
				var segment = Math.round((chromOffset * (segmentsCount)) / chromRange);
				//var segment = Math.round((particle-1)*settings.current.particleSegments+settings.current.particleSegments/2);
				return segment;
			},
			getParticle: function (chromPosition) {
				chromPosition = chromPosition || settings.current.position;
				var self = this;
				var resolution = settings.current.segmentLength*settings.current.particleSegments; // base pairs
				var chromOffset = chromPosition-settings.current.chromStart[settings.current.chromIdx];
				var chromRange=0;
				for(var l=0;l<settings.current.chromosomeIndexes.length;l++) chromRange += Math.round(settings.current.chromEnd[l])-Math.round(settings.current.chromStart[l]); 
				
				var particlesCount = settings.current.particlesCount;
				var particle = Math.round((chromOffset * particlesCount) / chromRange)+1;
				return Math.min(particle,settings.current.particlesCount);
			},
			getRange: function (start, end) {
				var range = 0;
				for (var i = start; i <= end; i++) {
					range++;
				}
				return range;
			},
			toggle: function(selected) {
				// settings = $filter('filter')(settings, {name: '!settingID'}) // USE THIS???
				angular.forEach(settings, function(name, setting) {
					if (selected == name.id) {
						name.state = !name.state;
					}
				});
				return settings;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('myHttpInterceptor', function($q) {
		  return {
		    'request': function(config) {
		    	var el = angular.element(document.querySelector('#spinnerdiv'))[0];
		    	if(!angular.isUndefined(el))
		    		el.style.display = "block";
		      return config;
		    },
		
		    'response': function(response) {
		    	var el = angular.element(document.querySelector('#spinnerdiv'))[0];
		    	if(!angular.isUndefined(el))
		    		el.style.display = "none";
		      return response;
		    }
	  };
	});
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Storyboards', Storyboards);

	function Storyboards($q, $http, uuid4, Settings, Components) {
		var storyboards = {
			loaded : [],
			current : {index:0}
		};
		
		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-storyboards.json";
				
				$http.get(dataUrl)
				.then( function(data) {
					storyboards.loaded = data.data;
					console.log("Storyboards (" + data.data.length + ") loaded from " + dataUrl);
					deferral.resolve(storyboards);
				});
				
				return deferral.promise;
			},
			add: function(details) {
				details = details || [""];
				var storyboard = {
					metadata : {
						version : 1.0,
						type : "storyboard",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						email : details[2],
						group : details[3],
						permissions : details[4]
					},
					data : details[5]
				};
				storyboards.loaded.push(storyboard);
				storyboards.current = storyboards.loaded.length - 1;
				return storyboards;
			},
			addComponent: function(overlay, storyboardId, options) {
				var self = this;
				storyboardId = storyboardId || "default";
				options = options || [];

				var settings = Settings.get();
				// Add a preconfigured conponent from Components
				// - update with options if necessary
				var componentTemplate = Components.getComponentByType(overlay.object.type);
				// New component for overlay
				var newComponent = angular.copy(componentTemplate);
					newComponent.object.uuid = uuid4.generate();
					newComponent.object.id = overlay.object.id;
					newComponent.object.title = overlay.object.id;
					newComponent.object.dataset = overlay.object.id;
					newComponent.view.settings.step = overlay.object.step;
					newComponent.view.settings.color = overlay.object.color;
					newComponent.view.viewpoint.chromStart = settings.current.chromStart;
					newComponent.view.viewpoint.chromEnd = settings.current.chromEnd;
					newComponent.view.viewpoint.scale = settings.views.scale;
					newComponent.view.viewtype = overlay.object.type + "-" + overlay.object.stepType;
					newComponent.data = overlay.data;
					newComponent.overlay = overlay;

				var storyboard = self.getStoryboardById(storyboardId);
				storyboard.components.push(newComponent);
				return newComponent;
			},
			defaultComponents: function(storyboardId) {
				var self = this;
				storyboardId = storyboardId || "default";
				var storyboard = self.getStoryboardById(storyboardId);
				while (storyboard.components.length > 6) { // remove all except defaults
					console.log("popping");
					storyboards.loaded[storyboards.current.index].components.pop();
				}
				// console.log(storyboards.loaded[storyboards.current.index].components);
				return storyboards;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded.indexOf(index);
				storyboards.loaded.splice(storyboard, 1);
				return storyboards;
			},
			removeComponentById: function(id) {
					console.log("component");
				var self = this;
				if (id !== undefined || id !== false) {
					var component = self.getComponentById(id);
					var storyboard = self.getStoryboard();
					storyboard.components.splice(component.index, 1);
					console.log(component);
				}
				return storyboards;
			},
			set: function(index) {
				if (index !== undefined || index !== false) storyboards.current.index = index;
				var storyboard = storyboards.loaded[storyboards.current.index];
				return storyboard;
			},
			setViewpoint: function(chromStart, chromEnd, scaleOrig) {
				chromStart = chromStart || 0;
				chromEnd = chromEnd || 4999999;
				var currentComponents = storyboards.loaded[storyboards.current.index].components;
				// console.log(currentComponents);
				angular.forEach( currentComponents, function(component, index) {
					var scale = scaleOrig || 1;
					component.view.viewpoint.chromStart = chromStart;
					component.view.viewpoint.chromEnd = chromEnd;
					if (component.object.type === "scene" || component.object.type === "scene-icon") {
						var angle = component.view.viewpoint.fov / 2;
						var margin = 0.6;
						scale = Math.tan(angle).toFixed(2) * margin;
					}
					component.view.viewpoint.scale = scale;
				});
				return storyboards;
			},
			update: function(overlay) {
				var self = this;
				var components = self.getStoryboard().components;
				// Assign data and overlays for each component by type
				angular.forEach(components, function(component, index) {
					// if (component.object.dataset == "default") {
						var overlayProximities;
						// if (component.object.type == "scene") {
						// 	component.data = $scope.current.model.data;
						// 	 // component.proximities required for Scenes: overlay.colors Saturation
						// 	component.proximities = $scope.allProximities;
						// 	component.overlay = $scope.current.overlay;
						// 	component.overlay.state = {};
						// 	component.overlay.object.state.index = Overlays.getCurrentIndex();
						// } else if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
						if (component.object.type == "track-genes" || component.object.type == "panel-inspector") {
							component.data = overlay.data;
							// component.overlay required for toggle
							component.overlay = overlay;
						}
						// } else if (component.object.type == "track-proximities") {
						// 	// ie only one... see note above for Calculating Proximities
						// 	// component.data for Scenes: overlay.colors Saturation
						// 	component.data = $scope.currentProximities;
						// 	// component.overlay required for toggle
						// 	//   and for Scenes: overlay.colors Hue
						// 	overlay = Overlays.getOverlayById("proximities");
						// 	component.overlay = overlay;
						// } else if (component.object.type == "track-restraints") {
						// 	// ie only one... see note above for Calculating Restraints
						// 	// component.data for Scenes: overlay.colors Saturation
						// 	component.data = $scope.currentRestraints;
						// 	// component.overlay required for toggle
						// 	//   and for Scenes: overlay.colors Hue
						// 	overlay = Overlays.getOverlayById("restraints");
						// 	component.overlay = overlay;
						// }
						// } else if (component.object.type == "track-wiggle") {
						// 	overlay = Overlays.getOverlayById(component.object.dataset);
						// 	component.data = overlay.data;
						// 	component.overlay = overlay; // required for toggle
						// } else {
						// 	// slider and other types of component...
						// }
					// }
				});
			},
			get: function() {
				return storyboards;
			},
			getStoryboard: function(index) {
				if (index === undefined || index === false) index = storyboards.current.index;
				var storyboard = storyboards.loaded[index];
				return storyboard;
			},
			getStoryboardById: function (id) {
				var storyboard, found;
				if (id !== undefined || id !== false) {
					for (var i = storyboards.loaded.length - 1; i >= 0; i--) {
						if (storyboards.loaded[i].object.id === id) {
							storyboard = storyboards.loaded[i];
							storyboard.index = i;
							found = true;
							// console.log("Overlay \"" + id + "\" found!");
						}
					}
				}
				if (!found) {
					storyboard = storyboards.loaded[storyboards.current.index];
					storyboard.index = storyboards.current.index;
					console.log("Storyboard '" + id + "' not found: returning current.");
				}
				// console.log(storyboard);
				return storyboard;
			},
			getComponentById: function (id) {
				var self = this;
				var component, found;
				var components = self.getStoryboard().components;
				if (id !== undefined || id !== false) {
					for (var i = components.length - 1; i >= 0; i--) {
						console.log(components[i].object.title);
						if (components[i].object.title === id) {
							component = components[i];
							component.index = i;
							found = true;
							console.log("Component '" + id + "' found!");
						}
					}
				}
//				if (!found) {
//					component = components[0];
//					console.log("Component '" + id + "' not found: returning first.");
//				}
				// console.log(component);
				return component;
			}
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('three', [])
		.factory('threeService', threeService);

	function threeService($document, $q, $rootScope) {
			var d = $q.defer();
			function onScriptLoad() {
				// Load client in the browser
				$rootScope.$apply(function() { d.resolve(window.three); });
			}
			// Create a script tag with ThreeJS as the source
			// and call our onScriptLoad callback when it
			// has been loaded
			var scriptTag = $document[0].createElement('script');
			scriptTag.type = 'text/javascript'; 
			scriptTag.async = true;
			// scriptTag.src = 'http://d3js.org/d3.v3.min.js';
			scriptTag.src = '../bower_components/threejs/build/three.js';
			scriptTag.onreadystatechange = function () {
				if (this.readyState == 'complete') onScriptLoad();
			};
			scriptTag.onload = onScriptLoad;

			var s = $document[0].getElementsByTagName('body')[0];
			s.appendChild(scriptTag);

			return {
				three: function() { return d.promise; }
			};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Track_data', Track_data);

	function Track_data() {
		var track_data = [];
		return {
			setDirect: function (datasetTrack_data) {
				var self = this;
				self.clear();
				track_data = datasetTrack_data;
							
				return track_data;
			},
			get: function() {
				return track_data;
			},
			clear: function() {
				track_data.length = 0;
			},
		};
	}
})();
(function() {
	'use strict';
	angular
		.module('TADkit')
		.factory('Users', Users);

	function Users($q, $http, uuid4) {
		var users = {
			loaded : [],
			current : {
				index:0,
				tracks: []
			}
		};

		return {
			load: function() {
				var deferral = $q.defer();
				var dataUrl = "assets/defaults/tk-defaults-users.json";
				if( users.loaded.length > 0 ) {
					deferral.resolve(users);
				} else {
					$http.get(dataUrl)
					.then( function(data) {
						users.loaded = data.data;
						console.log("Users (" + data.data.length + ") loaded from " + dataUrl);
						deferral.resolve(users);
					});
				}
				return deferral.promise;
			},
			add: function(details) {
				details = details || ["id", "Name Surname", "email@company.com", "Group", "edit", ["default"]];
				var user = {
					metadata : {
						version : 1.0,
						type : "user",
						generator : "TADkit"
					},
					object : {
						uuid : uuid4.generate(),
						id : details[0],
						title : details[1],
						email : details[2],
						group : details[3],
						permissions : details[4]
					},
					projects : details[5]
				};
				users.loaded.push(user);
				users.current = users.loaded.length - 1;
				return users;
			},
			remove: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var user = users.loaded.indexOf(index);
				users.loaded.splice(user, 1);
				return users;
			},
			set: function(index) {
				if (index !== undefined || index !== false) users.current.index = index;
				var current = users.loaded[users.current.index];
				return current;
			},
			get: function() {
				return users;
			},
			getUser: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var user = users.loaded[index];
				return user;
			},
			getPermissions: function(index) {
				if (index === undefined || index === false) index = users.current.index;
				var permissions = users.loaded[index].permissions;
				return permissions;
			},
			setTracks: function(tracks) {
				users.current.tracks = tracks;
				return;
			},
			getTracks: function(index) {
				return users.current.tracks;
			}
		};
	}
})();