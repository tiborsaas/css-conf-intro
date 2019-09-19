import { TimelineManager } from '../lib/timelineManager';

const timeline = [
    [{ track: 'cameraX', from: 0, to: 0, duration: 5000 },
    { track: 'cameraZ', from: 300, to: 800, duration: 5000 }],
];

const context = {
    cameraZ: (val, ctx) => {
        ctx.camera.position.z = val
    },
    cameraX: (val, ctx) => {
        ctx.camera.position.x = val
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
