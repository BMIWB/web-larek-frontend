import { IEvents } from "../../types/index";

/**
 * Проверяет, является ли объект экземпляром Model
 */
export const isModel = (obj: unknown): obj is Model<any> => {
  return obj instanceof Model;
};

/**
 * Базовый класс модели
 */
export abstract class Model<T> {
  constructor(
    data: Partial<T>,
    protected readonly events: IEvents
  ) {
    Object.assign(this, data);
  }

  /**
   * Генерирует событие об изменении модели
   */
  protected emitChanges(event: string, payload?: object): void {
    this.events.emit(event, payload ?? {});
  }
}
