import { renderLines, animateScene } from "../lib/textUtils";

const sceneRoot = document.querySelector('.text');

const lines = [
    'Welcome to CSSConf Budapest',
    'Nice to see you here!'
];

function start() {
    renderLines(lines, sceneRoot);
    return animateScene(sceneRoot);
}

export default {
    type: 'textScene',
    start
}
