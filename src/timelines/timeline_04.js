import { TimelineManager } from '../lib/timelineManager';
import { easing } from 'popmotion';
import { Math as M } from 'three';

const timeline = [
    [
        { track: 'scene:opacity', from: 0, to: 1, duration: 5500 },
        { track: 'setupCamera', to: 1000, duration: 3500 }
    ],
    [
        { track: 'scene:filter', from: 'blur(10px)', to: 'blur(0px)', duration: 1000 },
        { track: 'logo:opacity', from: 1, to: 0, duration: 300 },
        { track: 'setupCamera', from: 1000, to: 250, duration: 8000 },
        { track: 'spinCube', from: 45, to: 90, duration: 45000, ease: easing.easeOut },
    ],
    '-1000',
    { track: 'scene:filter', from: 'blur(0px)', to: 'blur(15px)', duration: 1000 },
    { track: 'scene:opacity', from: 1, to: 0, duration: 1000 },
    '-1000',
    { track: 'logo:opacity', from: 0, to: 1, duration: 1500 },
];

const context = {
    setupCamera: (val, ctx) => {
        ctx.camera.position.z = val;
        ctx.camera.position.x = 0;
    },
    spinCube: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children.forEach((cube, i) => {
            cube.rotation.z = (val * i * M.DEG2RAD);
        });
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
