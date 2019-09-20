import { styler } from 'popmotion';

export class SceneManager {
    constructor(renderer, camera) {
        this.movie = [];
        this.playing = true;
        this.currentScene = 0;

        this.renderer = renderer;
        this.camera = camera;

        this.logoStyleUpdate = styler(document.querySelector('.logo'));
        this.rootStyleUpdate = styler(renderer.domElement);
    }

    clearScene() {
        this.renderer.domElement.querySelector('.camera-element').innerHTML = '';
    }

    getCurrentScene() {
        return this.movie[this.currentScene].scene;
    }

    getCurrentSceneContext() {
        return this.movie[this.currentScene].context;
    }

    start() {
        this.render();
        this.playNext();
    }

    add(id, scene, {context, timeline}) {
        this.movie.push({
            id,
            scene,
            context,
            timeline
        });
    }

    splitTimelineObject(timelineObject) {
        return Object.keys(timelineObject).reduce((obj, curr) => {
            if(curr.indexOf(':') !== -1) {
                const targetAndKey = curr.split(':');
                if(!obj[targetAndKey[0]]) {
                    obj[targetAndKey[0]] = {};
                }
                obj[targetAndKey[0]] = Object.assign( obj[targetAndKey[0]], { [targetAndKey[1]] : timelineObject[curr] });
            }
            return obj;
        }, {});
    }

    playNext() {
        const context = this.getCurrentSceneContext();
        this.movie[this.currentScene].timeline.start({
            update: track => {
                if (context) {
                    Object.keys(context).forEach(key => context[key](track[key], this));
                }
                const updaters = this.splitTimelineObject(track);
                this.rootStyleUpdate.set(updaters.scene);
                this.logoStyleUpdate.set(updaters.logo);
            },
            complete: () => {
                this.currentScene++;
                this.clearScene();
                if (this.currentScene < this.movie.length) {
                    this.playNext();
                } else {
                    console.log('THE END');
                    this.playing = false;
                }
            }
        });
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        if(this.playing) {
            this.renderer.render(this.getCurrentScene(), this.camera);
        }
    };
}
