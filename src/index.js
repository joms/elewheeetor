import Elevator from './Elevator';
import Engine from './Engine';
import Human from './Human';

console.log('Initializing elewheetor');

const humans = [];

const spawnHuman = () => {
    humans.push(new Human());

    if (humans.length > 10) {
        humans.shift();
    }
};

const elevator = new Elevator(7);

const engine = new Engine(() => {
    // console.log('tick at', Date.now());
    console.log(elevator.floor);
    Math.random() > 0.5 ? elevator.goUp() : elevator.goDown();
}, 1);
3;
