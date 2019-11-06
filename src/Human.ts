import uuid from 'uuid/v4';
import { UP, DOWN } from './Elevator';

interface Human {
    currentFloor: number
    direction: string
    destination: number
    name: string
}

class Human {
    constructor(buildingHeight = 7) {
        this.currentFloor = Math.ceil(Math.random() * buildingHeight);

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
}

export default Human;
