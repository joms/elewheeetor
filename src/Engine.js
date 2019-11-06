let ticks = 0;

class Engine {
    /**
     *
     * @param {int} tickRate Ticks per second
     */
    constructor(render = () => null, tps = 10) {
        this.tps = tps;
        this.tickLoop = setInterval(() => {
            ticks += 1;
            render();
        }, 1000 / tps);
    }

    cancelLoop() {
        clearInterval(this.tickLoop);
    }
}

export default Engine;
