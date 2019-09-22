import { Scene, Vector3 } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';

const scene = new Scene();
scene.pointLight = new Vector3(0, 10, 80);

const scale = new Vector3(500, 500, 500);
const cubeObject = new CSSBoxMesh(scale, {
    color: 0xFF6347
});
scene.add(cubeObject);

export default scene;
