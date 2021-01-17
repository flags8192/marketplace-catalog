import {
  faBalanceScale,
  faQuestionCircle,
  faRubleSign,
  faSearch,
  faShoppingBag,
  faShoppingCart,
  faStar
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { PureComponent, useState } from 'react'
import { Button, Carousel, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import { ProductData } from '../../Data/product'
import { declOfNumber } from '../../Utils/utils'
import './style.css'

function SlideImage(props) {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {
        props.data.data.images.map((images) =>
          <Carousel.Item key={images.id}>
            <img
              className="d-block w-100"
              src={`/images/${images.image}`}
              alt=""
            />
          </Carousel.Item>
        )
      }
    </Carousel>
  )
}

function QuickViewProduct(props) {
  if (props) {

    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Body className="show-grid">
          <Container>
            <Row className="row" style={{ padding: '10px' }}>
              <Col md={6}>
                <SlideImage data={props}/>
              </Col>
              <Col md={6}>
                <div className="product-modal-label">
                  {props.data.action ? <span className="product-promo-label-modal">Акция</span> : ''}
                  {props.data.action ?
                    <span className="product-discount-label-modal">{`${props.data.discount}%`}</span> : ''}
                </div>
                <h3>{props.data.name}</h3>
                <div>
                  <div className="ratings">
                    <ul className="rating">
                      <li><FontAwesomeIcon icon={faStar}/></li>
                      <li><FontAwesomeIcon icon={faStar}/></li>
                      <li><FontAwesomeIcon icon={faStar}/></li>
                      <li><FontAwesomeIcon icon={faStar}/></li>
                      <li className="disable"><FontAwesomeIcon icon={faStar}/></li>
                    </ul>
                  </div>
                  <div className="reviews">
                    {props.data.reviews} {declOfNumber(props.data.reviews, ['отзыв', 'отзыва', 'отзывов'])}
                  </div>
                  <div className="questions">
                    <FontAwesomeIcon
                      icon={faQuestionCircle}/> {props.data.questions} {declOfNumber(props.data.questions, ['вопрос', 'вопроса', 'вопросов'])}
                  </div>
                </div>
                <br/>
                <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen book.</p>
                <div className="modal-price">
                <span className="current-price">
                  {
                    props.data.action
                      ? (props.data.price * (1 - props.data.discount / 100)).toFixed(0)
                      : props.data.price
                  } <FontAwesomeIcon icon={faRubleSign}/></span>
                  <span className="discount-price">
                  {
                    props.data.action
                      ? <span>{props.data.price} <FontAwesomeIcon icon={faRubleSign}/></span>
                      : ''
                  }
                </span>
                </div>
                <Form>
                  <Form.Group>
                    <Form.Label><h6>Выберите размер:</h6></Form.Label>
                    <Form.Control as="select" size="md" custom>
                      <option>42</option>
                      <option>44</option>
                      <option>46</option>
                      <option>48</option>
                      <option>50</option>
                      <option>52</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label><h6>Цвет:</h6></Form.Label>
                    <Form.Control as="select" size="md" custom>
                      <option>Красный</option>
                      <option>Синий</option>
                      <option>Зеленый</option>
                      <option>Серый</option>
                      <option>Бежевый</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
                <div className="post-info">
                  <div>Ваш регион: <span>Смоленск</span></div>
                  <div>Доставка: <span>ориентировочно 16 января</span></div>
                </div>
                <Button type="button" variant="dark" className="btn btn-primary float-right mt-3"><FontAwesomeIcon
                  icon={faShoppingCart}/> Добавить в корзину</Button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

class Catalog extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      modalShow: false,
      product: {}
    }
  }

  render() {
    const Products = (props) => {
      const rows = [...Array(Math.ceil(props.products.length / 4))]
      const productRows = rows.map((row, idx) => props.products.slice(idx * 4, idx * 4 + 4))
      const content = productRows.map((row, idx) => (
        <Row key={idx}>
          {row.map(product =>
            <Col key={product.id} md={3} sm={6}>
              <div className="product-grid">
                <div className="product-image">
                  <a href="#">
                    <Image className="pic-1" src={`/images/${product.images[0].image}`} alt=""/>
                    <Image className="pic-2" src={`/images/${product.images[1].image}`} alt=""/>
                  </a>
                  <ul className="float-menu">
                    <li><a href="#" onClick={() => this.setState({ modalShow: true, product: product })}
                           data-tip="Быстрый просмотр"><FontAwesomeIcon icon={faSearch}/></a></li>
                    <li><a href="#" data-tip="Добавить в список покупок"><FontAwesomeIcon icon={faShoppingBag}/></a>
                    </li>
                    <li><a href="#" data-tip="Сравнить"><FontAwesomeIcon icon={faBalanceScale}/></a></li>
                  </ul>
                  {product.action ? <span className="product-promo-label">Акция</span> : ''}
                  {product.action ? <span className="product-discount-label">{`${product.discount}%`}</span> : ''}
                </div>
                <ul className="rating">
                  <li><FontAwesomeIcon icon={faStar}/></li>
                  <li><FontAwesomeIcon icon={faStar}/></li>
                  <li><FontAwesomeIcon icon={faStar}/></li>
                  <li><FontAwesomeIcon icon={faStar}/></li>
                  <li className="disable"><FontAwesomeIcon icon={faStar}/></li>
                </ul>
                <div className="product-content">
                  <h3 className="title"><a href="#">{product.name.toUpperCase()}</a></h3>
                  <div className="price">
                    {
                      product.action
                        ? (product.price * (1 - product.discount / 100)).toFixed(0)
                        : product.price
                    } <FontAwesomeIcon icon={faRubleSign}/>
                    {
                      product.action
                        ? <span>{product.price} <FontAwesomeIcon icon={faRubleSign}/></span>
                        : ''
                    }
                  </div>
                  <a className="add-to-cart" href="">В корзину</a>
                </div>
              </div>
            </Col>
          )}
        </Row>))
      return (
        <>
          {content}
        </>
      )
    }

    return <>
      <Container>
        <h3 className="h3">Marketplace</h3>
        {Products(ProductData)}
      </Container>
      {this.state.modalShow
        ? <QuickViewProduct data={this.state.product} show={this.state.modalShow}
                            onHide={() => this.setState({ modalShow: false })}/>
        : ''
      }
    </>
  }
}

export default Catalog
