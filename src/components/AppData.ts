import { Model } from "./base/model";
import { FormError, IAppData, IProduct, IOrder, IOrderFormEmailPhone, PaymentMethods } from "../types";
import { Product } from './Product';

/**
 * Класс для управления данными приложения
 */
export class AppData extends Model<IAppData> {
  catalog: IProduct[] = [];
  basket: IProduct[] = [];
  order: IOrder = this.createEmptyOrder();
  preview: string | null = null;
  formErrors: FormError = {};

  // =================== Создание и сброс ===================

  private createEmptyOrder(): IOrder {
    return {
      payment: "",
      email: "",
      phone: "",
      address: "",
    };
  }

  resetBasket(): void {
    this.basket = [];
    this.updateBasketState();
  }

  resetOrder(): void {
    this.order = this.createEmptyOrder();
  }

  // =================== Работа с каталогом ===================

  setCatalog(items: IProduct[]): void {
    this.catalog = items.map(item => new Product(item, this.events));
    this.emitChanges('items:changed', { catalog: this.catalog });
  }

  setProductPreview(item: Product): void {
    this.preview = item.id;
    this.emitChanges('preview:changed', item);
  }

  // =================== Работа с корзиной ===================

  getBasketProducts(): IProduct[] {
    return this.basket;
  }

  isProductInBasket(item: IProduct): boolean {
    return this.basket.some(product => product.id === item.id);
  }

  addProductToBasket(item: Product): void {
    if (!this.isProductInBasket(item)) {
      this.basket.push(item);
      this.updateBasketState();
    }
  }

  removeProductFromBasket(id: string): void {
    this.basket = this.basket.filter(product => product.id !== id);
    this.updateBasketState();
  }

  updateBasketState(): void {
    this.emitChanges('counter:changed', this.basket);
    this.emitChanges('basket:changed', this.basket);
  }

  // =================== Работа с заказом ===================
  setPaymentMethod(method: string): void {
    this.order.payment = method as PaymentMethods;
    this.validateOrder("delivery");
  }

  setOrderFieldDelivery(value: string): void {
    this.order.address = value;
    this.validateOrder("delivery");
  }

  setOrderFieldContact(field: keyof IOrderFormEmailPhone, value: string): void {
    this.order[field] = value;
    this.validateOrder("contact");
  }

  getTotal(): number {
    return this.basket.reduce((total, item) => total + item.price, 0);
  }

  getPurchaseIds(): string[] {
    return this.basket.map(item => item.id);
  }

  // =================== Валидация формы ===================

  validateOrder(type: "delivery" | "contact"): boolean {
    const errors: FormError = {};

    if (type === "delivery") {
      if (!this.order.payment) {
        errors.payment = "Необходимо указать способ оплаты";
      }
      if (!this.order.address) {
        errors.address = "Необходимо указать адрес";
      }
      this.events.emit("deliveryFormError:change", errors);
    }

    if (type === "contact") {
      if (!this.order.email) {
        errors.email = "Необходимо указать email";
      }
      if (!this.order.phone) {
        errors.phone = "Необходимо указать телефон";
      }
      this.events.emit("contactFormError:change", errors);
    }

    this.formErrors = errors;
    return Object.keys(errors).length === 0;
  }
}
