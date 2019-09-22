import {
    Color,
    Math as M
} from "three";
const { clamp } = M;

const BLACK = new Color(0x000000);

export class DOMLights {
    constructor(threeGroup) {
        this.group = threeGroup;
    }

    set(lightSource) {
        this.group.children.forEach(cssObj => this.shadeFace(lightSource, cssObj));
    }

    updateGroup(threeGroup) {
        this.group = threeGroup;
    }

    shadeFace(lightSource, cssObj) {
        const facePos = cssObj.position.clone().applyQuaternion(cssObj.parent.quaternion);
        const faceNormal = facePos.normalize();

        const lightNormal = lightSource.clone().sub(cssObj.parent.position).normalize();
        const light = clamp(lightNormal.dot(faceNormal), 0, 1);

        const objColor = new Color(cssObj.color);

        const color = objColor.lerp(BLACK, light);
        cssObj.element.style.backgroundColor = `#${color.getHexString()}`;
    }
}
