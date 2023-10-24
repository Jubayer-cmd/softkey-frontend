import { baseApi } from './api/baseApi';
import { cartReducer } from './api/cartApi/cartApi';

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartReducer,
};
