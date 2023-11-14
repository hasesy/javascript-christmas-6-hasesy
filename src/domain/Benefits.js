const DATE = Object.freeze({
  eventEndDay: 31,
  christmasEndDay: 25,
});

const WEEKDAY = Object.freeze([
  3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28, 31,
]);

const WEEKEND = Object.freeze([1, 2, 8, 9, 15, 16, 22, 23, 29, 30]);

const SPECIAL = Object.freeze([3, 10, 17, 24, 25, 31]);

class Benefits {
  #date;

  constructor(date) {
    this.#validateNumber(date); // 1 이상 자연수 검증
    this.#date = Number(date);
    this.#validateDate(); // 날짜 범위 검증
  }

  #validateNumber(date) {
    const regex = /^[1-9]\d*$/;
    const testResult = regex.test(date);

    if (testResult === false) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  #validateDate() {
    if (this.#date > DATE.eventEndDay) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  // 크리스마스 디데이 할인
  christmasDiscount() {
    const START_PRICE = 1000;
    const INCREASE_PRICE = 100;
    let discountedAmount = 0;

    if (this.#date <= DATE.christmasEndDay) {
      discountedAmount = START_PRICE + (this.#date - 1) * INCREASE_PRICE;
    }

    return ['크리스마스 디데이 할인', discountedAmount];
  }

  // 평일 할인
  weekdayDiscount(dessertCount) {
    const WEEKDAY_DISCOUNT = 2023;
    let discountedAmount = 0;

    if (WEEKDAY.includes(this.#date)) {
      discountedAmount = WEEKDAY_DISCOUNT * dessertCount;
    }

    return ['평일 할인', discountedAmount];
  }

  // 주말 할인
  weekendDiscount(mainCount) {
    const WEEKEND_DISCOUNT = 2023;
    let discountedAmount = 0;

    if (WEEKEND.includes(this.#date)) {
      discountedAmount = WEEKEND_DISCOUNT * mainCount;
    }

    return ['주말 할인', discountedAmount];
  }

  // 특별 할인
  specialDiscount() {
    const DISCOUNT_PRICE = 1000;
    let discountedAmount = 0;

    if (SPECIAL.includes(this.#date)) {
      discountedAmount = DISCOUNT_PRICE;
    }

    return ['특별 할인', discountedAmount];
  }
}

export default Benefits;
