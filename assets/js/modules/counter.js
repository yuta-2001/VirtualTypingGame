export class Counter {
    constructor(element, startValue, callback) {
        this.element = element;
        this.count = startValue;
        this.callback = callback;
    }

    start() {
        const timer = setInterval(() => {
            this.element.textContent = this.count;
            this.count--;
            if (this.count < 0) {
                clearInterval(timer);
                this.callback();
            }
        }, 1000);
    }
}