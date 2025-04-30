import { Product } from '../components/Product';

// =================== Типы ===================

export type FormError = Partial<Record<keyof IOrder, string>>;
export type PaymentMethods = 'card' | 'cash' | '';
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type EventName = string | RegExp;
export type Subscriber = Function;
export type CatalogChangeEvent = { catalog: Product[] };

// =================== Общие интерфейсы ===================

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBasketItem {
  title: string;
  price: number;
}

export interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
  button: string;
}

export interface IAppData {
  catalog: IProduct[];
  order: IOrder | null;
  basket: IProduct[] | null;
  preview: string | null;
  loading: boolean;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface IBasketView {
  items: HTMLElement[];
  total: number;
  selected: string[];
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IModalData {
  content: HTMLElement;
}

// =================== Заказ ===================

export interface IOrderFormEmailPhone {
  email: string;
  phone: string;
}

export interface IOrderFormDelivery {
  payment: PaymentMethods;
  address: string;
}

export interface IOrderFormError extends IOrderFormEmailPhone, IOrderFormDelivery { }

export interface IOrder extends IOrderFormError {
  payment: PaymentMethods;
}

export interface IOrderSuccess {
  id: string;
  total: number;
}

// =================== События ===================

export interface EmitterEvent {
  eventName: string;
  data: unknown;
}

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

// =================== Карточки и действия ===================

export interface ICardAction {
  onClick: (event: MouseEvent) => void;
}

// =================== Окно успеха ===================

export interface ISuccess {
  total: number;
}

export interface ISuccessActions {
  onClick: () => void;
}

// =================== API ===================

export interface ILarekAPI {
  getProductList: () => Promise<IProduct[]>;
  getProductItem: (id: string) => Promise<IProduct>;
  orderProducts: (order: IOrder) => Promise<IOrderSuccess>;
}
