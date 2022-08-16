const { is } = ateos;

export class Event {
  constructor(type, bubbles, cancelable, target) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
    this.target = target;
  }

  stopPropagation() {
  }

  preventDefault() {
    this.defaultPrevented = true;
  }
}

export class ProgressEvent extends Event {
  constructor(type, progressEventRaw, target) {
    super(type, false, false, target);
    this.loaded = ateos.isNumber(progressEventRaw.loaded) ? progressEventRaw.loaded : null;
    this.total = ateos.isNumber(progressEventRaw.total) ? progressEventRaw.total : null;
    this.lengthComputable = Boolean(progressEventRaw.total);
  }
}

export class CustomEvent extends Event {
  constructor(type, customData, target) {
    super(type, false, false, target);
    this.detail = customData.detail || null;
  }
}

export const EventTarget = {
  addEventListener(event, listener) {
    this.eventListeners = this.eventListeners || {};
    this.eventListeners[event] = this.eventListeners[event] || [];
    this.eventListeners[event].push(listener);
  },
  removeEventListener(event, listener) {
    const listeners = this.eventListeners && this.eventListeners[event] || [];
    const index = listeners.indexOf(listener);

    if (index === -1) {
      return;
    }

    listeners.splice(index, 1);
  },
  dispatchEvent(event) {
    const self = this;
    const type = event.type;
    const listeners = self.eventListeners && self.eventListeners[type] || [];

    listeners.forEach((listener) => {
      if (ateos.isFunction(listener)) {
        listener.call(self, event);
      } else {
        listener.handleEvent(event);
      }
    });

    return Boolean(event.defaultPrevented);
  }
};
