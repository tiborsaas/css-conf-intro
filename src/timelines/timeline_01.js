import { TimelineManager } from '../lib/timelineManager';
import { backInOut } from '@popmotion/easing';
import { Math as M } from 'three';
import { getPerspective } from '../three-utils/getPerspective';

const SPEEDUP = 1;
const { sin, PI } = Math;

const timeline = [
    // { track: 'cameraY', to: 50, duration: 1 },
    [
        { track: 'logo:opacity', from: 0, to: 1, duration: 2500 },
        { track: 'scene:opacity', from: 0, to: 1, duration: 3500 },
        // { track: 'scene:perspective', from: '1px', duration: 10000 / SPEEDUP },
        { track: 'scene:perspective', from: '1px', to: getPerspective(), duration: 10000 / SPEEDUP },
        { track: 'cameraY', from: 50, to: 60, duration: 10000 / SPEEDUP },
        { track: 'cameraZ', from: 500, to: 600, duration: 10000 / SPEEDUP },
    ],
    [
        // { track: 'logo:transform', from: 'skewX(70deg) translateX(-100%)', to: 'skewX(0deg) translateX(0%)', duration: 2500, ease: backInOut },
        { track: 'scene:filter', from: 'blur(10px)', to: 'blur(0px)', duration: 3000 }
    ],
    { track: 'barrelRoll', from: 0, to: 360, duration: 3000, ease: backInOut },
    [
        { track: 'cameraY', from: 60, to: 150, duration: 3000 },
        { track: 'cameraZ', from: 600, to: -300, duration: 5000 }
    ],
    [
        { track: 'scene:opacity', from: 1, to: 0, duration: 1200 },
    ],
    { track: 'resetCamera', from: 0, to: 1, duration: 1 },
];

const WIDTH = 7;

const context = {
    cameraY: (val, ctx) => {
        ctx.camera.position.x = val
    },
    cameraZ: (val, ctx) => {
        ctx.camera.position.z = val
    },
    barrelRoll: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children.forEach((card, i) => {
            const x = i % WIDTH;
            const y = (i - x) / WIDTH;
            const offset = ((x - 3) * 22);
            const t = sin(PI * val / 360); // map sin(x) to 0 .. 1
            const lerpOffset = M.lerp(0, offset, t);
            card.rotation.x = (val + lerpOffset) * M.DEG2RAD;
        });
    },

    openMiddle: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        // scene.children()
    },

    resetCamera: (val, ctx) => {
        if (val === 0) {
            return;
        }
        ctx.camera.position.z = 0;
        ctx.camera.position.y = 0;
        ctx.camera.position.x = 0;
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
