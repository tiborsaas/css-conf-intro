import { timeline } from 'popmotion';

export class TimelineManager {
    constructor(script, context) {
        this.timeline = timeline(script);
        this.context = context;
    }
}
