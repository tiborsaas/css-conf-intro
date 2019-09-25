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

import Scene06 from '../scenes/scene_06';
import Timeline06 from '../timelines/timeline_06';
import Timeline09 from '../timelines/timeline_09';

import Scene07 from '../scenes/scene_07';
import Timeline07 from '../timelines/timeline_07';

import TextScene from '../scenes/text_scene_01';
import Timeline08 from '../timelines/timeline_08';

import TextScene2 from '../scenes/text_scene_02';
import TextScene3 from '../scenes/text_scene_03';
import TextScene4 from '../scenes/text_scene_04';


export function start(renderer, camera) {
    const movie = new SceneManager(renderer, camera);
    movie.add('intro-text', TextScene, Timeline08);
    movie.add('trio', Scene07, Timeline07);
    movie.add('not-text', TextScene2, Timeline08);
    movie.add('this-is-text', TextScene3, Timeline08);
    movie.add('box', Scene02, Timeline02);
    movie.add('liftoff', Scene06, Timeline06);
    movie.add('intro', Scene01, Timeline01);
    movie.add('tunnel', Scene04, Timeline04);
    movie.add('cards', Scene05, Timeline05);
    movie.add('chamber', Scene03, Timeline03);
    movie.add('liftoff', Scene06, Timeline09);
    movie.add('credits-text', TextScene4, Timeline08);
    movie.start();
}
