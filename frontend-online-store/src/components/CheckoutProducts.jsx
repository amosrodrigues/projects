import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiCartAlt } from 'react-icons/bi';
import { FcUndo } from 'react-icons/fc';
import './CheckoutProducts.css';

class CheckoutProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      amount: 0,
      countTotal: 0,
    };

    this.sendTotalAmount = this.sendTotalAmount.bind(this);
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

  async getProductLocal() {
    const products = await localStorage.getItem('product');
    const productsCart = JSON.parse(products);

    this.setState((prevState) => (
      { products: [...prevState.products, ...productsCart] }));

    this.sendTotalAmount();
  }

  sendTotalAmount() {
    const { products } = this.state;
    this.setState({ amount: products.reduce((acc, { price, count }) => {
      acc += parseFloat(price * count) ;
      return acc;
    }, 0) });
  }

  render() {
    const { products, amount, countTotal } = this.state;
    const total = `Total: R$ ${parseFloat(amount).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
    return (
      <div>
        <div className="header-cards">
          <nav className="search-bar-cards">
            <Link to="/">
              <FcUndo size={ 60 } />
            </Link>
            <div className="cards">
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
          <div className="container-cards">
              <h1>Revise seus Produtos</h1>
              <div className="products-cards-content">
                  { products.map(({ id, title, thumbnail, price, count }) => (
                    <div className="product-cards" key={ id }>
                      <h3>{ title }</h3>
                      <img src={ thumbnail } alt={ title } />
                      <p style={ { fontWeight: '900' } }>{ count }</p>
                      <p>{ `R$ ${parseFloat(price * count).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}`}</p>
                    </div>
                  )) }
              </div>
              <p className="container-total" >{ total }</p>
          </div >
          <form>
            <h2>Informações Complementares</h2>
            <input
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Nome Comleto"
              data-testid="checkout-fullname"
              // onChange={this.myChangeHandler}
            />
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              data-testid="checkout-cpf"
              // onChange={this.myChangeHandler}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              data-testid="checkout-email"
              // onChange={this.myChangeHandler}
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefone"
              data-testid="checkout-phone"
              // onChange={this.myChangeHandler}
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              data-testid="checkout-cep"
              // onChange={this.myChangeHandler}
            />
            <input
              type="text"
              name="adress"
              placeholder="Endereço"
              data-testid="checkout-address"
              // onChange={this.myChangeHandler}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CheckoutProducts;
