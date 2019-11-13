import Elevator from './Elevator';
import Human from './Human';

describe('Elewheeetor', () => {
    it('elevator is elevator', () => {
        const elevator = new Elevator(7, 1);
        expect(elevator).toBeInstanceOf(Elevator);
    });

    it('takes a human, moves it to a given floor and calls its callback', () => {
        const elevator = new Elevator(7, 2);
        const destination = 5;
        const human = new Human({
            floor: 1,
            destination,
        });
        elevator.summon(human);

        while (elevator.queue.length) {
            elevator.execute();
        }

        expect(human.currentFloor).toBe(destination);
    });
    it('picks up other humans whilst already moving', () => {
        const elevator = new Elevator(7, 1);
        const human = new Human({
            floor: 1,
            destination: 7,
        });
        const chaosMonkey = new Human({
            floor: 3,
            destination: 5,
        });
        elevator.summon(human);

        while (elevator.queue.length) {
            if (elevator.floor === 2) {
                elevator.summon(chaosMonkey);
            } else if (elevator.floor === 4) {
                expect(elevator.queue.length === 2);
            }

            elevator.execute();
        }

        expect(human.currentFloor).toBe(7);
        expect(chaosMonkey.currentFloor).toBe(5);
    });
});
