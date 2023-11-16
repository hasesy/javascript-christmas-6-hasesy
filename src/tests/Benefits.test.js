import Benefits from '../domain/Benefits.js';

describe('방문 날짜 검증 테스트', () => {
  test('숫자가 아니면 예외가 발생한다.', () => {
    expect(() => {
      new Benefits('십삼일');
    }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  });

  test('1 에서 31 사이의 수가 아니면 예외가 발생한다.', () => {
    expect(() => {
      new Benefits('32');
    }).toThrow('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
  });
});

describe('크리스마스 디데이 할인 테스트', () => {
  const christmasDdayTestCase = [
    { date: '1', result: ['크리스마스 디데이 할인', 1000] },
    { date: '17', result: ['크리스마스 디데이 할인', 2600] },
    { date: '25', result: ['크리스마스 디데이 할인', 3400] },
  ];

  test('1일부터 25일 사이의 할인 금액을 계산한다.', () => {
    christmasDdayTestCase.forEach((testCase) => {
      // given
      const benefits = new Benefits(testCase.date);

      // when
      const received = benefits.christmasDiscount();

      // then
      expect(received).toStrictEqual(testCase.result);
    });
  });

  test('25일 이후의 할인 금액은 0이다.', () => {
    // given
    const benefits = new Benefits('28');

    // when
    const received = benefits.christmasDiscount();

    // then
    expect(received).toStrictEqual(['크리스마스 디데이 할인', 0]);
  });
});

describe('평일 할인 테스트', () => {
  const weekdayTestCase = [
    { date: '3', count: 3, result: ['평일 할인', 6069] },
    { date: '19', count: 5, result: ['평일 할인', 10115] },
    { date: '28', count: 10, result: ['평일 할인', 20230] },
  ];

  test('평일이면 디저트 메뉴의 수량에 따라 할인 금액을 계산한다.', () => {
    weekdayTestCase.forEach((testCase) => {
      // given
      const benefits = new Benefits(testCase.date);

      // when
      const received = benefits.weekdayDiscount(testCase.count);

      // then
      expect(received).toStrictEqual(testCase.result);
    });
  });

  test('주말이면 할인 금액이 0이다.', () => {
    // given
    const benefits = new Benefits('1');

    // when
    const received = benefits.weekdayDiscount(15);

    // then
    expect(received).toStrictEqual(['평일 할인', 0]);
  });
});

describe('주말 할인 테스트', () => {
  const weekendTestCase = [
    { date: 2, count: 2, result: ['주말 할인', 4046] },
    { date: 15, count: 7, result: ['주말 할인', 14161] },
    { date: 30, count: 15, result: ['주말 할인', 30345] },
  ];

  test('주말이면 메인 메뉴의 수량에 따라 할인 금액을 계산한다.', () => {
    weekendTestCase.forEach((testCase) => {
      // given
      const benefits = new Benefits(testCase.date);

      // when
      const received = benefits.weekendDiscount(testCase.count);

      // then
      expect(received).toStrictEqual(testCase.result);
    });
  });

  test('평일이면 할인 금액이 0이다.', () => {
    // given
    const benefits = new Benefits('24');

    // when
    const received = benefits.weekendDiscount(12);

    // then
    expect(received).toStrictEqual(['주말 할인', 0]);
  });
});

describe('특별 할인 테스트', () => {
  const specialTestCase = ['10', '25', '31'];

  test('일요일이나 25일이면 특별 할인 값을 반환한다.', () => {
    specialTestCase.forEach((date) => {
      // given
      const benefits = new Benefits(date);

      // when
      const received = benefits.specialDiscount();

      // then
      expect(received).toStrictEqual(['특별 할인', 1000]);
    });
  });

  test('이외의 날은 할인 금액이 0이다.', () => {
    // given
    const benefits = new Benefits('29');

    // when
    const received = benefits.specialDiscount();

    // then
    expect(received).toStrictEqual(['특별 할인', 0]);
  });
});
