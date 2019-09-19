import { TimelineManager } from '../lib/timelineManager';

const timeline = [
    { track: 'cameraX', from: -150, to: 150, duration: 3000 },
    { track: 'cameraZ', from: 300, to: 800, duration: 5000 },
];

const context = {
    cameraX: (val, ctx) => {
        ctx.camera.position.x = val
    },
    cameraZ: (val, ctx) => {
        ctx.camera.position.z = val
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
