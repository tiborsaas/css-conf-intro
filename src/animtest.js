import { timeline, easing, styler } from 'popmotion';
import { _Math } from 'three/src/math/Math';

const styleUpdate = styler(document.querySelector('.box'));

const script = [];
let currentScript = 0;

/**
 * - Move chapters to separate files
 * - Create a Movei class that handles scripts playback
 */

const scene1 = timeline([
    [
        { track: 'x', from: 0, to: 300, duration: 1000 },
        { track: 'y', from: 0, to: 300, duration: 2000 },
    ],
    { track: 'cameraX', from: 0, to: 300, duration: 300 },
    { track: 'x', from: 300, to: 0, duration: 200 },
    { track: 'backgroundColor', from: '#ff0000', to: "#000000" }
]);

const sceneOneContext = {
    cameraX: x => console.log(x)
};
const chapter1 = createAnimationScene('first', sceneOneContext, scene1);

script.push(chapter1);


const scene2 = timeline([
    { track: 'x', from: 0, to: 500 },
    { track: 'y', from: 300, to: 500 },
]);

script.push(createAnimationScene('second', {}, scene2));

function getCurrentSceneContext() {
    return script[currentScript].context;
}

function createAnimationScene(id, context, timeline) {
    return {
        id,
        context,
        timeline
    }
}

function playNext() {
    script[currentScript].timeline.start({
        update: track => {
            const context = getCurrentSceneContext();
            if (context) {
                Object.keys(context).forEach(key => context[key](track[key]));
            }
            styleUpdate.set(track);
        },
        complete: () => {
            currentScript++;
            if (currentScript < script.length) {
                playNext();
            }
        }
    });
}

playNext();