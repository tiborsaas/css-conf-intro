import { Scene, Vector3 } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';

const scene = new Scene();

const { sin, random, floor, abs } = Math;
const COLS = 7;
const ROWS = 3;

for (let x = -3; x < COLS - 3; x++) {
    for (let y = -1; y < ROWS - 1; y++) {
        const scale = new Vector3(random() * 200, random() * 200, random() * 500);
        const cubeObject = new CSSBoxMesh(scale);
        cubeObject.translateX(250 * x);
        cubeObject.translateY(250 * y);
        cubeObject.rotateY(90 * floor(random() - 1));
        cubeObject.rotateX(90 * floor(random()));
        scene.add(cubeObject);
    }
}

export default scene;
