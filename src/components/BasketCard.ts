import { Component } from "./base/Component";
import { IBasketItem, ICardAction } from "../types";
import { ensureElement } from "../utils/utils";

// Теперь поработаем над корзиной
export class BasketCard extends Component<IBasketItem> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton: HTMLButtonElement;
	constructor(container: HTMLElement, index: number, action?: ICardAction) {
		super(container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this.setText(this._index, index + 1);

		// Задаём остальные элементы
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._deleteButton = ensureElement<HTMLButtonElement>(`.basket__item-delete`, container);

		if (action?.onClick && this._deleteButton) {
			this._deleteButton.addEventListener('click', (action.onClick));
		}
	}

	set index(value: number) {
		this.setText(this._index, value)
	}

	set title(value: string) {
		this.setText(this._title, value)
	}

	set price(value: number) {
		this.setText(this._price, value);
	}
}