import Human, { WAITING, ELEVATOR } from './Human';

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LOAD = 'LOAD';

interface Elevator {
    queue: Array<Human>;
    height: number;
    floor: number;
    target: number;
}

class Elevator {
    constructor(height: number, initialPosition = 3) {
        if (!height) {
            throw new Error('Parameter height (Number) is required');
        }

        this.queue = [];
        this.height = height;
        this.floor = initialPosition;
    }

    execute() {
        // no requests to handle
        if (!this.queue.length) {
            console.log('The building looks to be empty');
            return;
        }

        // any humans on the current floor?
        // TODO Only pick up Humans going in the same direction as the elevator
        const humansOnThisFloor = this.queue.filter(human => human.currentFloor === this.floor);
        humansOnThisFloor.forEach(human => {
            if (human.state === WAITING) {
                human.setState(ELEVATOR, this.floor);
            }
        });

        if (this.queue[0].destination > this.floor) {
            this.goUp();
        } else if (this.queue[0].destination < this.floor) {
            this.goDown();
        } else {
            const arrivals = this.queue.filter(human => human.destination === this.floor);
            arrivals.forEach(human => human.setState(WAITING, this.floor));
            this.removeHumansFromQueue(arrivals);
        }
    }

    removeHumansFromQueue(humans: Array<Human>) {
        this.queue = this.queue.filter(_h => !humans.includes(_h));
    }

    removeHumanFromQueue(human: Human) {
        this.queue = this.queue.filter(_h => _h.name !== human.name);
    }

    get humansInTheElevator() {
        return this.queue.filter(human => human.state === ELEVATOR).length;
    }

    goUp() {
        if (this.floor + 1 <= this.height) {
            this.floor += 1;
            this.queue.filter(human => human.state === ELEVATOR).forEach(human => human.setCurrentFloor(this.floor));

            console.log(`Going up with ${this.humansInTheElevator}/${this.queue.length} humans to ${this.floor}`);
        } else {
            console.warn('Tried going up, but is already at top floor. Does this look like a chocolate factory?!', this.queue);
        }
    }

    goDown() {
        if (this.floor - 1 > 0) {
            this.floor -= 1;
            this.queue.filter(human => human.state === ELEVATOR).forEach(human => human.setCurrentFloor(this.floor));

            console.log(`Going down with ${this.humansInTheElevator}/${this.queue.length} humans to ${this.floor}`);
        } else {
            console.warn('I am not an U-Boat...', this.queue);
        }
    }

    summon(summoner: Human) {
        console.log('Summoned by', summoner);
        this.queue.push(summoner);
    }
}

export default Elevator;
