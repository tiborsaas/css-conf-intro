import { SceneManager } from "./sceneManager";

import Scene01 from '../scenes/scene_01';
import Timeline01 from '../timelines/timeline_01';

import Scene02 from '../scenes/scene_02';
import Timeline02 from '../timelines/timeline_02';

import Scene03 from '../scenes/scene_03';
import Timeline03 from '../timelines/timeline_03';

import Scene04 from '../scenes/scene_04';
import Timeline04 from '../timelines/timeline_04';

import Scene05 from '../scenes/scene_05';
import Timeline05 from '../timelines/timeline_05';

export function start(renderer, camera) {
    const movie = new SceneManager(renderer, camera);
    movie.add('intro', Scene01, Timeline01);
    movie.add('box', Scene02, Timeline02);
    movie.add('chamber', Scene03, Timeline03);
    movie.add('tunnel', Scene04, Timeline04);
    movie.add('cards', Scene05, Timeline05);
    movie.start();
}