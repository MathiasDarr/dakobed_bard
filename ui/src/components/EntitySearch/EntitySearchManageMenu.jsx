import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AnchorButton, ButtonGroup, Classes, Tooltip } from '@blueprintjs/core';

import { DialogToggleButton } from 'components/Toolbar';

const messages = {
  dates: 'Date '
}


class EntitySearchManageMenu extends Component {
  constructor(props){
    super(props);
  }
  toggleDateFacet() {
    const { query, updateQuery } = this.props;
    const dateFacetIsOpen = true 
    let query = 'first';
    let newQuery;
    // if (dateFacetIsOpen) {
    //   newQuery = 
    // }
    updateQuery(newQuery)
  }
  render() {
    return(
      <ButtonGroup className={Classes.FIXED}> 
        <Tooltip content={}>
          <AnchorButton 
            icon="calendar"
            onClick={this}
          />
        </Tooltip>
      </ButtonGroup>
    )
  }
}