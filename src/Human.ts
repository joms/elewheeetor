import uuid from 'uuid/v4';
import { UP, DOWN } from './Elevator';

export const ELEVATOR = 'inside the elevator';
export const WAITING = 'waiting outside';

interface Human {
    currentFloor: number
    direction: string
    destination: number
    name: string
    state: string
    callback?: Function
}

interface HumanOptions {
    buildingHeight?: number
    callback?: Function
}

class Human {
    constructor(options: HumanOptions) {
        const {buildingHeight = 7, callback} = options;

        this.currentFloor = Math.ceil(Math.random() * buildingHeight);
        this.state = WAITING;
        if (callback) {
            this.callback = callback;
            this.callback = this.callback.bind(this);
        }

        // calculate direction
        if (Math.random() > 0.5) {
            if (this.currentFloor < buildingHeight) {
                this.direction = UP;
            } else {
                this.direction = DOWN;
            }
        } else {
            if (this.currentFloor > 0) {
                this.direction = DOWN;
            } else {
                this.direction = UP;
            }
        }

        if (this.direction === UP) {
            const availableFloors = buildingHeight - this.currentFloor;
            this.destination = this.currentFloor + Math.ceil(Math.random() * availableFloors);
        } else {
            const availableFloors = this.currentFloor - 1 === 0 ? 1 : this.currentFloor - 1;
            this.destination = this.currentFloor - Math.ceil(Math.random() * availableFloors);
        }

        this.name = uuid();
    }

    setCurrentFloor(floor: number) {
        this.currentFloor = floor;
    }

    setState(state: string, floor: number) {
        if (this.state === ELEVATOR && state === WAITING) {
            if (this.callback) {
                this.callback(this);
            }
        }

        this.state = state;
        this.currentFloor = floor;
        // TODO check if we're on our destination, and do some kind of callback
    }
}

export default Human;
