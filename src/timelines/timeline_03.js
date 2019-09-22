import { TimelineManager } from '../lib/timelineManager';
import { easing } from 'popmotion';
import { Math as M } from 'three';

const timeline = [
    { track: 'setupCamera', to: 50, duration: 0 },
    { track: 'spinCube', from: 0, to: 25, duration: 30000, ease: easing.easeOut },
];

const context = {
    setupCamera: (val, ctx) => {
        ctx.camera.position.z = val;
    },
    spinCube: (val, ctx) => {
        const scene = ctx.getCurrentScene();
        scene.children.forEach((cube, i) => {
            cube.rotation.x = (val * i * M.DEG2RAD);
            cube.rotation.y = (val * i * M.DEG2RAD);
        });
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
