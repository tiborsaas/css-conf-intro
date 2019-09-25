import { Math as M } from 'three';
import { TimelineManager } from '../lib/timelineManager';
import { backIn, easeInOut } from '@popmotion/easing';

const { sin, PI } = Math;

const timeline = [
    { track: 'setupCamera', to: 800, duration: 1 },
    { track: 'scene:opacity', from: 0, to: 1, duration: 1500 },
    { track: 'spinField', to: 0, duration: 1 },
    { track: 'spinField', from: 0, to: 360, duration: 8000 },
    { track: 'scaleDown', from: 0, to: 5000, duration: 5000, ease: easeInOut },
    { track: 'logo:filter', from: 'invert(0)', to: 'invert(1)', duration: 3000 },
    { track: 'logo:opacity', from: 1, to: 0, duration: 1000 },
];

const WIDTH = 7;

const context = {
    setupCamera: (val, ctx) => {
        ctx.shadeScene();
        ctx.camera.position.z = val;
        ctx.camera.position.y = 100;
    },
    spinField: (val, ctx) => {
        if(val === 0) return;
        const scene = ctx.getCurrentScene();
        scene.children.forEach((card, i) => {
            const x = i % WIDTH;
            const y = (i - x) / WIDTH;
            const offset = ((x-3) * 22);
            const t = sin(PI * val / 360); // map sin(x) to 0 .. 1
            const lerpOffset = M.lerp(0, offset, t);
            card.rotation.x = (val + lerpOffset) * M.DEG2RAD;
        });
    },
    scaleDown: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children.forEach((card, i) => {
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
