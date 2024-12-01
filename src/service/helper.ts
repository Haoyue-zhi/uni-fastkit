type EventNames = 'API_UNAUTH' | 'API_INVALID'

class EventEmitter {
  public listeners: Record<EventNames, Set<() => void>> = {
    API_UNAUTH: new Set(),
    API_INVALID: new Set(),
  }

  on(eventName: EventNames, callback: () => void) {
    this.listeners[eventName].add(callback)
  }

  emit(eventName: EventNames, ...args: any[]) {
    this.listeners[eventName].forEach((handler: (...args: any[]) => void) => handler(...args))
  }
}

export default new EventEmitter()
