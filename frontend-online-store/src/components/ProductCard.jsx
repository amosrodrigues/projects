import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FcShipped } from 'react-icons/fc';
import './ProductCard.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct({ target }) {
    const { product } = localStorage;
    const list = JSON.parse(product);
    const { onUpdateCount } = this.props;

    const productsList = localStorage.getItem('productsList');
    const listGet = JSON.parse(productsList);
    const productAdd = () => listGet.filter((objct) => (objct.id === target.id))[0];
    const { price, thumbnail, title } = productAdd();
    const quantity = productAdd().available_quantity;

    const item = {
      id: target.id,
      count: 1,
      price,
      thumbnail,
      title,
      quantity };

    if (!list.find(({ id }) => id === item.id)) {
      localStorage.setItem('product', JSON.stringify([...list, item]));
    } else {
      localStorage.setItem('product', JSON.stringify(
        list.map((objct) => {
          if (objct.id === item.id && objct.count < item.quantity) {
            objct.count += 1;
          }
          return objct;
        }),
      ));
    }
    onUpdateCount();
  }

  render() {
    const { product } = this.props;

    return (
      <div className="product-card" data-testid="product">
        <h4>{product.title}</h4>
        <img src={ product.thumbnail } alt="Imagem" />
        <p>{`R$ ${parseFloat(product.price).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`}
        </p>
        <div className="product-info">
          <Link data-testid="product-detail-link" to={ `/product/${product.id}` }>
            Ver detalhes
          </Link>
        </div>
          { product.shipping.free_shipping
            && <p id="frete" data-testid="free-shipping"><FcShipped size={ 40 } />&nbsp;Frete grátis</p>}
        <button
          type="button"
          id={ product.id }
          data-testid="product-add-to-cart"
          onClick={ this.addProduct }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.objectOf(String).isRequired,
  onUpdateCount: PropTypes.func.isRequired,
};

export default ProductCard;
