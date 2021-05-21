import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectEntitiesResult } from 'selectors';

class EntitySelect extends Component {
  render(){
    const { buttonProps, noResultsText, onQueryChange, onSelect, result } = this.props;

    return(
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { query } = ownProps;

  return {
    result: selectEntitiesResult(state, query)
  }
}

export default connect(mapStateToProps)(EntitySelect);