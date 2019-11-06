import Elevator from './Elevator';
import Engine from './Engine';
import Human from './Human';

console.log('Initializing elewheetor');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const humans = [];

const spawnHuman = () => {
    humans.push(new Human());

    if (humans.length > 10) {
        humans.shift();
    }
};

const elevator = new Elevator(7);
const render = () => {
    Math.random() > 0.5 ? elevator.goUp() : elevator.goDown();
};

const engine = new Engine(null, 1);

startButton.onclick = () => engine.start(render);
stopButton.onclick = engine.stop;
