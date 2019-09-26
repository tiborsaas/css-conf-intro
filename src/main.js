import { PerspectiveCamera } from 'three';
import OrbitControls from 'orbit-controls-es6';

import { CSS3DRenderer } from './three-utils/CSS3DRenderer';
import { setPerspective } from "./three-utils/getPerspective";

const MAX_WIDTH = 1;
const WIDE_RATIO = window.innerHeight / window.innerWidth;
const WIDTH = window.innerWidth * MAX_WIDTH;

const camera = new PerspectiveCamera(75, WIDTH / WIDTH * WIDE_RATIO, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 50;
camera.position.z = 500;

const renderer = new CSS3DRenderer();
renderer.setSize(WIDTH, WIDTH * WIDE_RATIO);
renderer.domElement.id = 'root';
document.body.appendChild(renderer.domElement);

const overlayWrapper = document.querySelector('main');
overlayWrapper.style.width = `${WIDTH}px`;
overlayWrapper.style.height = `${WIDTH * WIDE_RATIO}px`;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;

setPerspective(camera, MAX_WIDTH);

import('./lib/movie').then(movie => movie.start(renderer, camera));
