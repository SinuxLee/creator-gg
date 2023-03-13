import Singleton from '../tsx/Singleton'

class Event {
    public handler!: Function;
    public target: object | null;

    constructor(handler: Function, target: object | null) {
        this.handler = handler;
        this.target = target;
    }
}

export class Emitter extends Singleton {
    private events: Map<string, Event[]> = new Map();
    private targetEvents: Map<object, Set<string>> = new Map();

    constructor() {
        super()
    }

    public on(name: string, handler: Function, target: object | null = null) {
        let events = this.events.get(name);
        if (events == null) {
            events = []
            this.events.set(name, events);
        }

        if (events.find(event => event.target === target && event.handler === handler)) {
            console.warn(`already exist: ${name}, ${handler}, ${target} `);
            return
        }

        const event = new Event(handler, target);
        events.push(event);

        // 箭头函数不用记录 target
        if (handler.prototype === undefined || target == null) return

        let names = this.targetEvents.get(target)
        if (names == null) {
            names = new Set<string>()
            this.targetEvents.set(target, names)
        }

        names.add(name);
    }

    public off(name: string, handler: Function, target: object) {
        const events = this.events.get(name);
        if (events == null) return

        const idx = events.findIndex(event => event.target === target && event.handler === handler)
        if (idx != -1) events.splice(idx, 1);
    }

    public emit(name: string, ...args: any) {
        const events = this.events.get(name);
        if (events == null) return

        events.forEach(event => {
            if (event.handler.prototype === undefined || event.target == null) event.handler(args);
            else event.handler.apply(event.target, args);
        })
    }

    public targetOff(target: object) {
        const names = this.targetEvents.get(target);
        if (names == null) return

        names.forEach(name => {
            let events = this.events.get(name);
            if (events == null) return;

            events.map((val, idx) => { if (val.target == target) events?.splice(idx, 1) })
        });

        names.clear();
    }
}
