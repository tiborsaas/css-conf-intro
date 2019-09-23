import { TimelineManager } from '../lib/timelineManager';
import { easing } from 'popmotion';
import { Math as M, Vector3 } from 'three';

const timeline = [
    { track: 'setupCamera', to: 190, duration: 0 },
    [
        { track: 'scene:opacity', from: 0, to: 1, duration: 3000 },
        { track: 'spinCube', from: -15, to: 15, duration: 35000, ease: easing.circIn },
        '5500',
        { track: 'logo:opacity', from: 0, to: 1, duration: 3000 },
    ],
    { track: 'spinCube', from: 15, to: 25, duration: 15000, ease: easing.circOut },
    { track: 'scaledown', from: 0, to: 2, duration: 3000 },
    { track: 'scene:opacity', from: 1, to: 0, duration: 2000 },
];

const context = {
    setupCamera: (val, ctx) => {
        ctx.camera.position.z = val;
    },
    spinCube: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children.forEach((cube, i) => {
            cube.rotation.x = (val * (25 + i) * M.DEG2RAD);
            cube.rotation.y = (val * (25 + i) * M.DEG2RAD);
        });
    },
    scaledown: (val, ctx) => {
        if(val === 0) {
            return;
        }
        const scene = ctx.getCurrentScene();
        scene.children.forEach((cube, i) => {
            cube.position.x += val * Math.random() - .5;
            cube.position.z += val * Math.random() - .5;
            cube.position.z += val * Math.random() - .5;
        });
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
