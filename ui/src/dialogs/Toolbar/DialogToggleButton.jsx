import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';

class DialogToggleButton extends Component {
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

    const { buttoProps, ButtonComponent = Button, children, Dialog, dialogProps } = this.props

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