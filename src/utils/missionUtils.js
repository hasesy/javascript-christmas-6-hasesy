import { MissionUtils } from '@woowacourse/mission-utils';

export const readLineAsync = async (query) => {
  const input = await MissionUtils.Console.readLineAsync(query);
  return input;
};

export const print = (message) => MissionUtils.Console.print(message);
