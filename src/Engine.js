let ticks = 0;

class Engine {
    /**
     *
     * @param {int} tickRate Ticks per second
     */
    constructor(render, tps = 10) {
        this.tps = tps;
        this.render = null;
        this.tickId = 0;
        this.tick = this.tick.bind(this);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);

        if (render) {
            this.start(render);
        }
    }

    stop(reason) {
        console.log('Going to a halt:', reason);
        clearTimeout(this.tickId);
        this.tickId = null;
    }

    start(render) {
        console.log('Firing up engines');
        this.render = render;
        this.render();
        this.tick(true);
    }

    tick(force = false) {
        if (!this.tickId && !force) {
            return;
        }

        this.tickId = setTimeout(() => {
            if (this.render) {
                ticks += 1;
                this.render();
                this.tick();
            } else {
                this.stop('Missing render function');
            }
        }, 1000 / this.tps);
    }
}

export default Engine;
