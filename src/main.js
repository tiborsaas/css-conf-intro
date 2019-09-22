import { PerspectiveCamera } from 'three';
import OrbitControls from 'orbit-controls-es6';

import { CSS3DRenderer } from './three-utils/CSS3DRenderer';
import { setPerspective } from "./three-utils/getPerspective";

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 50;
camera.position.z = 500;

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = 'root';
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;

setPerspective(camera);

import('./lib/movie').then(movie => movie.start(renderer, camera));
