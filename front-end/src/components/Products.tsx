import React,{useState,useContext,useEffect} from 'react'
import axios from 'axios';
import { CartContext, CartProduct } from "../store";

export interface ProductDataType{
  _id: string;
  id: string;
	img: string;
	price: number;
	title: string;
}

const Products = () => {
  const [state, dispatch] = useContext(CartContext);
  const [productData, setProductData] = useState<ProductDataType[]>([])
  console.log(' process.env', process.env)
  const serverPath = process.env.REACT_APP_PATH;
  useEffect(() => {
    (async function(){
    try {
        // let response = await axios.get(`http://127.0.0.1:5000/products`)
        let response = await axios.get(`${serverPath}/products`)
        setProductData(response.data.result) 

        // console.log('response',response)
    } catch(error){
        console.log('error',error);
    }
    }())

  }, [])


    return (
      <div className="row row-cols-3 g-3">
          {productData.map((product)=>{
            return(
              <div className="col" key={product.id}>
              <div className="card">
                <img src={product.img} className="card-img-top" alt="..."/>
                <div className="card-body">
                  <h6 className="card-title">{product.title}
                  <span className='float-end'>NT$ {product.price}</span>
                  </h6>
                  <button 
                    className="btn btn-outline-primary w-100"
                    onClick={()=>{dispatch({
                      type:"ADD_TO_CART",
                      payload:{
                        ...product,
                        quantity:1
                      }
                    })}}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            )
          })}

      </div>
    );
}

export default Products