import Service from '../Service.js';

describe('총 주문금액이 12만원 이상일 때, 총 혜택금액 구하는 테스트', () => {
  const hasWeekEventTestCase = [
    { testName: '크리스마스+평일+특별+증정', date: '10', result: 33969 },
    { testName: '크리스마스+평일+증정', date: '6', result: 32569 },
    { testName: '크리스마스+주말+증정', date: '1', result: 36115 },
    { testName: '평일+특별+증정', date: '31', result: 32069 },
    { testName: '주말+증정', date: '29', result: 35115 },
  ];

  const notWeekEventTestCase = [
    { testName: '크리스마스+특별+증정', date: '17', result: 28600 },
    { testName: '특별+증정', date: '31', result: 26000 },
  ];

  hasWeekEventTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      // given
      const service = new Service();
      service.benefitsCreate(testCase.date);
      service.orderMenuCreate(
        '양송이수프-1,티본스테이크-5,초코케이크-3,레드와인-2',
      );

      // when
      const received = service.totalBenefitsPrice();

      // then
      expect(received).toBe(testCase.result);
    });
  });

  notWeekEventTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      // given
      const service = new Service();
      service.benefitsCreate(testCase.date);
      service.orderMenuCreate('양송이수프-1,바비큐립-5,레드와인-2');

      // when
      const received = service.totalBenefitsPrice();

      // then
      expect(received).toBe(testCase.result);
    });
  });
});

describe('총 주문금액이 12만원 미만일 때, 총 혜택금액 구하는 테스트', () => {
  const hasWeekEventTestCase = [
    { testName: '크리스마스+평일+특별', date: '10', result: 6946 },
    { testName: '크리스마스+평일', date: '6', result: 5546 },
    { testName: '크리스마스+주말', date: '1', result: 7069 },
    { testName: '평일+특별', date: '31', result: 5046 },
    { testName: '주말', date: '29', result: 6069 },
  ];

  const notWeekEventTestCase = [
    { testName: '크리스마스+특별', date: '17', result: 3600 },
    { testName: '특별', date: '31', result: 1000 },
  ];

  hasWeekEventTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      // given
      const service = new Service();
      service.benefitsCreate(testCase.date);
      service.orderMenuCreate(
        '시저샐러드-1,크리스마스파스타-3,아이스크림-2,제로콜라-1',
      );

      // when
      const received = service.totalBenefitsPrice();

      // then
      expect(received).toBe(testCase.result);
    });
  });

  notWeekEventTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      // given
      const service = new Service();
      service.benefitsCreate(testCase.date);
      service.orderMenuCreate('시저샐러드-1,크리스마스파스타-3,제로콜라-1');

      // when
      const received = service.totalBenefitsPrice();

      // then
      expect(received).toBe(testCase.result);
    });
  });
});

describe('예상 결제 금액 계산 테스트', () => {
  const estimatedAmountTestCase = [
    {
      testName: '혜택이 없으면 총 주문금액을 반환한다.',
      order: '타파스-4,티본스테이크-5,레드와인-2',
      result: 417000,
    },
    {
      testName: '증정 이벤트가 없으면 총 금액에서 혜택 금액을 뺀다.',
      order: '양송이수프-1,해산물파스타-1,초코케이크-2',
      result: 66954,
    },
    {
      testName: '증정 이벤트가 있으면 샴페인 값을 빼고 계산한다.',
      order: '시저샐러드-3,바비큐립-4,초코케이크-5',
      result: 304885,
    },
  ];

  estimatedAmountTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      // given
      const service = new Service();
      service.benefitsCreate(27);
      service.orderMenuCreate(testCase.order);

      // when
      const received = service.calculatePayment();

      // then
      expect(received).toBe(testCase.result);
    });
  });
});

describe('12월 이벤트 배지 테스트', () => {
  const badgeTestCase = [
    {
      testName: '총 혜택금액이 5,000원 이상이면 "별" 배지를 반환한다.',
      date: 15,
      order: '바비큐립-2,아이스크림-1,제로콜라-1',
      result: '별',
    },
    {
      testName: '총 혜택금액이 10,000원 이상이면 "트리" 배지를 반환한다.',
      date: 25,
      order: '타파스-1,크리스마스파스타-1,아이스크림-4,제로콜라-1',
      result: '트리',
    },
    {
      testName: '총 혜택금액이 20,000원 이상이면 "산타" 배지를 반환한다.',
      date: 31,
      order: '시저샐러드-1,티본스테이크-1,레드와인-1,초코케이크-1',
      result: '산타',
    },
  ];

  badgeTestCase.forEach((testCase) => {
    test(testCase.testName, () => {
      // given
      const service = new Service();
      service.benefitsCreate(testCase.date);
      service.orderMenuCreate(testCase.order);

      // when
      const received = service.calculateBadge();

      // then
      expect(received).toStrictEqual(testCase.result);
    });
  });
});
