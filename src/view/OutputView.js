import { print } from '../utils/missionUtils.js';
import {
  GIFT_THRESHOLD,
  BENEFITS_THRESHOLD,
  MENU_PRICE,
} from '../utils/constants.js';

const OutputView = {
  printWelcome() {
    print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printGuide(date) {
    print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`);
  },

  printMenu(order) {
    const dividedOrder = order.split(',');
    const orderArray = dividedOrder.map((value) => {
      const [menuName, count] = value.split('-');
      return [menuName, count];
    });

    print('\n<주문 메뉴>');
    orderArray.forEach((item) => {
      const [menuName, count] = item;
      print(`${menuName} ${count}개`);
    });
  },

  printTotalPriceAndGift(price) {
    const showPrice = price.toLocaleString();

    print('\n<할인 전 총주문 금액>');
    print(`${showPrice}원`);
    print('\n<증정 메뉴>');

    if (price >= GIFT_THRESHOLD) {
      print('샴페인 1개');
    } else {
      print('없음');
    }
  },

  printBenefits(price, benefitsArray, totalBenefitPrice) {
    print('\n<혜택 내역>');

    if (price < BENEFITS_THRESHOLD) {
      print('없음');
      return;
    }

    this.dateBenefits(benefitsArray);

    if (totalBenefitPrice === 0) {
      print('없음');
    }
  },

  dateBenefits(benefitsArray) {
    benefitsArray.forEach((dateBenefits) => {
      dateBenefits.forEach((giftBenefit) => {
        const [eventName, discount] = giftBenefit;
        const showDiscount = discount.toLocaleString();
        if (discount !== 0) {
          print(`${eventName}: -${showDiscount}원`);
        }
      });
    });
  },

  printTotalBenefitAmount(totalPrice, totalBenefitPrice) {
    const showTotalDiscount = totalBenefitPrice.toLocaleString();

    print('\n<총혜택 금액>');

    if (totalBenefitPrice === 0 || totalPrice < BENEFITS_THRESHOLD) {
      print('0원');
    }

    if (totalBenefitPrice !== 0 && totalPrice >= BENEFITS_THRESHOLD) {
      print(`-${showTotalDiscount}원`);
    }
  },

  printEstimatedAmount(payment) {
    const estimatedAmount = payment.toLocaleString();

    print('\n<할인 후 예상 결제 금액>');
    print(estimatedAmount);
  },

  printBadge(calculateBadge) {
    print('\n<12월 이벤트 배지>');

    if (calculateBadge === undefined) {
      print('없음');
      return;
    }
    print(calculateBadge);
  },
};

export default OutputView;
