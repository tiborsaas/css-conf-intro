import { Scene, Vector3 } from 'three';
import { CSSBoxMesh } from '../three-css/CSSBoxMesh';

const scene = new Scene();

const { sin, random, floor, abs } = Math;

const scale = new Vector3(500, 500, 500);
const cubeObject = new CSSBoxMesh(scale);
scene.add(cubeObject);

export default scene;
