const eventNames = ['API_ERROR'] as const

type EventName = (typeof eventNames)[number]

type EventCallback = (...args: any[]) => void

class EventEmitter {
  private listeners: Record<EventName, Set<EventCallback>>

  constructor() {
    this.listeners = Object.fromEntries(
      eventNames.map((eventName) => [eventName, new Set<EventCallback>()]),
    ) as Record<EventName, Set<EventCallback>>
  }
  on(eventName: EventName, callback: EventCallback) {
    if (!this.listeners[eventName]) {
      throw new Error(`Event "${eventName}" is not supported.`)
    }
    this.listeners[eventName].add(callback)
  }

  emit(eventName: EventName, ...args: any[]) {
    if (!this.listeners[eventName]) {
      throw new Error(`Event "${eventName}" is not supported.`)
    }
    this.listeners[eventName].forEach((handler) => handler(...args))
  }

  off(eventName: EventName, callback: EventCallback) {
    this.listeners[eventName]?.delete(callback)
  }

  once(eventName: EventName, callback: EventCallback) {
    const handler = (...arg: any[]) => {
      callback(...arg)
      this.off(eventName, handler)
    }
    this.on(eventName, handler)
  }
}

export default new EventEmitter()
