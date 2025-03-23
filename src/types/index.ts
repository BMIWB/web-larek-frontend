export interface IProductInfo {
  id: string; 
  title: string;
  description: string;
  price: number | null;
  category: string;
  image: string;
};

export interface ICart {
  items: ICartItem[];
  total: number;
}

export type ICartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

export interface IOrderDetails {
  id: string;
  total: number;
  paymentMethod: 'Онлайн' | 'При получении';
  deliveryAddress: string;
};

export interface IProductCard {
  id: string;
  title: string;
  price: number | null;
  category: string;
  image: string;
  template: HTMLTemplateElement;
  addToCartButton: HTMLButtonElement;
  render(): HTMLElement;
  setAddToCartHandler(handler: () => void): void;
};

export interface AppData {
  cart: ICartItem[];
  products: IProductInfo[];
  selectedProduct: IProductInfo;
};

export interface IModalWindow {
  title: string; 
  content: HTMLElement | string;
  open(): void;
  close(): void;
  render(): void;
}

export interface IBaseComponent {
  element: HTMLElement; 
  render(): void;
};

export interface IProductGallery {
  products: IProductInfo[];
  render(): void;
  onProductClick(product: IProductInfo): void;
};

export interface ICheckoutForm {
  paymentMethod: string;
  deliveryAddress: string;
  render(): void;
  validate(): boolean;
  submit(): void;
  setNextHandler(handler: () => void): void;
};

export interface IOrderConfirmation {
  total: number;
  render(): void;
};

export interface INavigationHeader {
  logo: HTMLElement; 
  сartIcon: HTMLElement;
  cartCounter: HTMLElement;
  render(): void;
  updateCartCounter(count: number): void;
};

export interface IUserContactData {
  email: string;
  phone: string;
}

export interface IContactForm {
  emailInput: HTMLInputElement;
  phoneInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
  formElement: HTMLFormElement;
  render(): HTMLElement;
  validate(): boolean;
  getFormData(): IUserContactData;
  onSubmit(handler: (data: IUserContactData) => void): void;
}
