import { Math as M } from 'three';
import { TimelineManager } from '../lib/timelineManager';
import { backIn, easeInOut } from '@popmotion/easing';

const { sin, PI } = Math;

const timeline = [
    // { track: 'logo:opacity', from: 0, to: 1, duration: 15000 },
    { track: 'setupCamera', to: 750, duration: 1 },
    { track: 'spinField', from: 0, to: 360, duration: 3000 },
    { track: 'scaleDown', from: 0, to: 5000, duration: 5000, ease: easeInOut },
];

const WIDTH = 7;

const context = {
    setupCamera: (val, ctx) => {
        ctx.camera.position.z = val;
    },
    spinField: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children[0].children.forEach((card, i) => {
            const x = i % WIDTH;
            const y = (i - x) / WIDTH;
            const offset = ((x-3) *22);
            const t = sin(PI * val / 360); // map sin(x) to 0 .. 1
            const lerpOffset = M.lerp(0, offset, t);
            card.rotation.x = (val + lerpOffset) * M.DEG2RAD;
        });
    },
    scaleDown: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children[0].children.forEach((card, i) => {
            const x = i % WIDTH;
            const y = (i - x) / WIDTH;
            const offset = ((x-3) * i);
            const t = sin(PI * val / 5000); // map sin(x) to 0 .. 1
            const lerpOffset = M.lerp(0, offset, t);
            card.position.z = val + lerpOffset * 80;
        });
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;