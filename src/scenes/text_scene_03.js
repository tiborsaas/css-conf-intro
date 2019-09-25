import { renderLines, animateScene } from "../lib/textUtils";

const sceneRoot = document.querySelector('.text');

const lines = [
    'This is 100% CSS rendering',
    'powered by Three.js',
    'and Popmotion'
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
