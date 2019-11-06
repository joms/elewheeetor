import Human from "./Human";

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LOAD = 'LOAD';

interface Elevator {
    queue: Array<Object>
    height: number
    floor: number
    target: number
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

    addItemToQueue(item: object) {
        this.queue.push(item);
    }

    goUp() {
        if (this.floor + 1 < this.height) {
            this.floor += 1;
        }
    }

    goDown() {
        if (this.floor - 1 > 0) {
            this.floor -= 1;
        }
    }

    summon(summoner: Human) {
        console.log(summoner);
        if (!this.target) {
            this.target = summoner.destination;
        }
    }
}

export default Elevator;
