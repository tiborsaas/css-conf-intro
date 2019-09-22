import {
    Math as tMath,
    Vector3,
    Euler,
} from 'three';

import { CSS3DObject } from '../three-utils/CSS3DRenderer';

export function createFace(options, position, rotation) {
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

    cObj.color = color;
    cObj.position.copy(pos);
    cObj.rotation.copy(rot);

    return cObj;
}
