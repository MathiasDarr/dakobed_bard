import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Boundary, Button, ButtonGroup, ControlGroup, Divider, OverflowList, Popover } from '@blueprintjs/core';
import c from 'classnames';
import { ResultText, SearchBox, UpdateStatus } from 'components/common';
import { selectEntitiesResult } from 'selectors'

import './EntityActionBar.scss';

class EntityActionBar extends Component {
  overflowListRenderer = (overflowItems) => {
    const menuContent = overflowItems.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>);
    return (
      <Popover
        content={<ButtonGroup vertical minimal alignText="left">{menuContent}</ButtonGroup>}
        position="bottom-left"
        minimal
        popoverClassName="EntityActionBar__overflow-list"
        boundary="viewport"
      >
        <Button icon="caret-down"/>
      </Popover>
    )
  }
 
 
 
  render(){
    return(
      <div className="EntityActionBar">
        Entity Action Bar
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

export default connect(mapStateToProps)(EntityActionBar);