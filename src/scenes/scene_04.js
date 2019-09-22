import { Scene, Vector3, Math as M, Group } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';

const scene = new Scene();
scene.pointLight = new Vector3(250, 250, -200);

const { sin, random, floor, abs } = Math;
const randomInt = num => floor(random() * num);
const OBJECTS = 6;

for (let x = 0; x < OBJECTS; x++) {
    const scale = new Vector3(200, 200, 2000);
    const cubeObject = new CSSBoxMesh(scale);
    scene.add(cubeObject);
}

export default scene;
