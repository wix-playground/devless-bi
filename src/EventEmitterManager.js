import _ from 'lodash';

export default class EventEmitterManager {
  constructor() {
    this.listeners = {};
  }

  listenOn(eventName, listener) {
    const id = _.uniqueId(eventName);
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = {};
    }
    this.listeners[eventName][id] = listener;
    return {
      remove: () => delete this.listeners[eventName][id]
    };
  }

  emitEvent(eventName, params = {}) {
    if (this.listeners[eventName]) {
      const listeners = Object.values(this.listeners[eventName]);
      (listeners).forEach(listener => listener(params));
    }
  }
}