import { Scene, Vector3, Math as M, Group } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';

const scene = new Scene();
scene.pointLight = new Vector3(0, 200, 100);

const RINGS = 54;

for (let i = 0; i < RINGS; i++) {
    const options = {
        color: 0xffffff,
        disable: {
            front: true,
            back: true,
        }
    };
    // const scalar = 200 / (i + 1);
    // const scale = new Vector3(scalar, scalar * 15, 20);
    const scalar = 200 / (i + 1);
    const scale = new Vector3(scalar * 10, scalar * 15, 15);
    const ring = new CSSBoxMesh(scale, options);
    ring.translateZ(-i * 30);
    ring.rotateZ(i * (185 / RINGS) * M.DEG2RAD);
    scene.add(ring);
}
export default scene;
