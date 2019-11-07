import Elevator from './Elevator';
import Engine from './Engine';
import Human from './Human';

console.log('Initializing elewheetor');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const humans: Array<Human> = [];

const spawnHuman = () => {
    if (humans.length < 10) {
        const human = new Human({
            onLeave: h => {
                humans.includes(h) && humans.splice(humans.indexOf(h), 1);
                console.log(`Left the elevator at floor ${h.currentFloor}`, h);
            },
            onEnter: h => {
                console.log(`Entered the elevator at floor ${h.currentFloor}`, h);
            },
        });
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
    elevator.execute();
};

const engine = new Engine(undefined, 1);

startButton!.onclick = () => engine.start(render);
stopButton!.onclick = engine.stop;
