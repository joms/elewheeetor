import Elevator from './Elevator';
import Engine from './Engine';
import Human from './Human';

console.log('Initializing elewheetor');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const humans = [];

const spawnHuman = () => {
    if (humans.length < 1) {
        const human = new Human();
        humans.push(human);
        return human;
    }
};

const elevator = new Elevator(7);
const render = () => {
    // Math.random() > 0.5 ? elevator.goUp() : elevator.goDown();
    const h = spawnHuman();
    if (h) {
        elevator.summon(h);
    }
    // console.table(humans);
};

const engine = new Engine(undefined, 1);

startButton!.onclick = () => engine.start(render);
stopButton!.onclick = engine.stop;
