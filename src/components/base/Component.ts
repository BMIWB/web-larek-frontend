export abstract class Component<T> {
  protected constructor(protected readonly container: HTMLElement) { }
  /**
   * Переключить класс на элементе
   */
  protected toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  /**
   * Установить текстовое содержимое элемента
   */
  protected setText(element: HTMLElement, value: unknown) {
    if (element) {
      element.textContent = String(value);
    }
  }

  /**
   * Установить или снять атрибут disabled
   */
  protected setDisabled(element: HTMLElement, state: boolean) {
    if (element) {
      if (state) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }
    }
  }

  /**
   * Скрыть элемент
   */
  protected setHidden(element: HTMLElement) {
    element.style.display = 'none';
  }

  /**
   * Показать элемент
   */
  protected setVisible(element: HTMLElement) {
    element.style.removeProperty('display');
  }

  /**
   * Установить изображение и альтернативный текст
   */
  protected setImage(element: HTMLImageElement, src: string, alt?: string) {
    if (element) {
      element.src = src;
      if (alt) {
        element.alt = alt;
      }
    }
  }

  /**
   * Отобразить компонент и применить переданные данные
   */
  render(data?: Partial<T>): HTMLElement {
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}
