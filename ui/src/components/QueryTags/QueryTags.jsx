import React, { Component } from 'react';
import _ from  'lodash';

class QueryTags extends Component {
  constructor(props){
    super(props);
  }

  removeFilterValue(filter, value) {
    const { query, updateQuery } = this.props;
  }

  removeAllFilterValues(){
    const { query, updateQuery } = this.props;
    updateQuery(query.removeAllFilters());
  }

  render() {
    const { query } = this.props;
  }

  render(){
    const { query } = this.props;
    return (
      <div className="QueryTags">

      </div>
    )
  }
}