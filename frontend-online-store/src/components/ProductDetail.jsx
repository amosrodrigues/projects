import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FcUndo, FcShipped } from 'react-icons/fc';
import { BiCartAlt } from 'react-icons/bi';
import './ProductDetail.css';

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: { attributes: [] },
      evaluation: { comment: '', nota: '' },
      countTotal: 0,
    };

    this.returnProductDetails = this.returnProductDetails.bind(this);
    this.handleChangeComent = this.handleChangeComent.bind(this);
    this.handleChangeNota = this.handleChangeNota.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addAvaliation = this.addAvaliation.bind(this);
  }

  componentDidMount() {
    this.returnProductDetails();
    this.onUpdateCount();
  }

  handleChangeComent({ target: { value } }) {
    const { evaluation: { nota } } = this.state;
    this.setState({
      evaluation: { comment: value, nota: nota },
    });
  }

  handleChangeNota({ target: { value } }) {
    const { evaluation: { comment } } = this.state;
    this.setState({
      evaluation: { comment: comment, nota: value },
    });
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      evaluation: { [name]: value },
    });
  }

  onUpdateCount() {
    const product = localStorage.getItem('product');
    const list = JSON.parse(product);

    this.setState({ countTotal: list.reduce((acc, { count }) => {
      acc += count;
      return acc;
    }, 0) });
  }

  addAvaliation({ target: { id } }) {
    const { evaluation: { comment, nota } } = this.state;
    const { avaliation } = localStorage;
    const list = JSON.parse(avaliation);

    const item = { id, comment, nota };

    if (!list.find(({ id }) => id === item.id)) {
      localStorage.setItem('avaliation', JSON.stringify([...list, item]));
    } 
    this.setState({ evaluation: { comment: '', nota: '' } });
  }

  addProduct({ target }) {
    const { products } = this.state;
    const quantity = products.available_quantity;

    const { products: { price, thumbnail, title } } = this.state;
    const { product } = localStorage;
    const list = JSON.parse(product);

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
    this.onUpdateCount();
  }

  async returnProductDetails() {
    const { match: { params: { id } } } = this.props;
    const productsList = await localStorage.getItem('productsList');
    const listGet = JSON.parse(productsList);

    this.setState({
      products: listGet.filter((objct) => (objct.id === id))[0],
    });
  }

  getAvaliation(id) {
    const { avaliation } = localStorage;
    const list = JSON.parse(avaliation);
  
    return  list.map((objct) => (
        (objct.id === id) && 
        <div key="objct.id">
          <fieldset  className="elist">
            <legend>{ objct.id }</legend>
            <p>{`Nota: ${objct.nota}`}</p>    
            <p>{`"${objct.comment}"`}</p>        
          </fieldset>
        </div>
    ));
  }

  render() {
    const {
      products: { id, title, thumbnail, price, attributes, shipping  },
      evaluation: { comment, nota }, countTotal } = this.state;

    return (
      <div className="header">
        <nav className="search-bar">
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

        <div className="product-card-detail">

          <h1 data-testid="product-detail-name">{title}</h1>
          <img src={ thumbnail } alt={ title } />
          <p>{ `R$ ${parseFloat(price).toFixed(2)}` }</p>

          { shipping
            && <p id="frete" data-testid="free-shipping"><FcShipped size={ 40 } />&nbsp;Frete grátis</p>}

          <ul className="card-detail">
            {attributes.map((attribute) => (
              <li key={ attribute.id }>
                {attribute.name}
                :
                {attribute.value_name}
              </li>
            ))}
          </ul>

          <div className="product-info">
            <button
              type="button"
              id={ id }
              data-testid="product-detail-add-to-cart"
              onClick={ this.addProduct }
            >
              Adicionar ao carrinho
            </button>

            <div>
              <label id="textarea" htmlFor="evaluation">
                Deixe sua avaliação:
                <textarea
                  id="evaluation"
                  name="comment"
                  data-testid="product-detail-evaluation"
                  value={ comment }
                  onChange={ this.handleChangeComent }
                  placeholder="Comente aqui..."
                />
              </label>

              <div className="avaliation">
                <label id="inputNote" htmlFor="nota">
                  Nota:
                  <input
                    id="nota"
                    type="number"
                    min="1"
                    max="10"
                    name="nota"
                    value={ nota }
                    onChange={ this.handleChangeNota }
                  />
                </label>
                <button
                  type="button"
                  id={ id }
                  onClick={ this.addAvaliation }
                >
                  Avaliar
                </button>
              </div>
            </div>
            { this.getAvaliation(id) }
          </div>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
