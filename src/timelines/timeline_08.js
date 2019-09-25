import { TimelineManager } from '../lib/timelineManager';

let textRendered = false;

const timeline = [
    { track: 'start', to: 1, duration: 1 },
    { track: 'logo:opacity', to: 0, duration: 1 },
    { track: 'text:filter', from: 'blur(20px)', to: 'blur(0px)', duration: 1500 },
    '5000',
    { track: 'text:opacity', from: 1, to: 0, duration: 1500 },
    { track: 'reset', from: 0, to: 1, duration: 1 },
];

const context = {
    start: (val, ctx) => {
        if(!textRendered) {
            const scene = ctx.getCurrentScene();
            scene.start();
            textRendered = true;
        }
    },
    reset: val => {
        if(val !== 0) {
            textRendered = false;
        }
    }
};

const timelineObject = new TimelineManager(timeline, context);
export default timelineObject;
