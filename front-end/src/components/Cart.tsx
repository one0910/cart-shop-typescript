import React, { useContext, ChangeEvent, MouseEvent } from 'react'
import { CartContext, CartProduct } from '../store';

interface CartProps {

}

const Cart: React.FC<CartProps> = ({ }) => {
  const [state, dispatch] = useContext(CartContext)

  const removeHandler = (item: CartProduct) => {
    dispatch({
      type: "REMOVE_CART_ITEM",
      payload: {
        ...item
      }
    })
  }

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>, item: CartProduct) => {
    event.preventDefault()
    console.log("item", item);
    const quantity = parseInt(event.target.value)
    dispatch({
      type: "CHANGE_CART_QUANTITY",
      payload: {
        ...item,
        quantity
      }
    })
  }

  return (
    <div className="bg-light p-3">
      <table className='table align-middle'>
        <tbody>
          {state.cartList.map((item) => {
            return (
              <tr key={item.id}>
                <td><button type='button' className='btn btn-sm' onClick={() => removeHandler(item)}
                >x</button></td>
                <td><img className='table-image' src={item.img} alt="" /></td>
                <td>{item.title} <br /><small className='text-muted'>NT$ {item.price}</small></td>
                <td>
                  <select className='form-select' name="" id="" value={item.quantity} onChange={(event) => changeHandler(event, item)}>
                    {[...Array(20)].map((__, index) => {
                      return (
                        <option value={index + 1} key={index}>{index + 1}</option>
                      )
                    })}
                  </select>
                </td>
                <td className='text-end'>NT$ {item.price * item.quantity}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className='' >總金額 NT$ {state.total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Cart