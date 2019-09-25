import { renderLines, animateScene } from "../lib/textUtils";

const sceneRoot = document.querySelector('.text');

const lines = [
    'This is not WebGL',
    'This is not <canvas/>',
    'This is not <video/>'
];

function start() {
    console.log('text scene 2');

    renderLines(lines, sceneRoot);
    return animateScene(sceneRoot);
}

export default {
    type: 'textScene',
    start
}
