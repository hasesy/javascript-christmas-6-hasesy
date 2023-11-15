import Benefits from './domain/Benefits.js';
import OrderMenu from './domain/OrderMenu.js';
import {
  BENEFITS_THRESHOLD,
  GIFT_THRESHOLD,
  MENU_PRICE,
} from './utils/constants.js';

const BADGE = {
  산타: 20000,
  트리: 10000,
  별: 5000,
};

class Service {
  #benefits;

  #orderMenu;

  benefitsCreate(date) {
    this.#benefits = new Benefits(date);
    return date;
  }

  orderMenuCreate(order) {
    this.#orderMenu = new OrderMenu(order);
    return order;
  }

  totalOrderPrice() {
    const price = this.#orderMenu.totalOrderAmount();
    return price;
  }

  // 혜택 내역
  BenefitsDetails() {
    const dessertCount = this.#orderMenu.dessertCount();
    const mainCount = this.#orderMenu.mainCount();
    const benefitsArray = [
      [
        this.#benefits.christmasDiscount(),
        this.#benefits.weekdayDiscount(dessertCount),
        this.#benefits.weekendDiscount(mainCount),
        this.#benefits.specialDiscount(),
      ],
      [this.#giftEvent()],
    ];

    return benefitsArray;
  }

  // 증정 이벤트
  #giftEvent() {
    let giftDiscount = 0;

    if (this.totalOrderPrice() >= GIFT_THRESHOLD) {
      giftDiscount += MENU_PRICE.샴페인;
    }
    return ['증정 이벤트', giftDiscount];
  }

  // 총 혜택금액
  totalBenefitsPrice() {
    const BenefitsDetails = this.BenefitsDetails();

    const totalBenefitsPrice = BenefitsDetails.reduce(
      (acc, innerArray) =>
        acc +
        innerArray.reduce(
          (total, [, discountAmount]) => total + discountAmount,
          0,
        ),
      0,
    );

    return totalBenefitsPrice;
  }

  // 예상 결제 금액
  calculatePayment() {
    const totalPrice = this.totalOrderPrice();
    const totalBenefitPrice = this.totalBenefitsPrice();

    if (totalPrice < BENEFITS_THRESHOLD) {
      return totalPrice;
    }

    return this.calculateEstimatedAmount(totalPrice, totalBenefitPrice);
  }

  calculateEstimatedAmount(totalPrice, totalBenefitPrice) {
    if (totalPrice >= GIFT_THRESHOLD) {
      const benefitPrice = totalBenefitPrice - MENU_PRICE.샴페인;
      const payment = totalPrice - benefitPrice;
      return payment;
    }

    const payment = totalPrice - totalBenefitPrice;
    return payment;
  }

  calculateBadge() {
    const totalBenefitPrice = this.totalBenefitsPrice();

    const badge = Object.keys(BADGE).find(
      (key) => totalBenefitPrice >= BADGE[key],
    );

    return badge;
  }
}

export default Service;
