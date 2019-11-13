import uuid from 'uuid/v4';

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
    floor: number;
    destination: number;
    state?: string;
}

class Human {
    constructor(options: HumanOptions) {
        const { buildingHeight = 7, floor = 1, destination, state = WAITING, onLeave, onEnter } = options;

        if (onLeave) {
            this.onLeave = onLeave;
        }

        if (onEnter) {
            this.onEnter = onEnter;
        }

        this.destination = destination;
        this.currentFloor = floor;
        this.state = state;
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
