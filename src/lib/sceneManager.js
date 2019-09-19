import { styler } from 'popmotion';

export class SceneManager {
    constructor(renderer, camera) {
        this.movie = [];
        this.playing = true;
        this.currentScene = 0;

        this.renderer = renderer;
        this.camera = camera;

        this.rootStyleUpdate = styler(renderer.domElement);
    }

    getCurrentSceneContext() {
        return this.movie[this.currentScene].context;
    }

    add(id, scene, {context, timeline}) {
        this.movie.push({
            id,
            scene,
            context,
            timeline
        });
    }

    start() {
        this.render();
        this.playNext();
    }

    getCurrentScene() {
        return this.movie[this.currentScene].scene;
    }

    clearScene() {
        this.renderer.domElement.querySelector('.camera-element').innerHTML = '';
    }

    playNext() {
        this.movie[this.currentScene].timeline.start({
            update: track => {
                const context = this.getCurrentSceneContext();
                if (context) {
                    Object.keys(context).forEach(key => context[key](track[key], this));
                }
                this.rootStyleUpdate.set(track);
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
