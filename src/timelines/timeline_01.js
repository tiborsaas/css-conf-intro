import { TimelineManager } from '../lib/timelineManager';

const timeline = [
    [
        { track: 'scene:opacity', from: 0, to: 1, duration: 2500 },
        { track: 'scene:filter', from: 'blur(10px)', to: 'blur(0px)', duration: 3000 }
    ],
    [
        { track: 'cameraX', from: -150, to: 150, duration: 3000 },
        { track: 'cameraZ', from: 300, to: 800, duration: 5000 }
    ],
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
