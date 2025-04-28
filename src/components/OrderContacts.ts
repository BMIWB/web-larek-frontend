import { Form } from "./common/Form";
import { IOrderFormEmailPhone } from "../types";
import { IEvents } from "../types/index";

export class OrderContacts extends Form<IOrderFormEmailPhone> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set phone(value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  }

  set email(value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  }
}