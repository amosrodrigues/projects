import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchField.css';

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { searchField } = this.state;
    const { onSearchText } = this.props;
    onSearchText(searchField);
  }

  render() {
    const { searchField } = this.state;
    return (
      <div className="search-field">
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>
        <input
          data-testid="query-input"
          type="text"
          name="searchField"
          value={ searchField }
          onChange={ this.handleChange }
          placeholder="Digite algum termo..."
        />
      </div>
    );
  }
}

SearchField.propTypes = {
  onSearchText: PropTypes.func.isRequired,
};

export default SearchField;
