import { createContext, Dispatch } from "react";
// import { Product } from './assets/productsData';
import { ProductDataType } from "./components/Products";

// 定義我們的產品型別

// 定義購物車內的產品型別，擴展 Product 並添加數量
export interface CartProduct extends ProductDataType {
    quantity: number;
}

// 定義我們的狀態型別
export interface CartState {
  cartList: CartProduct[];
  total:number
}

// 定義操作型別

export interface CartAction {
  type: string;
  payload?: CartProduct;
  // payload?: any;
}

// 定義 Context 型別
export type CartContextType = [CartState, Dispatch<CartAction>];


// 建立我們的 Context
export const cartInit: CartState = {  cartList: [],total:0 };

export const CartContext = createContext<CartContextType>([cartInit, () => {}]);


export const cartReducer = ((state: CartState, action: CartAction) => {
  const cartList = [...state.cartList]
  const index= cartList.findIndex((item)=>item.id === action.payload?.id)

  const totalPrice = () =>{
    return cartList.map((item)=>(item.quantity * item.price)).reduce((a,b)=>a+b,0)
  }

  switch (action.type) {
    case 'ADD_TO_CART':
      if (action.payload) {
        if(index === -1){
          cartList.push(action.payload)
        }else{
          cartList[index].quantity += action.payload.quantity
        }
        // const array = cartList.map((item)=>{
        //   return item.quantity * item.price
        // })
        // const total = array.reduce((a,b)=>{
        //   return a+b
        // },0)

        return {
          ...state,
          cartList,
          total:totalPrice()
        };
      }else{
        return state
      }
      case 'CHANGE_CART_QUANTITY':
        if (action.payload) {
          cartList[index].quantity = action.payload.quantity
          return {
            ...state,
            cartList,
            total:totalPrice()   
          };        
        }else{
          return state
        }
        case 'REMOVE_CART_ITEM':
          if (action.payload) {
            cartList.splice(index,1)
            return {
              ...state,
              cartList,
              total:totalPrice()
            };        
          }else{
            return state
          }
      default:
        return state;
    }
      
})