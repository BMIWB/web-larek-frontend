import { Component } from "./base/Component";
import { ICard, ICardAction } from "../types";
import { ensureElement } from "../utils/utils";

export class Card extends Component<ICard> {
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _description?: HTMLElement;
  protected _button?: HTMLButtonElement;
  protected _category?: HTMLElement;
  protected _price: HTMLElement;
  protected _buttonModal?: HTMLButtonElement;

  private color: { [key: string]: string } = {
    'софт-скил': '_soft',
    'хард-скил': '_hard',
    'кнопка': '_button',
    'дополнительное': '_additional',
    'другое': '_other'
  };

  constructor(
    protected blockName: string,
    container: HTMLElement,
    action?: ICardAction
  ) {
    super(container);

    this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
    this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
    this._button = container.querySelector(`.${blockName}__button`);
    this._description = container.querySelector(`.${blockName}__description`);
    this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
    this._category = container.querySelector(`.${blockName}__category`);

    if (action?.onClick) {
      (this._button || container).addEventListener("click", action.onClick);
    }
  }

  // --- ID ---
  set id(value: string) {
    this.container.dataset.id = value;
  }

  get id(): string {
    return this.container.dataset.id || "";
  }

  // --- Title ---
  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || "";
  }

  // --- Image ---
  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  // --- Description ---
  set description(value: string | string[]) {
    if (!this._description) return;
    
    const updateDescription = (text: string) => {
      const descTemplate = this._description.cloneNode() as HTMLElement;
      this.setText(descTemplate, text);
      return descTemplate;
    };

    if (Array.isArray(value)) {
      this._description.replaceWith(...value.map(updateDescription));
    } else {
      this.setText(this._description, value);
    }
  }

  // --- Button Title ---
  set titleOfButton(value: string) {
    this.setText(this._button, value);
  }

  // --- Price ---
  set price(value: number | null) {
    if (value == null) {
      this.setText(this._price, 'Бесценно');
    } else {
      this.setText(this._price, `${value} синапсов`);
    }
    this.setDisabled(this._button, value === null);
  }

  // --- Category ---
  set category(value: string) {
    if (!this._category) return;

    this.setText(this._category, value);

    const baseClass = this._category.classList[0];
    this._category.className = '';
    this._category.classList.add(baseClass);

    const colorModifier = this.color[value];
    if (colorModifier) {
      this._category.classList.add(`${baseClass}${colorModifier}`);
    }
  }

  get category(): string {
    return this._category?.textContent || '';
  }
}
