import { Form } from "./common/Form";
import { IOrderFormDelivery } from "../types";
import { IEvents } from "../types/index";

export class OrderAddress extends Form<IOrderFormDelivery> {
  protected _payment: HTMLDivElement;
  protected _button: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this._payment = this.container.querySelector<HTMLDivElement>('.order__buttons')!;
    this._button = [...this._payment.querySelectorAll<HTMLButtonElement>('.button_alt')];

    this._payment.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      this.updatePaymentMethod(target.name)
      events.emit(`order.payment:change`, { target: target.name })
    })
  }

  updatePaymentMethod(selectedMethod: string): void {
    this._button.forEach((btn) => {
      const isActive = btn.name === selectedMethod;
      this.toggleClass(btn, 'button_alt-active', isActive);
    });
  }

  set address(value: string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }

}