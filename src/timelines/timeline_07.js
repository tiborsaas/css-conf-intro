import { Math as M } from 'three';
import { TimelineManager } from '../lib/timelineManager';
import { backIn } from '@popmotion/easing';

const timeline = [
    { track: 'scene:opacity', from: 0, to: 1, duration: 2000 },
    { track: 'setupCamera', to: 115, duration: 1 },
    [
        { track: 'moveCamera', from: 150, to: 1600, duration: 35000, ease: backIn },
        { track: 'rotateCamera', from: 0, to: 180, duration: 25000 },
        { track: 'scene:filter', from: 'blur(0px)', to: 'blur(15px)', duration: 8000 },
    ],
    { track: 'logo:opacity', from: 0, to: 1, duration: 1000 },
    '15000',
    { track: 'logo:filter', from: 'invert(0)', to: 'invert(1)', duration: 3000 },
    { track: 'logo:opacity', from: 1, to: 0, duration: 1000 },
];

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
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
