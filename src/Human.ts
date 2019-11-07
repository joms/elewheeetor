import uuid from 'uuid/v4';
import { UP, DOWN } from './Elevator';

export const ELEVATOR = 'inside the elevator';
export const WAITING = 'waiting outside';

// TODO Add states for spawned and arrived

interface Human {
    currentFloor: number;
    enteredAtFloor: number;
    direction: string;
    destination: number;
    name: string;
    state: string;
    onLeave?: Function;
    onEnter?: Function;
}

interface HumanOptions {
    buildingHeight?: number;
    onLeave?: Function;
    onEnter?: Function;
}

class Human {
    constructor(options: HumanOptions) {
        const { buildingHeight = 7, onLeave, onEnter } = options;

        this.currentFloor = Math.ceil(Math.random() * buildingHeight);
        this.enteredAtFloor = this.currentFloor;
        this.state = WAITING;
        if (onLeave) {
            this.onLeave = onLeave;
            this.onLeave = this.onLeave.bind(this);
        }

        if (onEnter) {
            this.onEnter = onEnter;
            this.onEnter = this.onEnter.bind(this);
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
            const availableFloors = this.currentFloor - 1;
            this.destination = this.currentFloor - Math.ceil(Math.random() * availableFloors);
            if (this.destination <= 0) {
                this.destination = 1;
            }
        }

        this.name = uuid();
    }

    setCurrentFloor(floor: number) {
        this.currentFloor = floor;
    }

    setState(state: string, floor: number) {
        if (this.state === ELEVATOR && state === WAITING && this.onLeave) {
            this.onLeave(this);
        } else if (this.state === WAITING && state === ELEVATOR && this.onEnter) {
            this.onEnter(this);
        }

        this.state = state;
        this.currentFloor = floor;
    }
}

export default Human;
