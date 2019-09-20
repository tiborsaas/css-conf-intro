import { TimelineManager } from '../lib/timelineManager';
import { easing } from 'popmotion';
import { Math as M } from 'three';

const timeline = [
    { track: 'logo:opacity', form: 0, to: 0, duration: 2500 },
    { track: 'logo:opacity', form: 0, to: 1, duration: 1000 },
    { track: 'scene:opacity', form: 0, to: 1, duration: 1000 },
    [{ track: 'cameraX', from: 0, to: 0, duration: 500 },
    { track: 'cameraZ', from: 300, to: 800, duration: 500 }],
    { track: 'spinCube', from: 0, to: 360 * 2, duration: 5000, ease: easing.backInOut },
];

const context = {
    cameraZ: (val, ctx) => {
        ctx.camera.position.z = val
    },
    cameraX: (val, ctx) => {
        ctx.camera.position.x = val
    },
    spinCube: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children[0].rotation.y = val * M.DEG2RAD;
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
