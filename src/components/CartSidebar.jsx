import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductCartthunk, getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart);
    console.log(cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    const [contCArt, setContCart] = useState(1);

    const sumar = () => {
        setContCart(contCArt + 1)
    }
    const restar = () => {
        if (contCArt > 1) {
            setContCart(contCArt - 1)
        }

    }


    return (
        <Offcanvas placement='end' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {cart.map((productcart) => (
                    <div key={productcart.id}>
                        <div className='cart-product-container'>
                            <img src={productcart.product.images[0].url}
                                className="img-cart"
                                alt="img-poduct-tv" />
                            <h4 style={{fontSize:12}}>{productcart.product.title}</h4>
                            <img onClick={()=> dispatch(deleteProductCartthunk(productcart.id))} style={{width:22, height:22}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAQZJREFUSEvtlrENAjEMRe3TWaKjIoiOEdgA2AA2gAlgFJgARoAJgA0YgQ7paKBD+BSjFJwA5ZTkhHQUSZvvPNuxEyPUtLAmLgSBL0RzEGnanBXEq2Je+gbiDc6IFgAwcxy8VMxzH7gXOCOaAMDK50AAmCrmtUv7Ab6k6UAQdy6jKvsoMmzl+f5l+x/gc6PRTbQ2af350kmy7tzvJ2vE77SMqIclFezrlSDeFPPRpi8trozI3EffF1KiOyjmQQSbDMRUF3UQi6tiW8V2KhIX2ym2U/ydgt4REdm283wU+h+HTJZWhwRx3H48NkFgIzbjjyBaPXaFnmi9f58qv/Vec7ULUmW/NvATlCKYHzmYDOEAAAAASUVORK5CYII="/>
                            
                        </div>
                        <div className='cart-selected'>
                            <div className='box-cart-cart' onClick={productcart.quantity+1}>+</div>
                            <div className='box-cart'>  {productcart.quantity}  </div>
                            <div className='box-cart' onClick={productcart.quantity-1}>-</div>
                        </div>
                        <div>
                            <b>Total:</b>
                            <p>{productcart.product.price*productcart.quantity }</p>
                        </div>
                    </div>

                ))}
                <button on onClick={() => dispatch(purchaseCartThunk())}>Check out</button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};


export default CartSidebar;