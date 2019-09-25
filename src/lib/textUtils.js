import { tween, delay, styler } from "popmotion";

const SPEED = 80;
const FADE_LENGTH = 200;

export function renderLines(lines, _root) {
    _root.innerHTML = '';
    lines.forEach(line => {
        const sentence = line.split('')
            .map(char => `<span>${char}</span>`)
            .join('');
        _root.innerHTML += `<p>${sentence}</p>`;
    });
    return lines.length;
}

export function animateScene(_root) {
    const chars = _root.querySelectorAll('span');
    chars.forEach((char, i) => {
        const anim = tween({
            from: {
                opacity: 0,
                translateY: '-5px'
            },
            to: {
                opacity: 1,
                translateY: '0px'
            },
            duration: FADE_LENGTH,
        });
        const charStyle = styler(char);
        delay(i * SPEED).start({
            complete: () => {
                anim.start({
                    update: val => charStyle.set(val)
                });
            }
        })
    });
    return chars.length * SPEED;
}
