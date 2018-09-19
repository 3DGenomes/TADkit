import { Component, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import * as THREE from 'three-full';

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
  mesh = null;
  controls = null;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.controls = new THREE.OrbitControls(this.camera);
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();
    this.configControls();

    this.createMesh();

    this.animate();
  }

  configCamera() {
    this.camera.position.set(300, 300, 300);
  }

  configRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color('hsl(0, 0%, 10%)'));
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.margin = 'auto';
    console.log(this.canvas.clientWidth);
    console.log(this.canvas.clientHeight);
    // this.canvas.appendChild(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = true;
    this.controls.enableZoom = false;
    this.controls.enablePan  = false;
    this.controls.update();
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ color: 0xff7f50 });
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
