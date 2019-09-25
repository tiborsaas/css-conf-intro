import { renderLines, animateScene } from "../lib/textUtils";

const sceneRoot = document.querySelector('.text');

const lines = [
    'Visulas by',
    '@tiborsaas',
    'Live:JS 2019'
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
