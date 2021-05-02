import React from 'react';
import { Button } from '@blueprintjs/core';

class DialogToggleButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen : false
    };
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  toggleDialog() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render(){
    return (
      <>
        <div>
        Hello
        </div>
      </>
    )
  }
}


export default DialogToggleButton;