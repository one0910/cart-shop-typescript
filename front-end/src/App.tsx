import React, { useReducer } from 'react';
import './assets/scss/all.scss';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import { CartContext, cartReducer, cartInit} from './store';


function App() {
  // const initialState: CartState = { cartList: [],total:0 };
  // console.log('initialState',cartInit)
  const reducer = useReducer(cartReducer, cartInit);
      
      return (
      <CartContext.Provider value={reducer}>
      <Navbar />
      <div className='container mt-4'>
        {/* 外層格線 */}
        <div className='row'>
          <div className='col-md-7'>
            {/* 內層格線 */}
            <Products />
          </div>
          <div className='col-md-5'>
            <Cart />
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default App;