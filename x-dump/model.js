// ************************************
// * MODEL SCALE = 1unit : 1nanometer *
// * (1 micrometer = 1000 nanometers) *
// ************************************
// * Eukaryotic animal cells diamter = 20 µm (10 - 30 µm) = 10000 units radius
var cellRadius = 10000;
// * nucleus diameter = 6 µm (3 - 10 micrometers) = 3000 units radius
var nucelusRadius = 3000;
// * chromatin microfilaments width ie diameter = 30nm == 15 units radius
var chromatinRadius = 15;
				
// CELL MODEL
console.log("CELL");
var cellVisibility = true;
var cellOpacity = 0.00;
var cellMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: cellOpacity, wireframe: true, transparent: true } );
var cell =  new THREE.Object3D();
cell.position.set( 0, 0, 0 );
cell.name = "Cell";
cell.visible = cellVisibility;
scene.add( cell );
var cellForm = new THREE.Mesh( new THREE.IcosahedronGeometry( cellRadius, 1 ), cellMaterial );
cellForm.position.set( 0, 0, 0 );
cellForm.name = "Cell Form";
cellForm.visible = cellVisibility;
scene.add( cellForm );
console.log( cell );

// NUCELUS MODEL
console.log("NUCLEUS");
var nucleusVisibility = true;
var nucleusOpacity = 0.00;
var nucleusMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: nucleusOpacity, wireframe: true, transparent: true } );
var nucleus = new THREE.Object3D();
nucleus.position.set( 0, 0, 0 );
nucleus.name = "Nucleus";
nucleus.visible = nucleusVisibility;
cell.add( nucleus );
var nucleusForm = new THREE.Mesh( new THREE.IcosahedronGeometry( nucelusRadius, 4 ), nucleusMaterial );
nucleusForm.position.set( 0, 0, 0 );
nucleusForm.name = "Nucleus Form";
nucleusForm.visible = nucleusVisibility;
cell.add( nucleusForm );
console.log( nucleus );

// TAD MODEL
console.log("TAD");
var TAD = new THREE.Object3D();
	TAD.name = "TAD";
	scene.add(TAD);
var biotypes, TADGenes

var TADPointColor = "#ffffff";
var TADPointSize = 350;
var TADPointOpacity = 0.8;
var TADPointVisibility = false;
var TADPointCloudMaterial;

var TADCenter = new THREE.Vector3();
var TADBounds = new THREE.Mesh();
var boundsVisibility = false;

var chromatinVisibility = true;
var chromatinRadiusSegments = 16;
var chromatinClosed = false; // true: eats own tail (TubeGeometry)
var chromatinOpenEnded = true; // true: no end capping (CylinderGeometry: halves face count)

var chromatinMaterial, fragmentMaterial;
var chromatinColor = "#37375f";
var fragmentColor = "#37375f";
var chromatinOpacity = 0.5;				

var chromatinPointColor = "#8d8dc8";
var chromatinPointSize = 10;
var chromatinPointOpacity = 0.2;
var chromatinPointVisibility = true;
var chromatinPointCloudMaterial;

