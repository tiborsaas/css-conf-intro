import { Scene, Vector3, Math as M, Group } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';

const scene = new Scene();
scene.pointLight = new Vector3(0, 200, 100);

const CUBES = 3;

for (let i = 0; i < CUBES; i++) {
    const options = {
        color: 0xffffff,
    };
    const scale = new Vector3(200, 400, 50);
    const ring = new CSSBoxMesh(scale, options);
    ring.translateX(-300 + i * 300);
    scene.add(ring);
}
export default scene;
