import { Vector3, PerspectiveCamera } from 'three';

import OrbitControls from 'orbit-controls-es6';

import { CSS3DRenderer } from './three-utils/CSS3DRenderer';
import { SceneManager } from "./lib/sceneManager";

import Scene01 from './scenes/scene_01';
import Timeline01 from './timelines/timeline_01';

import Scene02 from './scenes/scene_02';
import Timeline02 from './timelines/timeline_02';

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 50;
camera.position.z = 500;

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = 'root';
document.body.appendChild(renderer.domElement);

const pointLight = new Vector3(0, 150, 80);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;

const movie = new SceneManager(renderer, camera);
movie.add('intro', Scene01, Timeline01);
movie.add('jazz', Scene02, Timeline02);
movie.start();
