import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Button, Classes, Drawer, FormGroup, Intent, Position, TagInput } from '@blueprintjs/core';

import { FIELDS, composeQueryText, parseQueryText } from 'components/AdvancedSearch/util';
import Query from 'app/Query';

import './AdvancedSearch.scss';

const messages = {
  title: 'Advanced Search'
}


class AdvancedSearch extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      all: [],
      exact: [],
      none: [],
      must: [],
      variants: [],
      proximity: [],
      showSearchTips: false
    }
  }

  renderField({ key }) {
    const values = this.state[key];
    // if (key == 'proximity' || key == 'variants')
  }
  render(){
    const { isOpen, navbarRef } = this.props;
    const { showSearchTips } = this.state;
    return(
      <div className="AdvancedSearch" ref={this.ref}>
        <Drawer
          isOpen={isOpen}
        >
          <div className={Classes.DIALOG_BODY} >
            <form>
            {FIELDS.map(this.renderField)}
            </form>
          </div>
        </Drawer>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const query = Query.fromLocation('entities', location, {}, '');
  return { query };
}

export default AdvancedSearch;

// export default compose(
//   withRouter,
//   connect(mapStateToProps)
// )(AdvancedSearch)


