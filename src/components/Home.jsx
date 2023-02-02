import { Action } from '@remix-run/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductNameThunk, filterProductsCartegoryThunk, productsThunk } from '../store/slices/products.slice';

const Home = () => {
  const dispatch = useDispatch();
  const productstList = useSelector(state => state.products);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productSearch, setProductSearch] = useState("");


  useEffect(() => {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
      .then((res) => setCategories(res.data));
  }, [])



  useEffect(() => {
    dispatch(productsThunk());
  }, [])

  return (




    <div className='principal-container-home'>

      <Row>
        <Col lg={3} className='Left-container-home'>

          <div className='categoy-container'>
            <h3>Category</h3>
            <hr />
            {categories.map((category) => (
              <p key={category.id}
                onClick={() => dispatch(filterProductsCartegoryThunk(category.id))}
                style={{ cursor: 'pointer' }}
              >{category.name}</p>
            ))}
          </div>

        </Col>
        <Col lg={9} className='center-container-home'>

          <div>
            <h1>Home</h1>
            <div className='search-name-container'>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="What are you looking for?"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}

                />
                <Button onClick={() => dispatch(filterProductNameThunk(productSearch))}
                  variant="danger"
                  id="button-addon2">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAeFJREFUSEvlluFNAzEMhd+bADYAJoBOAEwAnQCYgDIB3QCYADoB3QCYgDIBMAEwgdGrnCpN7y6XclUr4T+Veok/27FfQqzJuCYusmAz2wawD+DIg/wA8EZy8pega8FmtgvgGsB5DUABDEmOlgmgEmxmpwDuASjbnI0BXJD8zi2Mvy+AHfoYLVJGY5ICwCuhwAYAdnzdhGRvabA7ffVMf1TmAEyd+tk/ADjxb3ckFUwrm8vYzOTozHf266CxZzNTk6n5ZHskdfZZm4E9gy/fMSJZ11RzTr1K76VZx2CNy1NJtiGCKOsXkmHsGrOOwUMfH5DMzndS7uK9GwHWmWp2i5rERyw05VKlPgCgUZJdkbzNtqYvMDOJxxaA1iOVjpNGQaKg314bNTIzze5NaVOm4LjcUqt+U9ZmFlepdZnls0oyJY1BjSQOEpIFUUgyLe6LKrAuhudIjeRUAUy1GoBuLWl1eoGowSQ82pu1pmtRzXWZ8fDpQeicg9QKrOZsvK8bhcLlUE51locehGDTCpBUlrqxYtXTX+ry4yZ4kUJlGk2ZhuCy8C7BqorgmudgtZl3BvaSt4Z3Cs7AdVfPnkedg2vgepNNGzHYSsAJfJBCK5UrO/kFC/SqqdP7lWWci+//gX8By0zNHzOOuDwAAAAASUVORK5CYII="/>
                </Button>
              </InputGroup>
            </div>
            <div className='cards-container'>
              <Row xs={1} md={2} lg={3} className="g-4">
                {productstList.map((product) => (
                  <Col key={product.id}>
                    <Card onClick={() => navigate(`/productDetail/${product.id}`)}>
                      <Card.Img variant="top"
                        src={product.images[0].url}
                        style={{ height: 200, objectFit: 'contain' }}
                      />
                      <Card.Body>
                        <Card.Title> <b> {product.title} </b></Card.Title>
                        <Card.Body>
                        <div className='div-cart-container'>
                                                <div>
                                                    <div>Price:</div>
                                                    <b>{product.price}</b>
                                                </div>
                                                <img className='btn-cart-red' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAeJJREFUSEvFlr1SFEEUhc8hB/EJhNBIjAx1fQJ8AjBhi0hDiYRIQ40oSYAn0Cdgl5BsiQiVJxA191BnvbPVtTU/PVuzTldt1W5PT3997z3n9hI9DfbERf9gSRsAHhUZIHm5zGzMIpZ0COB9ArsDMCA5WcYB6sDmjUkOlg12qv3x2AbwJr476nHX8FJxSVoH8DNg5yR3/wvYEElnAHYC+KID8K9UL5V2kmTYqANgusUrkt88UetjSVb0kw7hr0k6k41g1/Y0wEdW+QKHsE2fx3sPSdqmjWCL7AeAB4tYq06kjS1T0qfEWpskfZCsISnN2Ky+jRGHuu3t70H6TPJtFvWfMwqN3JIsesT09caIA+7auk6uj6Oe1qluRO+vPHAu2J3sa4BmymwA15YoCxxRu7a+vSYkn2ZEXKy/Jrk1v74NOL29LJo6kRnkiD1KM9QGnPbvpoDT5zPvppPZ4Eh3WrcceKULWoEDnn1h1F2ni4D3ADjtxyT/zIctaRXAvq1H8qQqLa3Akj4AeBebjUi+LAFf+C9TzH8keVAGbwtONxXJlRLw36QxlR4uu3MVm0tymr/E7xOSwxKwn3udx7Aq3a0iDnE9BrBG8qqqfpKeAfhN8qaTGuf4J3dN64hzN25a1xv4Hsq9sx9QXqmgAAAAAElFTkSuQmCC" />
                                            </div>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

            </div>
          </div>

        </Col>
      </Row>


    </div>
  );
};

export default Home;