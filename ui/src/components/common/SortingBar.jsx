import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Alignment, Button, Intent, MenuItem } from '@blueprintjs/core';
import SelectWrapper from 'components/common/SelectWrapper';
import { selectCurrentRole } from 'selectors';
import './SortingBar.scss';


const messages = {
  sort_created_at: "Creation Date",
  sort_updated_at: "Update date",
  show_all: 'All'
}


class SortingBar extends React.Component {
  constructor(props){
    super(props);
    this.onSort = this.onSort.bind(this);
  }

  renderOption = (option, { handleClick }) => (
    <MenuItem 
      key={option.field}
      onClick={handleClick}
      text={option.label}
    />
  )

  onSort({ field, direction }) {
    const { query, sortDirection, sortField, updateQuery } = this.props;
    const newQuery = query.sortBy(field || sortField, direction || sortDirection);
    updateQuery(newQuery);
  }

  toggleCreatedBy(){
    console.log("TOGGLE CREATED BY ")
  }

  render() {
    const { sortField, sortDirection } = this.props;
    const showCreatedByFilter = true;
    return (
      <div className="SortingBar">
        {showCreatedByFilter && (
          <div className="SortingBar__item">
            <span className="SortingBar__label">
              {"Show:"}
            </span>
            <div className="SortingBar__control">
              <Button
                text={"CREATED BY TOGGLE"}
                onClick={this.toggleCreatedBy}
                minimal
                intent={Intent.PRIMARY}
              />
            </div>
          </div>
        )}
        <div className="SortingBar__item">
          <span className="SortingBar__label" >
            {messages.sortBy}
          </span>
          <div className="SortingBar__control">

              <Button 
                alignText={Alignment.LEFT}
                text={"SortingBar"}
                rightIcon="caret-down"
              />
          </div>
        </div>
        
        
        <div className="SprtingBar__item">
          <span className="Sorting__label" >
            {messages.sortDirection}

          </span>
          <div className="SortingBar__control">
            <Button 
              icon={sortDirection === 'desc' ? 'arrow-down' : 'arrow-up'}
              minimal
              intent={Intent.PRIMARY}
            />
          </div>
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