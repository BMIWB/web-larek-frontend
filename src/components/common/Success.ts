import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import {ISuccess, ISuccessActions} from "../../types/index";

export class Success extends Component<ISuccess> {
  protected _close: HTMLElement;
  protected _total: HTMLElement;

  render(data: ISuccess): HTMLElement {
    super.render(data);
    this.totalWrittenOff = data.total;
    return this.container;
  }

  set totalWrittenOff(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }

  constructor(container: HTMLElement, actions: ISuccessActions) {
    super(container);

    this._close = ensureElement<HTMLElement>('.order-success__close', this.container);
    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);

    if (actions?.onClick) {
      this._close.addEventListener('click', actions.onClick);
    }
  }
}

