# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта

Приложение построено по архитектурному паттерну MVP (Model-View-Presenter) и включает каталог товаров и корзину:

Model — управляет данными и взаимодействует с API.
View — отображает данные и обрабатывает взаимодействие с пользователем.
Presenter — посредник между Model и View, обрабатывает бизнес-логику приложения.

View инициирует события, которые перехватывает Presenter.
Presenter взаимодействует с Model для получения или изменения данных и обновляет View в соответствии с изменениями.

### Слой Model

AppData - отвечает за работу с данными. Тип связи: ассоциация с классами Api, EventEmitter.
Поля:
(+) cart: ICartItem[]
(+) products: IProductInfo[]
(+) selectedProduct: IProductInfo | null

Методы:
(+) constructor(api: Api, events: EventEmitter)
(+) getProducts(): IProductInfo[]
(+) addToCart(item: ICartItem): void
(+) removeFromCart(id: string): void
(+) getCart(): ICartItem[]
(+) selectPaymentMethod(method: string)
(+) getSelectedProduct(): IProductInfo | null
(+) clearCart(): void

IProductInfo - необходим для описания товаров. Тип связи: ассоциация с классами AppData, ProductCard.
Поля:
(#) id: string
(+) title: string
(+) description: string
(+) price: number | null
(+) category: string
(+) image: string

ICartItem - необходим для отображения элементов в корзине. Тип связи: композиция с классом CartView.
Поля:
(#) id: string
(+) title: string
(+) price: number | null
(+) quantity: number

IOrderDetails - необходим для отображения заказа. Тип связи: ассоциация с классами AppData, CheckoutForm.
Поля:
(#) id: string
(-) items: ICartItem[]
(+) total: number | null
(+) paymentMethod: 'Онлайн' | 'При получении'
(+) deliveryAddress: string


### Слой View
1. Класс Component (абстрактный) - необходим для отображения базовых элементов и их создание для пользовательского интерфейса. Тип связи: ассоциация с DOM-элементами.
Поля:
- (-) element: HTMLElement  

Методы:
- (+) constructor(element: HTMLElement)  
- (+) toggleClass(className: string): void  
- (+) setText(text: string): void  
- (+) setImage(src: string): void  
- (+) setDisabled(isDisabled: boolean): void  
- (+) setHidden(isHidden: boolean): void  
- (+) setVisible(isVisible: boolean): void  
- (+) render(): void  

2. Класс View (базовый) - расширение класса Component полем events. Тип связи: наследование от IComponent, ассоциация с EventEmitter.
Поля и методы наследуются от класса Component. В отличие от родителя можно создать его экзепляр (в абстрактных классах нельзя создать его экземпляр)

3. Класс Modal - отвечает за работы с модальными окнами. Тип связи: композиция с классами Product, Basket, OrderForm.
Поля: 
- (-) title: string  
- (-) content: HTMLElement | string  

Методы:
- (+) constructor(title: string, content: HTMLElement | string)  
- (+) open(): void  
- (+) close(): void  
- (+) render(): void  

4. Класс Card - необходим для отображения карточек. Тип связи: композиция с DOM-элементами, ассоциация с Gallery и Backet.
Поля:
- (#) id: string  
- (+) title: string  
- (+) price: number | null
- (+) category: string  
- (+) image: string  
- (+) template: HTMLTemplateElement  
- (-) addToCartButton: HTMLButtonElement 

Методы:
- (+) constructor(template: HTMLTemplateElement, data: Product, onClick: (product: Product) => void)  
- (+) render(): HTMLElement  
- (+) setDeleteButtonHandler(handler: () => void): void  

5. Класс Gallery - отвечает за галлерею картинок на главном экране. Тип связи: агрегация с классами Card, ассоциация с AppData.
Поля:
- (-) products: Product[]  

Методы:
- (+) constructor(products: Product[])  
- (+) render(): void  
- (+) onProductClick(product: Product): void  

6. Класс Basket - отвечает за отображение корзины. Тип связи: композиция с классами BasketItem, ассоциация с AppData.
Поля:
- (-) items: BasketItem[]  
- (-) total: number  
- (-) checkoutButton: HTMLElement  

Методы:
- (+) constructor(items: BasketItem[], checkoutButton: HTMLElement)  
- (+) addItem(item: BasketItem): void  
- (+) removeItem(itemId: string): void  
- (+) calculateTotal(): number  
- (+) render(): void  
- (+) setCheckoutHandler(handler: () => void): void  

7. Класс OrderForm - отображает форму заказа. Тип связи: ассоциация с Order.
Поля:
- (-) paymentMethod: 'Онлайн' | 'При получении' 
- (-) deliveryAddress: string  
- (-) nextButton: HTMLButtonElement

Методы:
- (+) constructor()  
- (+) render(): void  
- (+) validate(): boolean  
- (+) submit(): void  
- (+) setNextHandler(handler: () => void): void

8. Класс ContactsForm - необходим для формы заполнения контактных данных. Тип связи: композиция с Modal,ассоциация с EventEmitter.
Поля:
- (-) emailInput: HTMLInputElement
- (-) phoneInput: HTMLInputElement
- (-) submitButton: HTMLButtonElement
- (-) formElement: HTMLFormElement

Методы:
- (+) constructor(template: HTMLTemplateElement)
- (+) render(): HTMLElement
- (+) validate(): boolean
- (+) getFormData(): { email: string; phone: string }
- (+) onSubmit(handler: (data: { email: string; phone: string }) => void): void

9. Класс OrderSuccess. Тип связи: ассоциация с Order.
Поля:
- (-) total: number  

Методы:
- (+) constructor(total: number)  
- (+) render(): void 

10. Класс Header - отображает элементы шапки. Тип связи: композиция с DOM-элементами.
Поля:
- (-) logo: HTMLElement  
- (-) basketIcon: HTMLElement  
- (-) basketCounter: HTMLElement  

Методы:
- (+) constructor(logo: HTMLElement, basketIcon: HTMLElement, basketCounter: HTMLElement)  
- (+) render(): void  
- (+) updateBasketCounter(count: number): void  

### Слой Presenter
1. Класс EventEmitter - отвечайт за события. Тип связи: ассоциация с классами AppData, View.
Поля: 
- (-) _events: Map 

Методы:
- (+) constructor()  
- (+) on: void  
- (+) off: void  
- (+) emit: void  
- (+) onAll: void  
- (+) offAll(): void  
- (+) trigger: (data: T) => void  

2. Класс Api - отвечает за общую часть, связанную с API. Тип связи: ассоциация с AppData.
Поля:
- (+) baseUrl: string  
- (-) options: RequestInit  

Методы:
- (+) constructor(baseUrl: string, options?: RequestInit)  
- (-) handleResponse(response: Response): Promise 
- (+) get(uri: string): Promise 
- (+) post(uri: string, data: object, method: string): Promise


3. Класс AppPresenter - отвечает за визуал. Тип связи: ассоциация с AppData, EventEmitter, View.
plaintext
Поля:
- (-) appData: AppData  
- (-) eventEmitter: EventEmitter  

Методы:
- (+) constructor(appData: AppData, eventEmitter: EventEmitter)  
- (+) initialize(): void  
- (+) handleCardClick(product: Product): void  
- (+) handleBasketUpdate(): void  
