import { Scene, Vector3, Math as M } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';
import { tween } from 'popmotion';
import { backInOut } from '@popmotion/easing';

const scene = new Scene();
scene.pointLight = new Vector3(0, 150, 80);

const { sin, random, floor, abs } = Math;
const COLS = 7;
const ROWS = 3;

for (let x = -3; x < COLS - 3; x++) {
    for (let y = -1; y < ROWS - 1; y++) {
        const scale = new Vector3(random() * 200, random() * 200, random() * 500);
        const cubeObject = new CSSBoxMesh(scale);
        cubeObject.translateX(250 * x);
        cubeObject.translateY(250 * y);

        const rotateY = 90 * floor(random() - 1);
        cubeObject.rotateY(rotateY);

        const rotateX = 90 * floor(random());
        cubeObject.rotateX(rotateX);

        scene.add(cubeObject);
    }
}

export default scene;
