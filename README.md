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
(+) cart: ICartItem[] // Массив товаров, добавленных пользователем в корзину
(+) products: IProductInfo[] // Список всех доступных товаров
(+) selectedProduct: IProductInfo | null // Текущий выбранный товар, например, для просмотра в модальном окне

Методы:
(+) constructor(api: Api, events: EventEmitter) // Конструктор принимает API для получения данных и EventEmitter для управления событиями
(+) getProducts(): IProductInfo[] // Получает список всех товаров
(+) addToCart(item: ICartItem): void // Добавляет товар в корзину
(+) removeFromCart(id: string): void // Удаляет товар из корзины по его идентификатору
(+) getCart(): ICartItem[] // Возвращает список товаров в корзине
(+) selectPaymentMethod(method: string) // Выбирает способ оплаты 
(+) getSelectedProduct(): IProductInfo | null // Получает выбранный товар
(+) clearCart(): void // Очищает корзину после оформления заказа

IProductInfo - необходим для описания товаров. Тип связи: ассоциация с классами AppData, ProductCard.
Поля:
(#) id: string // Уникальный идентификатор товара
(+) title: string // Название товара
(+) description: string // Описание товара
(+) price: number | null // Цена товара (null, если цена временно недоступна)
(+) category: string // Категория, к которой принадлежит товар
(+) image: string   // Ссылка на изображение товара

ICartItem - необходим для отображения элементов в корзине. Тип связи: композиция с классом CartView.
Поля:
(#) id: string // Уникальный идентификатор товара в корзине
(+) title: string // Название товара
(+) price: number | null   // Цена товара (null, если цена пустая)
(+) quantity: number // Количество единиц товара в корзине

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
- (-) element: HTMLElement // HTML-элемент, которым управляет компонент

Методы:
- (+) constructor(element: HTMLElement) // Конструктор принимает элемент, с которым будет работать компонент
- (+) toggleClass(className: string): void // Переключает класс у элемента
- (+) setText(text: string): void // Устанавливает текстовое содержимое элемента
- (+) setImage(src: string): void // Устанавливает изображение в элемент (например, для <img>)
- (+) setDisabled(isDisabled: boolean): void // Отключает или включает элемент
- (+) setHidden(isHidden: boolean): void // Скрывает элемент
- (+) setVisible(isVisible: boolean): void // Делает элемент видимым
- (+) render(): void // Рендерит компонент

2. Класс View (базовый) - расширение класса Component полем events. Тип связи: наследование от IComponent, ассоциация с EventEmitter.
Поля и методы наследуются от класса Component. В отличие от родителя можно создать его экзепляр (в абстрактных классах нельзя создать его экземпляр)

3. Класс Modal - отвечает за работы с модальными окнами. Тип связи: композиция с классами Product, Cart, OrderForm.
Поля: 
- (-) title: string  
- (-) content: HTMLElement | string  

Методы:
- (+) constructor(title: string, content: HTMLElement | string)  
- (+) open(): void  
- (+) close(): void  
- (+) render(): void  

4. Класс IProductCard - необходим для отображения карточек. Тип связи: композиция с DOM-элементами, ассоциация с Gallery и Backet.
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
- (+) setAddToCartHandler(handler: () => void): void 

5. Класс Gallery - отвечает за галлерею картинок на главном экране. Тип связи: агрегация с классами Card, ассоциация с AppData.
Поля:
- (-) products: Product[]  

Методы:
- (+) constructor(products: Product[])  
- (+) render(): void  
- (+) onProductClick(product: IProductInfo): void 

6. Класс Cart - отвечает за отображение корзины. Тип связи: композиция с классами CartItem, ассоциация с AppData.
Поля:
- (-) items: CartItem[]  
- (-) total: number  
- (-) checkoutButton: HTMLElement  

Методы:
- (+) constructor(items: CartItem[], checkoutButton: HTMLElement)  
- (+) addItem(item: CartItem): void  
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
- (-) CartIcon: HTMLElement  
- (-) CartCounter: HTMLElement  

Методы:
- (+) constructor(logo: HTMLElement, CartIcon: HTMLElement, CartCounter: HTMLElement)  
- (+) render(): void  
- (+) updateCartCounter(count: number): void  

### Слой Presenter
1. Класс EventEmitter - отвечайт за события. Тип связи: ассоциация с классами AppData, View.
Поля: 
- (-) _events: Map // Коллекция зарегистрированных событий и обработчиков

Методы:
- (+) constructor()  
- (+) on: void // Добавляет обработчик события
- (+) off: void // Удаляет обработчик события 
- (+) emit: void // Вызывает все обработчики события с переданными данными
- (+) onAll: void // Подписывает обработчик на все события
- (+) offAll(): void // Отписывает обработчик от всех событий 
- (+) trigger: (data: T) => void  

2. Класс Api - отвечает за общую часть, связанную с API. Тип связи: ассоциация с AppData.
Поля:
- (+) baseUrl: string // Базовый URL API 
- (-) options: RequestInit // Настройки запросов (например, заголовки)

Методы:
- (+) constructor(baseUrl: string, options?: RequestInit) // Конструктор принимает URL и опциональные настройки
- (-) handleResponse(response: Response): Promise // Обрабатывает HTTP-ответ
- (+) get(uri: string): Promise // Выполняет GET-запрос
- (+) post(uri: string, data: object, method: string): Promise // Выполняет POST-запрос
