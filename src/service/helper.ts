const eventNames = [
  'API_SUCCESS',
  'API_ERROR',
  'API_REQUEST',
  'ROUTER_BEFORE',
  'ROUTER_AFTER',
  'APP_INIT',
  'APP_LOGOUT',
] as const

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
}

export default new EventEmitter()
