import { MENU_PRICE } from '../utils/constants.js';

const MENU_TYPES = Object.freeze({
  appetizer: ['양송이수프', '타파스', '시저샐러드'],
  main: ['티본스테이크', '바비큐립', '해산물파스타', '크리스마스파스타'],
  dessert: ['초코케이크', '아이스크림'],
  drink: ['제로콜라', '레드와인', '샴페인'],
});

const LIMIT_NUMBER = Object.freeze({
  minNumber: 1,
  maxNumber: 20,
});

class OrderMenu {
  #orderMenu;

  constructor(order) {
    this.#validateFormat(order); // 입력 형식 검증
    this.#arrayMenu(order); // 가격과 함께 배열 객체 저장
    this.#validateMenuItems(); // 메뉴 유무 검증
    this.#validateCount(); // 주문 개수 검증
    this.#validateTotalCount(); // 주문 총개수 검증
    this.#validateDuplicateMenu(); // 메뉴 중복 검증
    this.#validateOnlyDrink(); // 음료만 주문 검증
  }

  #arrayMenu(order) {
    const menuItem = order.split(',');
    this.#orderMenu = menuItem.map((item) => {
      const [menuName, count] = item.split('-');
      const price = MENU_PRICE[menuName] || 0;
      const type = Object.keys(MENU_TYPES).find((category) =>
        MENU_TYPES[category].includes(menuName),
      );
      return { menuName, count: Number(count), price, type };
    });
  }

  #validateFormat(order) {
    const regex = /^([가-힣]+-\d+,)*[가-힣]+-\d+$/;
    const testResult = regex.test(order);

    if (testResult === false) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateMenuItems() {
    const result = this.#orderMenu.some((item) => item.price === 0);

    if (result) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateCount() {
    this.#orderMenu.forEach((menu) => {
      if (menu.count < LIMIT_NUMBER.minNumber) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
    });
  }

  #validateTotalCount() {
    const totalCount = this.#orderMenu.reduce(
      (sum, item) => sum + item.count,
      0,
    );

    if (totalCount > LIMIT_NUMBER.maxNumber) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateDuplicateMenu() {
    const menuNameSet = new Set(this.#orderMenu.map((item) => item.menuName));

    if (menuNameSet.size !== this.#orderMenu.length) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateOnlyDrink() {
    const drinkMenu = MENU_TYPES.drink;
    const result = this.#orderMenu.every((item) =>
      drinkMenu.includes(item.menuName),
    );

    if (result) {
      throw new Error('[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.');
    }
  }

  totalOrderAmount() {
    const totalAmount = this.#orderMenu.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );

    return totalAmount;
  }

  // 디저트 메뉴 개수
  dessertCount() {
    const dessertMenu = this.#orderMenu.filter(
      (item) => item.type === 'dessert',
    );
    const count = dessertMenu.reduce((total, item) => total + item.count, 0);

    return count;
  }

  // 메인 메뉴 개수
  mainCount() {
    const mainMenu = this.#orderMenu.filter((item) => item.type === 'main');
    const count = mainMenu.reduce((total, item) => total + item.count, 0);

    return count;
  }
}

export default OrderMenu;
