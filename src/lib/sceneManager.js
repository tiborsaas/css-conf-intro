import { styler } from 'popmotion';
import { DOMLights } from '../three-css/DOMLights';

export class SceneManager {
    constructor(renderer, camera) {
        this.movie = [];
        this.playing = true;
        this.currentScene = 0

        this.renderer = renderer;
        this.camera = camera;

        this.logoStyleUpdate = styler(document.querySelector('.logo'));
        this.rootStyleUpdate = styler(renderer.domElement);
        this.textStyleUpdate = styler(document.querySelector('.text'));
        this.perspective = renderer.domElement.style.perspective;
        this.lightModel = new DOMLights();
    }

    clearScene() {
        this.renderer.domElement.querySelector('.camera-element').innerHTML = '';
    }

    setSceneId() {
        const movie = this.movie[this.currentScene];
        this.renderer.domElement.querySelector('.camera-element').id = movie.id;
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
        this.setSceneId();
        const context = this.getCurrentSceneContext();
        this.movie[this.currentScene].timeline.start({
            update: track => {
                if (context) {
                    Object.keys(context).forEach(key => context[key](track[key], this));
                }
                const updaters = this.splitTimelineObject(track);
                this.rootStyleUpdate.set(updaters.scene);
                this.logoStyleUpdate.set(updaters.logo);
                this.textStyleUpdate.set(updaters.text);
            },
            complete: () => {
                this.currentScene++;
                this.clearScene();
                if (this.currentScene < this.movie.length) {
                    this.playNext();
                } else {
                    // Horrible hack to resolve a state bug :/
                    window.location.href = '/';
                }
            }
        });
    }

    shadeScene() {
        const scene = this.getCurrentScene();
        if(scene.type !== 'Scene') {
            return;
        }
        if(scene.pointLight) {
            scene.children.forEach(child => {
                this.lightModel.updateGroup(child);
                this.lightModel.set(scene.pointLight);
            });
        }
    }

    render() {
        requestAnimationFrame(this.render.bind(this));

        if(this.playing) {
            this.shadeScene();
            const scene = this.getCurrentScene();
            if(scene.type === 'Scene') {
                this.renderer.render(scene, this.camera);
            }
        }
    };
}
