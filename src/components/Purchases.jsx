import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
   
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])



    return (
        <div>
            <h1>My purchases</h1>

            {purchases.map((purchase) => (
                <Link key={purchase.id} to={`/productDetail/${purchase.product.id}`} style={{textDecoration:"none"}}>
                <Card  className="text-center, purchase-card-continer">
                    <Card.Header>{purchase.updatedAt.slice(0,10)}</Card.Header>
                    <Card.Body>
                        <div className='purchase-container'>
                            
                            <p style={{ width: "68%" }}>{purchase.product.title}</p>
                            <p>{purchase.quantity}</p>
                            <p>{purchase.product.price}</p>
                        </div>
                        
                    </Card.Body>

                </Card>
                </Link>
            ))}



        </div>
    );
};

export default Purchases;