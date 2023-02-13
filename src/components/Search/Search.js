import { Component } from 'react';
import './Search.css';
import { Input } from 'antd';

import debounce from 'lodash.debounce';

export default class Search extends Component {
  state = {};

  onChangeSearch = (e) => {
    const { searchChangeQuery } = this.props;
    const trimSearchMovieRequest = e.target.value.replace(/ +/g, ' ').trim();
    searchChangeQuery(trimSearchMovieRequest);
  };

  render() {
    const { searchValue } = this.props;
    return (
      <Input
        placeholder='Type to search...'
        size='large'
        style={{ borderRadius: 4 }}
        defaultValue={searchValue}
        onChange={debounce(this.onChangeSearch, 1000)}
      />
    );
  }
}
