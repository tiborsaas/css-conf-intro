let perspective = 0;


export function setPerspective(camera, MAX_WIDTH) {
    const WIDTH = window.innerWidth * MAX_WIDTH;
    const WIDE_RATIO = .3333;
    perspective = camera.projectionMatrix.elements[ 5 ] * (WIDTH * WIDE_RATIO / 2);
}

export function getPerspective() {
    return perspective;
}
