export const UP = 'UP';
export const DOWN = 'DOWN';
export const LOAD = 'LOAD';

class Elevator {
    constructor(height, initialPosition = 3) {
        if (!Number(height)) {
            throw new Error('Parameter height (Number) is required');
        }

        this.queue = [];
        this.height = height;
        this.floor = initialPosition;
    }

    addItemToQueue(item) {
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
}

export default Elevator;
