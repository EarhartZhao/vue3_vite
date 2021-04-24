import stronge from '@utils/stronge'

export const getterVal = (state: any, key: string) => state[key];

export const commitVal = (state: any, valueObj: object) => {
  Object.keys(valueObj).forEach((item) => {
    if (!state.hasOwnProperty(item)) return;

    state[item] = valueObj[item];

    stronge.set(item, valueObj[item]);
  });
};

export const clearVal = (state: any, key: string) => {
  state[key] = null;
  stronge.remove(key);
};
