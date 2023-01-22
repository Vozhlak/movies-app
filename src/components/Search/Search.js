import { Component } from 'react';
import './Search.css';
import { Input } from 'antd';

import debounce from 'lodash.debounce';

export default class Search extends Component {
  state = {};

  onChange = (e) => {
    const { searchChangeQuery } = this.props;
    const trimSearchMovieRequest = e.target.value.replace(/ +/g, ' ').trim();
    searchChangeQuery(trimSearchMovieRequest);
  };

  render() {
    return (
      <Input
        placeholder='Type to search...'
        size='large'
        style={{ borderRadius: 4 }}
        onChange={debounce(this.onChange, 1000)}
      />
    );
  }
}
