let perspective = 0;

export function setPerspective(camera) {
    perspective = camera.projectionMatrix.elements[ 5 ] * (window.innerHeight / 2);
}

export function getPerspective() {
    return perspective;
}
