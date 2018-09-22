import { Component, AfterViewInit, ViewChild, Input, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three-full';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
// import { CameraControls } from 'camera-controls';

@Component({
  selector: 'three-test',
  templateUrl: './three-test.component.html',
  styleUrls: ['./three-test.component.css']
})
export class ThreeTestComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;

  renderer = new THREE.WebGLRenderer;
  scene = null;
  camera = null;
  controls = null;
  mesh = null;
  light = null;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private calculateAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
  }

  ngAfterViewInit() {
    this.configScene();
    this.configCamera();
    this.configRenderer();
    this.configControls();

    this.createLight();
    this.createMesh();

    this.animate();
  }

  configScene() {
    this.scene.background = new THREE.Color( 0xdddddd );
  }

  configCamera() {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
    this.camera.position.set( -15, 10, 15 );
    this.camera.lookAt( this.scene.position );
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    // setClearColor for transparent background
    // i.e. scene or canvas background shows through
    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    console.log('clientWidth', this.canvas.clientWidth);
    console.log('clientHeight', this.canvas.clientHeight);
    // this.canvas.appendChild(this.renderer.domElement);
    // this.updateChildCamerasAspectRatio();
  }

  configControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan  = true;
    this.controls.update();
  }

  createLight() {
    this.light = new THREE.PointLight( 0xffffff );
    this.light.position.set( -10, 10, 10 );
    this.scene.add( this.light );
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
