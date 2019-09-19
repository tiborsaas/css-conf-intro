import {
    Math as tMath,
    Vector3,
    Matrix4,
    Quaternion,
    Euler,
    Scene,
    Color,
    Group,
    PerspectiveCamera,
    Vector4
} from 'three';

import OrbitControls from 'orbit-controls-es6';
import { CSS3DRenderer, CSS3DObject } from './three-utils/CSS3DRenderer';
import { tween } from 'popmotion';

const { sin, random, floor, abs } = Math;
const { clamp } = tMath;

const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 50;
camera.position.z = 500;

const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = 'root';
document.body.appendChild(renderer.domElement);

const pointLight = new Vector3(0, 150, 80);

// const lightHelper = cube(5, false);
// scene.add(lightHelper);

// lightHelper.translateX(pointLight.x);
// lightHelper.translateY(pointLight.y);
// lightHelper.translateZ(pointLight.z);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;

const COLS = 7;
const ROWS = 3;

const field = [];

for (let x = -3; x < COLS - 3; x++) {
    for (let y = -1; y < ROWS - 1; y++) {
        const scale = new Vector3(random() * 200, random() * 200, random() * 500);
        const cubeObject = box(scale);
        cubeObject.translateX(250 * x);
        cubeObject.translateY(250 * y);
        cubeObject.rotateY(90 * floor(random() - 1));
        cubeObject.rotateX(90 * floor(random()));
        scene.add(cubeObject);
        field.push(cubeObject);
    }
}

let x = 0;
const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    field.forEach((cube, i) => {
        cube.position.z = sin(x + i * 5) * 10;
        updateLight(cube);
    })
    x += 0.01;
};

render();

// const cubeObject = box(new Vector3(200, 2, 800));
// scene.add(cubeObject);

function box(scalarVec, options = {}) {
    const {
        opacity = 1,
        color = 0xffffff,
        shade = true
    } = options;
    const { x: sx, y: sy, z: sz } = scalarVec;
    const position = {
        front: new Vector3(0, 0, 0.5),
        back: new Vector3(0, 0, -0.5),
        left: new Vector3(-0.5, 0, 0),
        right: new Vector3(0.5, 0, 0),
        top: new Vector3(0, 0.5, 0),
        bottom: new Vector3(0, -0.5, 0),
    };
    const frontPlane = createFace({ width: sx, height: sy, opacity, color }, position.front.multiplyScalar(sz), { x: 0, y: 0, z: 0 });
    const backPlane = createFace({ width: sx, height: sy, opacity, color }, position.back.multiplyScalar(sz), { x: 0, y: 0, z: 0 });
    const leftPlane = createFace({ width: sz, height: sy, opacity, color }, position.left.multiplyScalar(sx), { x: 0, y: -90, z: 0 });
    const rightPlane = createFace({ width: sz, height: sy, opacity, color }, position.right.multiplyScalar(sx), { x: 0, y: 90, z: 0 });
    const topPlane = createFace({ width: sx, height: sz, opacity, color }, position.top.multiplyScalar(sy), { x: 90, y: 0, z: 0 });
    const bottomPlane = createFace({ width: sx, height: sz, opacity, color }, position.bottom.multiplyScalar(sy), { x: 90, y: 0, z: 0 });

    const geometry = new Group();
    geometry.add(frontPlane);
    geometry.add(backPlane);
    geometry.add(leftPlane);
    geometry.add(rightPlane);
    geometry.add(topPlane);
    geometry.add(bottomPlane);

    if (shade) {
        updateLight(geometry);
    }
    return geometry;
}

function updateLight(group) {
    group.children.forEach(cssObj => shadeFace(cssObj));
}

function createFace(options, position, rotation) {
    const { width, height, color, opacity } = options;
    const element = document.createElement('div');
    element.className = 'face';
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.opacity = opacity ? opacity : 1;
    element.style.backgroundColor = `rgb(${color},${color},${color})`;

    const cObj = new CSS3DObject(element);
    const { x: px, y: py, z: pz } = position;
    const { x: rx, y: ry, z: rz } = rotation;
    const pos = new Vector3(px, py, pz);
    const rot = new Euler(rx * tMath.DEG2RAD, ry * tMath.DEG2RAD, rz * tMath.DEG2RAD);
    cObj.position.copy(pos);
    cObj.rotation.copy(rot);
    return cObj;
}

function shadeFace(cssObj) {
    const facePos = cssObj.position.clone().applyQuaternion(cssObj.parent.quaternion);
    const faceNormal = facePos.normalize();

    const lightNormal = pointLight.clone().sub(cssObj.parent.position).normalize();
    const light = clamp(lightNormal.dot(faceNormal), 0, 1);

    const color = light * 255;
    cssObj.element.style.backgroundColor = `rgb(${color},${color},${color})`;
}
