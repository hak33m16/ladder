export class EventManager {
    constructor() {
        // Map of type => array of subscribers/handlers
        this.subscribtionMap = new Map();
    }

    emit(eventObj) {
        const subscribers = this.subscribtionMap.get(eventObj.constructor.name);

        if (subscribers != undefined) {
            subscribers.forEach((handler) => {
                handler(eventObj);
            });
        }
    }

    /**
     * Takes in an event type and a handler function callback that should
     * be able to accept that type
     *
     * @param {*} eventType Type of event (e.g. Class.name)
     * @param {*} handler Callback that will be called like so: `handler(eventObj)`
     *                    where eventObj is an instance of eventType
     */
    subscribe(eventType, handler) {
        // TODO: Consider checking if handler is bound when it's passed in.
        // It's almost guaranteed that users will want the context their function
        // is operating on to be the class they passed the handler from
        // https://stackoverflow.com/questions/35686850/determine-if-a-javascript-function-is-a-bound-function

        if (!this.subscribtionMap.has(eventType.name)) {
            this.subscribtionMap.set(eventType.name, [handler]);
        } else {
            this.subscribtionMap.get(eventType.name).push(handler);
        }
    }
}
