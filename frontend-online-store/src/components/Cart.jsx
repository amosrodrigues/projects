import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiCartAlt } from 'react-icons/bi';
import { FcUndo } from 'react-icons/fc';
import { FaRegFrown } from 'react-icons/fa';
import './Cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      countTotal: 0,
    };

    this.increaseAmount = this.increaseAmount.bind(this);
    this.decreaseAmount = this.decreaseAmount.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.getProductLocal();
    this.onUpdateCount();
  }
  

  onUpdateCount() {
    const product = localStorage.getItem('product');
    const list = JSON.parse(product);

    this.setState({ countTotal: list.reduce((acc, { count }) => {
      acc += count;
      return acc;
    }, 0) });
  }

  getProductLocal() {
    const { product } = localStorage;
    const productListCart = JSON.parse(product);

    productListCart.map(async ({ id, count, evaluation }) => {
      const productsList = await localStorage.getItem('productsList');
      const listGet = JSON.parse(productsList);

      const productDetails = listGet.filter((objct) => (objct.id === id))[0];

      this.setState((prevState) => (
        { products: [...prevState.products, { ...productDetails, count, evaluation }] }));
    });
  }

  funcMapNegative(array, id) {
    return array.map((objct) => {
      if (objct.id === id && objct.count > 1) {
        objct.count -= 1;
      }
      return objct;
    });
  }

  funcMapPositive(array, id) {
    return array.map((objct) => {
      if (objct.id === id && objct.count < objct.available_quantity) {
        objct.count += 1;
      } if (objct.id === id && objct.count < objct.quantity) {
        objct.count += 1;
      }
      return objct;
    });
  }

  funcMapRemove(array, id) {
    const productRemoved = array.filter((objct) => (objct.id !== id));
    return productRemoved;
  }

  increaseAmount({ target }) {
    const { product } = localStorage;
    const list = JSON.parse(product);
    const { products } = this.state;
    const newState = this.funcMapPositive(products, target.id);

    localStorage.setItem('product', JSON.stringify(
      this.funcMapPositive(list, target.id),
    ));

    this.setState({ products: newState });
    this.onUpdateCount();
  }

  decreaseAmount({ target }) {
    const { product } = localStorage;
    const list = JSON.parse(product);
    const { products } = this.state;
    const newState = this.funcMapNegative(products, target.id);

    localStorage.setItem('product', JSON.stringify(
      this.funcMapNegative(list, target.id),
    ));

    this.setState({ products: newState });
    this.onUpdateCount();
  }

  removeItem({ target }) {
    const { product } = localStorage;
    const list = JSON.parse(product);
    const { products } = this.state;
    const newState = this.funcMapRemove(products, target.id);

    localStorage.setItem('product', JSON.stringify(
      this.funcMapRemove(list, target.id),
    ));

    this.setState({ products: newState });
    this.onUpdateCount();
  }

  render() {
    const { products, countTotal } = this.state;
    if (products.length < 1) {
      return (
        <div className="header-cart">
          <nav className="search-bar-cart">
            <Link to="/">
              <FcUndo size={ 60 } />
            </Link>
            <div className="cart">
              <Link data-testid="shopping-cart-button" to="/cart">
                <span>
                  <BiCartAlt size={ 50 } />
                </span>
              </Link>
              <p data-testid="shopping-cart-size">
                { countTotal }
              </p>
            </div>
          </nav>
          <span className="cart-msg" data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio!
          </span>
          <FaRegFrown size={ 50 } />
        </div>
      );
    }

    return (
      <div className="header-cart">
        <nav className="search-bar-cart">
          <Link to="/">
            <FcUndo size={ 60 } />
          </Link>
          <div className="cart">
            <Link data-testid="shopping-cart-button" to="/cart">
              <span>
                <BiCartAlt size={ 50 } />
              </span>
            </Link>
            <p data-testid="shopping-cart-size">
              { countTotal }
            </p>
          </div>
        </nav>
        <div className="container-card-cart">
          { products.map(({ id, title, thumbnail, price, count }) => (
            <div className="product-card-cart" key={ id }>
              <h1 data-testid="shopping-cart-product-name">{ title }</h1>
              <img src={ thumbnail } alt={ title } />
              <p>{ `R$ ${parseFloat(price * count).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
              })}`}
              </p>
            <div>
              <button
                onClick={ this.decreaseAmount }
                id={ id }
                type="button"
                data-testid="product-decrease-quantity"
                title="Diminuir"
              >
                -
              </button>&nbsp;&nbsp;
              <span data-testid="shopping-cart-product-quantity">{ count }</span>&nbsp;&nbsp;
              <button
                onClick={ this.increaseAmount }
                id={ id }
                type="button"
                data-testid="product-increase-quantity"
                title="Aumentar"
              >
                +
              </button>
              <button
                className="excluir"
                onClick={ this.removeItem }
                id={ id }
                type="button"
                title="Excluir"
              >
                X
              </button>
            </div>
            </div>
          )) }
        </div>
        <div className="link">
          <Link className="button" data-testid="checkout-products" to="checkout-products">
            Finalizar Compra
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
