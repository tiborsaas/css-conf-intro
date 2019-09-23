import { Scene, Vector3, Math as M, Group } from 'three';
import { createFace } from '../three-css/CSSFace';

const scene = new Scene();
scene.pointLight = new Vector3(300, 120, 500);

const COLS = 7;
const ROWS = 5;

for (let y = -2; y < ROWS - 2; y++) {
    for (let x = -3; x < COLS - 3; x++) {
        const options = {
            width: 190,
            height: 190,
            color: 0xffffff,
        };
        const rotation = new Vector3();
        const position = new Vector3(x * 200, y * 200, 0);
        const face = createFace(options, position, rotation);
        const field = new Group();
        field.add(face);
        scene.add(field);
    }
}
export default scene;
