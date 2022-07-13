/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import { BiCartAlt } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { FcHome } from 'react-icons/fc';
import { getProductsFromCategoryAndQuery } from '../services/api';
import CategoriesList from './CategoriesList';
import SearchField from './SearchField';
import ProductList from './ProductList';
import './home.css';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      searchText: undefined,
      categoryId: undefined,
      products: [],
      totalCount: undefined,
    };

    this.onSearchText = this.onSearchText.bind(this);
    this.onCategoryId = this.onCategoryId.bind(this);
    this.getProductsList = this.getProductsList.bind(this);
    this.onUpdateCount = this.onUpdateCount.bind(this);
  }

  componentDidMount() {
    const products = localStorage.getItem('product');
    const productsList = localStorage.getItem('productsList');
    const avaliation = localStorage.getItem('avaliation');

    if (products === null && productsList === null && avaliation === null) {
      localStorage.setItem('product', JSON.stringify([]));
      localStorage.setItem('productsList', JSON.stringify([]));
      localStorage.setItem('avaliation', JSON.stringify([]));
    }
    this.onUpdateCount();
  }

  onSearchText(searchField) {
    this.setState({ searchText: searchField }, this.getProductsList);
  }

  onCategoryId({ target }) {
    const { value } = target;
    this.setState(
      { categoryId: value, searchText: undefined },
      this.getProductsList,
    );
  }

  onUpdateCount() {
    const product = localStorage.getItem('product');
    const list = JSON.parse(product);

    this.setState({
      totalCount: list.reduce((acc, { count }) => {
        acc += count;
        return acc;
      }, 0),
    });
  }

  async getProductsList() {
    const { categoryId, searchText } = this.state;
    const product = await getProductsFromCategoryAndQuery(
      categoryId,
      searchText,
    );
    const { results } = product;
    this.setState({ products: results });

    const productsList = await localStorage.getItem('productsList');
    const listGet = JSON.parse(productsList);

    if (listGet.length === 0) {
      localStorage.setItem('productsList', JSON.stringify(results));
    }

    if (listGet.length > 0) {
      localStorage.setItem(
        'productsList',
        JSON.stringify([...results, ...listGet]),
      );
    }
  }

  renderProducts(products) {
    if (products.length <= 0) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
  }

  render() {
    const { products, searchText, totalCount } = this.state;
    return (
      <div className="container-home">
        <div className="container-serach">
          <div className="icom-home">
            <a
              className="icom-home"
              href="https://github.com/Amos-Rodrigues-Dev/frontend-online-store">
              <FaGithub size={50} />
            </a>
            <a className="icom-home" href="https://amosrodrigues-dev.web.app/">
              <FcHome size={60} />
            </a>
          </div>
          <SearchField onSearchText={this.onSearchText} />
          <div className="cart">
            <Link data-testid="shopping-cart-button" to="/cart">
              <BiCartAlt size={50} />
            </Link>
            <div>
              <p data-testid="shopping-cart-size">{totalCount}</p>
            </div>
          </div>
        </div>
        <div>
          <CategoriesList onCategoryId={this.onCategoryId} />
        </div>
        <div className="container-list">
          <ProductList
            products={products}
            searchText={searchText}
            onUpdateCount={this.onUpdateCount}
          />
        </div>
        <div className="container-msg">{this.renderProducts(products)}</div>
      </div>
    );
  }
}
