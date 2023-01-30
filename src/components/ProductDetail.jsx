import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCartegoryThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listSuggested = useSelector(state => state.products)
    const [contCArt, setContCart] = useState(1);

    const sumar = () => {
        setContCart(contCArt+1)
    }
    const restar = ()=> {
        if (contCArt > 1) {
            setContCart(contCArt-1)
        }
       
    }

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data)
                dispatch(filterProductsCartegoryThunk(res.data.category.id))
            });
    }, [id])

    return (
        <div>
            <h4>{product.title}</h4>
            <Row>
                <Col>
                    {/* //carrucel con imagenes */}

                    <Carousel variant="dark">
                        <Carousel.Item>
                            <img
                                className="d-block w-100, img-fluid "
                                src={product.images?.[0].url}
                                alt="First slide"
                                style={{ height: 350, objectFit: 'contain' }}
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100, img-fluid "
                                src={product.images?.[1].url}
                                alt="Second slide"
                                style={{ height: 350, objectFit: 'contain' }}
                            />

                            <Carousel.Caption>
                               
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={product.images?.[2].url}
                                alt="Third slide"
                                style={{ height: 350, objectFit: 'contain' }}
                            />

                            <Carousel.Caption>
                    
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>

                <Col>
                
                    <div>
                        <h3>{product.title}</h3>
                        <p>{product.description} </p>

                        <div className='price-car'>
                            <div>
                                <b>Price : </b>
                                <p>${product.price}</p>
                            </div>
                            <div className='quantity-container'>
                                <p>Quantity </p>
                                <div className='cart-selected'>
                                    <div onClick={sumar}>+</div>
                                    <div >{contCArt}</div>
                                    <div onClick={restar}>-</div>
                                </div>

                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            <Button variant="danger" size="sm">
                               Add to cart <img className='btn-cart-transp' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAeJJREFUSEvFlr1SFEEUhc8hB/EJhNBIjAx1fQJ8AjBhi0hDiYRIQ40oSYAn0Cdgl5BsiQiVJxA191BnvbPVtTU/PVuzTldt1W5PT3997z3n9hI9DfbERf9gSRsAHhUZIHm5zGzMIpZ0COB9ArsDMCA5WcYB6sDmjUkOlg12qv3x2AbwJr476nHX8FJxSVoH8DNg5yR3/wvYEElnAHYC+KID8K9UL5V2kmTYqANgusUrkt88UetjSVb0kw7hr0k6k41g1/Y0wEdW+QKHsE2fx3sPSdqmjWCL7AeAB4tYq06kjS1T0qfEWpskfZCsISnN2Ky+jRGHuu3t70H6TPJtFvWfMwqN3JIsesT09caIA+7auk6uj6Oe1qluRO+vPHAu2J3sa4BmymwA15YoCxxRu7a+vSYkn2ZEXKy/Jrk1v74NOL29LJo6kRnkiD1KM9QGnPbvpoDT5zPvppPZ4Eh3WrcceKULWoEDnn1h1F2ni4D3ADjtxyT/zIctaRXAvq1H8qQqLa3Akj4AeBebjUi+LAFf+C9TzH8keVAGbwtONxXJlRLw36QxlR4uu3MVm0tymr/E7xOSwxKwn3udx7Aq3a0iDnE9BrBG8qqqfpKeAfhN8qaTGuf4J3dN64hzN25a1xv4Hsq9sx9QXqmgAAAAAElFTkSuQmCC" />
                            </Button>

                        </div>
                    </div>
                </Col>
            </Row>

            <div className='relationated-container'>

                <Row xs={2} md={3} lg={5} className="g-4">
                    {listSuggested.map(itemSuggested => (
                        <Col key={itemSuggested.id}>
                            <Card onClick={() => navigate(`/productDetail/${itemSuggested.id}`)}>

                                <Card.Img variant="top"
                                    src={itemSuggested.images[0].url}
                                    style={{ height: 200, objectFit: 'contain' }}
                                />
                                <Card.Body>
                                    <Card.Title> <b> {itemSuggested.title} </b></Card.Title>
                                    <Card.Text>

                                        <div className='div-cart-container'>
                                            <div>
                                                <div>Price:</div>
                                                <b>{itemSuggested.price}</b>
                                            </div>
                                            <img className='btn-cart-red' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAeJJREFUSEvFlr1SFEEUhc8hB/EJhNBIjAx1fQJ8AjBhi0hDiYRIQ40oSYAn0Cdgl5BsiQiVJxA191BnvbPVtTU/PVuzTldt1W5PT3997z3n9hI9DfbERf9gSRsAHhUZIHm5zGzMIpZ0COB9ArsDMCA5WcYB6sDmjUkOlg12qv3x2AbwJr476nHX8FJxSVoH8DNg5yR3/wvYEElnAHYC+KID8K9UL5V2kmTYqANgusUrkt88UetjSVb0kw7hr0k6k41g1/Y0wEdW+QKHsE2fx3sPSdqmjWCL7AeAB4tYq06kjS1T0qfEWpskfZCsISnN2Ky+jRGHuu3t70H6TPJtFvWfMwqN3JIsesT09caIA+7auk6uj6Oe1qluRO+vPHAu2J3sa4BmymwA15YoCxxRu7a+vSYkn2ZEXKy/Jrk1v74NOL29LJo6kRnkiD1KM9QGnPbvpoDT5zPvppPZ4Eh3WrcceKULWoEDnn1h1F2ni4D3ADjtxyT/zIctaRXAvq1H8qQqLa3Akj4AeBebjUi+LAFf+C9TzH8keVAGbwtONxXJlRLw36QxlR4uu3MVm0tymr/E7xOSwxKwn3udx7Aq3a0iDnE9BrBG8qqqfpKeAfhN8qaTGuf4J3dN64hzN25a1xv4Hsq9sx9QXqmgAAAAAElFTkSuQmCC" />
                                        </div>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>




            </div>

        </div>
    );
};

export default ProductDetail;