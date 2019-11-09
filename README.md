# elewheetor

![](https://media.giphy.com/media/P8XjmO1TTX3Nu/giphy.gif)

## Problem

Create an elevator. It should move an infinite number of persons between floors in a building with a known height.

## Plan of attack

First of all I set about to create an `Elevator` class which'll know all the useful stuff (height) about the building. I also created an `Engine` to handle spawning `Human` and updating the elevator.

At a later stage the engine could handle the responsibility of rendering a UI representation of the elevator state.

The elevator has the responsibility of moving itself from floor to floor, whilst yelling at the passengers where they are, and throw them out of the elevator when they arrive at their floor.

## The science behind the elewheetor

When a human spawns, it'll decide its destination floor and then summon the elevator telling it the needed direction to go.

The elevator will upon getting summoned add the human to a queue. It will then look at where the human is and start moving there. At any floor, it'll check if there are any humans at the given floor, and if it is, it'll move them inside the elevator. In the same manner, the elevator will check if any humans has this floor as their destination and kick them out.

When a human arrives at a floor, it'll call a callback notifying the engine they've arrived and'll be removed from the human overview for spawning of new humans.
