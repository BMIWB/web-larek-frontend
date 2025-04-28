import { EventName, Subscriber, EmitterEvent, IEvents } from '../../types/index';

/**
 * Класс-эмиттер событий
 */
export class EventEmitter implements IEvents {
  private _events: Map<EventName, Set<Subscriber>>;

  constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
  }

  /**
   * Подписка на событие
   */
  on<T extends object>(eventName: EventName, callback: (event: T) => void): void {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<Subscriber>());
    }
    this._events.get(eventName)?.add(callback);
  }

  /**
   * Отписка от события
   */
  off(eventName: EventName, callback: Subscriber): void {
    const subscribers = this._events.get(eventName);
    if (subscribers) {
      subscribers.delete(callback);
      if (subscribers.size === 0) {
        this._events.delete(eventName);
      }
    }
  }

  /**
   * Генерация события
   */
  emit<T extends object>(eventName: string, data?: T): void {
    this._events.forEach((subscribers, name) => {
      if (name === '*') {
        subscribers.forEach(callback => callback({ eventName, data }));
      }
      if ((name instanceof RegExp && name.test(eventName)) || name === eventName) {
        subscribers.forEach(callback => callback(data));
      }
    });
  }

  /**
   * Подписка на все события
   */
  onAll(callback: (event: EmitterEvent) => void): void {
    this.on("*", callback);
  }

  /**
   * Удаление всех подписок
   */
  offAll(): void {
    this._events = new Map<EventName, Set<Subscriber>>();
  }

  /**
   * Генератор обработчика событий
   */
  trigger<T extends object>(eventName: string, context?: Partial<T>) {
    return (event: object = {}) => {
      this.emit(eventName, {
        ...(event || {}),
        ...(context || {})
      });
    };
  }
}
