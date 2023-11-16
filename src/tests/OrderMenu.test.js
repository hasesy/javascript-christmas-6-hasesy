import OrderMenu from '../domain/OrderMenu.js';

describe('주문 메뉴 검증 테스트', () => {
  const orderMenuTestCase = [
    {
      testName: '주문 형식이 예시와 다르면 예외가 발생한다.',
      input: '양송이수프 1개, 초코케이크 2개',
    },
    {
      testName: '메뉴판에 없는 메뉴가 있으면 예외가 발생한다.',
      input: '티본스테이크-1,마라탕-1',
    },
    {
      testName: '주문 수량이 1 미만이면 예외가 발생한다.',
      input: '해산물파스타-0,제로콜라-1',
    },
    {
      testName: '주문 수량의 총합이 20이 넘으면 예외가 발생한다.',
      input: '시저샐러드-14,바비큐립-5,타파스-2',
    },
    {
      testName: '중복된 메뉴가 있으면 예외가 발생한다.',
      input: '바비큐립-2,레드와인-1,바비큐립-1',
    },
  ];

  orderMenuTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      expect(() => {
        new OrderMenu(testCase.input);
      }).toThrow('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    });
  });

  test('음료만 주문하면 예외가 발생한다.', () => {
    expect(() => {
      new OrderMenu('제로콜라-5,레드와인-2,샴페인-3');
    }).toThrow('[ERROR] 음료만 주문할 수 없습니다. 다시 입력해 주세요.');
  });
});

describe('상태값 활용 테스트', () => {
  test('수량과 가격을 곱해서 총 주문금액을 계산한다.', () => {
    const orderMenuTestCase = [
      {
        input: '해산물파스타-3,양송이수프-1,타파스-2,제로콜라-4',
        result: 134000,
      },
      {
        input: '바비큐립-5,시저샐러드-3,레드와인-2,아이스크림-5',
        result: 439000,
      },
      {
        input:
          '티본스테이크-2,해산물파스타-1,크리스마스파스타-10,초코케이크-3,샴페인-4',
        result: 540000,
      },
    ];

    orderMenuTestCase.forEach((testCase) => {
      // given
      const orderMenu = new OrderMenu(testCase.input);

      // when
      const received = orderMenu.totalOrderAmount();

      // then
      expect(received).toBe(testCase.result);
    });
  });

  test('디저트 메뉴의 주문 개수를 계산한다.', () => {
    const orderMenuTestCase = [
      { input: '바비큐립-1,초코케이크-9,제로콜라-2,아이스크림-3', result: 12 },
      { input: '크리스마스파스타-3,티본스테이크-5,레드와인-1', result: 0 },
      {
        input: '양송이수프-2,시저샐러드-5,해산물파스타-3,초코케이크-1',
        result: 1,
      },
    ];

    orderMenuTestCase.forEach((testCase) => {
      // given
      const orderMenu = new OrderMenu(testCase.input);

      // when
      const received = orderMenu.dessertCount();

      // then
      expect(received).toBe(testCase.result);
    });
  });

  test('메인 메뉴의 주문 개수를 계산한다.', () => {
    const orderMenuTestCase = [
      {
        input: '티본스테이크-2,양송이수프-1,시저샐러드-1,해산물파스타-4',
        result: 6,
      },
      { input: '타파스-7,크리스마스파스타-4,레드와인-1', result: 4 },
      { input: '양송이수프-2,제로콜라-4,초코케이크-13', result: 0 },
    ];

    orderMenuTestCase.forEach((testCase) => {
      // given
      const orderMenu = new OrderMenu(testCase.input);

      // when
      const received = orderMenu.mainCount();

      // then
      expect(received).toBe(testCase.result);
    });
  });
});
