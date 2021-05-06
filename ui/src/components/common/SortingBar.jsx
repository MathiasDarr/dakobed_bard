import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alignment, Button, Intent, MenuItem } from '@blueprintjs/core';

import './SortingBar.scss';


const messages = {
  sort_created_at = "Creation Date"
}


class SortingBar extends React.Component {
  constructor(props){
    super(props);
    this.onSort = this.onSort.bind(this);
    this.toggleCreatedBy = this.toggleCreatedBy.bind(this);
  }

  renderOption = (option, { handleClick }) => (
    <MenuItem 
      key={option.field}
      onClick={handleClick}
      text={option.label}
    />
  )

  toggleCreatedBy() {
    const { role } = this.props;

  }


  render() {
    return (
      <div className="SortingBar">
        <div className="SortingBar__control">
          <Button 
            text="messages"
            minimal
            intent={Intent.PRIMARY}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const role = selectCurrentRole(state);
  return {
    role
  }
}

export default compose(
  connect(mapStateToProps)
)(SortingBar);