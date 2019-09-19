import {
    Group,
    Vector3,
    Math as tMath
} from 'three';

import { createFace } from './CSSFace';
const { clamp } = tMath;

export class CSSBoxMesh extends Group {
    constructor(scalarVec, options = {}) {
        super();
        this.geometry = new Group();
        this.scalarVec = scalarVec;
        this.options = options;

        this.createGeometry();
    }

    createGeometry() {
        const {
            opacity = 1,
            color = 0xffffff,
        } = this.options;

        const { x: sx, y: sy, z: sz } = this.scalarVec;
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

        this.add(frontPlane);
        this.add(backPlane);
        this.add(leftPlane);
        this.add(rightPlane);
        this.add(topPlane);
        this.add(bottomPlane);
    }

    applyLight(lightSource) {
        this.children.forEach(cssObj => this.shadeFace(lightSource, cssObj));
    }

    shadeFace(lightSource, cssObj) {
        const facePos = cssObj.position.clone().applyQuaternion(cssObj.parent.quaternion);
        const faceNormal = facePos.normalize();

        const lightNormal = lightSource.clone().sub(cssObj.parent.position).normalize();
        const light = clamp(lightNormal.dot(faceNormal), 0, 1);

        const color = light * 255;
        cssObj.element.style.backgroundColor = `rgb(${color},${color},${color})`;
    }
}
