import { ADD_COUNTER, ADD_TO_CART } from './mutations-types';

export default {
  /**
  * mutations唯一的目的就是修改state中状态
  * mutations中的每个方法尽可能完成的时间比较单一
  */
  [ADD_COUNTER] (state, payload) {
    payload.count++;
    // console.log(state);

  },
  [ADD_TO_CART] (state, payload) {
    state.cartList.push(payload);

  }
};