'use strict';

// REACT D3 TRACK COMPONENT
var tadmodelScene = React.createClass({displayName: 'tadmodelScene',
	componentDidMount:function(nextProps){
		console.log(nextProps);
		// if(nextProps.data){
		// 	this.renderScene(nextProps.data, nextProps.elem)
		// }
	},
	renderScene:function(dataset, elem){
		
		var scene, viewport;
		var camera, cameraPosition, cameraTarget, cameraTranslate;
		var ambientLight, pointLight, loader, mesh;
		var controls, gui, renderer;
		
		// THREE BASIC
		scope.init = function () {
		
			console.log("REACT");
			viewport =  elem;
			scene = new THREE.Scene();
			
			var viewportWidth = viewport.parentNode.clientWidth;
			var viewportHeight = viewportWidth * 0.66;
			
			camera = new THREE.PerspectiveCamera(75, viewportWidth/viewportHeight, 0.1, 1000);

			renderer = new THREE.WebGLRenderer();
			renderer.setSize(viewportWidth, viewportHeight);
			renderer.setClearColor( 0xffffff, 1 );
			viewport.appendChild(renderer.domElement);

			var geometry = new THREE.BoxGeometry(1,1,1);
			var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
			var cube = new THREE.Mesh(geometry, material);
			scene.add(cube);

			camera.position.z = 5;
		};

		scope.animate = function () {
			requestAnimationFrame( scope.animate );
			scope.render();
		};
		
		scope.render = function () {
			// requestAnimationFrame(render);
			//
			// cube.rotation.x += 0.1;
			// cube.rotation.y += 0.1;

			renderer.render(scene, camera);
		};

		scope.init();
		scope.animate();

	},
	render:function(){
		console.log("Rendering REACT");
		
		return React.DOM.div( {id:this.props.target} )
	}
})
