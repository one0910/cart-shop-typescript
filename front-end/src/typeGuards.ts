import { CartAction, CartProduct } from './store';

export function hasPayload(action: CartAction): action is CartAction & { payload: CartProduct } {
  return action.payload !== undefined;
}