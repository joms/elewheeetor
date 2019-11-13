import Elevator from './Elevator';
import Engine from './Engine';
import Human from './Human';
import { UP, DOWN } from './Elevator';

console.log('Initializing elewheetor');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');

const humans: Array<Human> = [];

const createRandomHuman = (buildingHeight: number) => {
    const currentFloor = Math.ceil(Math.random() * buildingHeight);

    let direction = DOWN;
    let destination: number;

    // calculate direction
    if (Math.random() > 0.5) {
        if (currentFloor < buildingHeight) {
            direction = UP;
        }
    } else {
        if (currentFloor <= 0) {
            direction = UP;
        }
    }

    if (direction === UP) {
        const availableFloors = buildingHeight - currentFloor;
        destination = currentFloor + Math.ceil(Math.random() * availableFloors);
    } else {
        const availableFloors = currentFloor - 1;
        destination = currentFloor - Math.ceil(Math.random() * availableFloors);
        if (destination <= 0) {
            destination = 1;
        }
    }

    return new Human({
        onLeave: h => {
            humans.includes(h) && humans.splice(humans.indexOf(h), 1);
            console.log(`Left the elevator at floor ${h.currentFloor}`, h);
        },
        onEnter: h => {
            console.log(`Entered the elevator at floor ${h.currentFloor}`, h);
        },
        floor: currentFloor,
        destination,
    });
};

const spawnHuman = () => {
    if (humans.length < 10) {
        const human = createRandomHuman(7);
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
