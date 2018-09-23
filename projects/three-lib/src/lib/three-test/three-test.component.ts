import { Component, AfterViewInit, ViewChild, Input, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@avatsaev/three-orbitcontrols-ts';
// import { CameraControls } from 'camera-controls';

@Component({
  selector: 'three-test',
  templateUrl: './three-test.component.html',
  styleUrls: ['./three-test.component.css']
})
export class ThreeTestComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;

  scene = null;
  camera = null;
  renderer = null;
  controls = null;
  mesh = null;
  light = null;
  count = 1;

  @HostListener('window:resize', ['$event'])
  onResize(event){
   this.resizeCanvasToDisplaySize(true);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor(private elem: ElementRef) {
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

  private calculateAspectRatio(): number {
    // console.log('canvas.clientWidth: ', this.canvas.clientWidth);
//    console.log('canvas.clientHeight: ', this.canvas.clientHeight);
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  updateCamera(): void {
    this.camera.aspect = this.calculateAspectRatio();
    this.camera.updateProjectionMatrix();
  }

  configCamera() {
    this.updateCamera();
    this.camera.position.set( -15, 10, 15 );
    this.camera.lookAt( this.scene.position );
  }

  resizeCanvasToDisplaySize(force): void {
    // See: https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    if (force || this.canvas.width !== width || this.canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(1);
     // Using setPixelRatio(devicePixelRatio) for HD-DPI can cause excessive rendering.
     // See: https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
    this.renderer.setClearColor( 0x000000, 0 );
/*    const widgetPadding = 4;
    console.log('canvas.width', this.canvas.width);
    console.log('canvas.clientWidth', this.canvas.clientWidth);
    console.log('canvas.offsetWidth', this.canvas.offsetWidth);
    console.log('canvas.scrollWidth', this.canvas.scrollWidth);
    const style = getComputedStyle(this.elem.nativeElement);
    console.log('elem computed', style.width);
    // const rect = this.canvas.getBoundingClientRect();
    // console.log('rect', rect);
    const rect = this.elem.nativeElement.getBoundingClientRect();
    console.log('elem rect', rect.width);

    const width = this.canvas.clientWidth - (widgetPadding * 2);
    const height = this.canvas.clientHeight; // resizable layout "col" flex adjusts height to fit
    // this.renderer.setSize(width, height);
*/
    this.resizeCanvasToDisplaySize(true);
    // this.updateChildCamerasAspectRatio();
  }

  configControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.autoRotate = false;
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
    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.01;
    // if (this.count < 6) {
    // const rect = this.canvas.getBoundingClientRect();
    // console.log('rect', rect.width);
    // this.count++;
    // }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.updateCamera();
  }
}
