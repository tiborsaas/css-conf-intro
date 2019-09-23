import { Math as M } from 'three';
import { TimelineManager } from '../lib/timelineManager';
import { backIn, easeInOut, backOut } from '@popmotion/easing';

const { sin, PI } = Math;

const timeline = [
    { track: 'setupCamera', to: 115, duration: 1 },
    [
        { track: 'moveCamera', from: 115, to: -1600, duration: 25000, ease: backIn },
        { track: 'rotateCamera', from: 0, to: 180, duration: 25000 },
        { track: 'scene:filter', from: 'blur(0px)', to: 'blur(15px)', duration: 8000 },
    ],
    { track: 'logo:opacity', from: 0, to: 1, duration: 1000 },
    '15000',
    { track: 'logo:filter', from: 'invert(0)', to: 'invert(1)', duration: 3000 },
];

const WIDTH = 7;

const context = {
    setupCamera: (val, ctx) => {
        ctx.camera.position.z = val;
        ctx.camera.position.y = 0;
        ctx.camera.position.x = 0;
    },
    moveCamera: (val, ctx) => {
        ctx.camera.position.z = val;
    },
    rotateCamera: (val, ctx) => {
        ctx.camera.rotation.z = val * M.DEG2RAD;
    },
    spinStripes: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children.forEach((card, i) => {
            const x = i % WIDTH;
            const y = (i - x) / WIDTH;
            const offset = ((x-3) *22);
            const t = sin(PI * val / 360); // map sin(x) to 0 .. 1
            const lerpOffset = M.lerp(0, offset, t);
            card.rotation.x = (val + lerpOffset) * M.DEG2RAD;
        });
    },
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
