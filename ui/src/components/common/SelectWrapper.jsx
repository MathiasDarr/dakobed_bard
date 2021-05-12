import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Position } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';


class SelectWrapper extends Component {
  render(){
    const { ...rest } = this.props;
    return (
      <Select
      {...rest}
      popoverProps={{
        ...rest.popoverProps,
        position: Position.BOTTOM_LEFT
      }}
      />
    )
  }
}

// const SelectWrapper = ({locale, ...rest }) => {
//   <Select
//     {...rest}
//     popoverProps={{
//       ...rest.popoverProps,
//       position: Position.BOTTOM_LEFT
//     }}
//   />
// }





export default SelectWrapper;