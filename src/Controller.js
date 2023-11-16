import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Service from './Service.js';
import { print } from './utils/missionUtils.js';

class Controller {
  constructor() {
    this.service = new Service();
  }

  async run() {
    await this.inputControl();

    const totalPrice = this.service.totalOrderPrice();
    const BenefitDetails = this.service.BenefitsDetails();
    const totalBenefitPrice = this.service.totalBenefitsPrice();
    const badge = this.service.calculateBadge();

    OutputView.printTotalPriceAndGift(totalPrice);
    OutputView.printBenefits(totalPrice, BenefitDetails, totalBenefitPrice);
    OutputView.printTotalBenefitAmount(totalPrice, totalBenefitPrice);
    OutputView.printEstimatedAmount(this.service.calculatePayment());
    OutputView.printBadge(badge);
  }

  async inputControl() {
    OutputView.printWelcome();
    const date = await this.#inputDate();
    const order = await this.#inputOrder();
    OutputView.printGuide(date);
    OutputView.printMenu(order);
  }

  async #inputDate() {
    let date;

    while (!date) {
      try {
        const getDate = await InputView.readDate();
        date = this.service.benefitsCreate(getDate);
      } catch (error) {
        print(error.message);
      }
    }

    return date;
  }

  async #inputOrder() {
    let order;

    while (!order) {
      try {
        const getOrder = await InputView.readMenu();
        order = this.service.orderMenuCreate(getOrder);
      } catch (error) {
        print(error.message);
      }
    }

    return order;
  }
}

export default Controller;
