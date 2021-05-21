import React from 'react';
import { Button } from '@blueprintjs/core'

class DialogToggleButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog(){
    this.setState(({ isOpen }) => ({ isOpen: !isOpen}))
  }
  render(){
    const { buttonProps, ButtonComponent = Button, children, Dialog, dialogprops } = this.props;
    
    return(
      <>
        <ButtonComponent onCLick={this.toggleDialog} {...buttonProps}> 
          {children}
        </ButtonComponent>
        <Dialog
          isOpen={this.state.isOpen}
          toggleDialog={this.toggleDialog}
          {...dialogprops}
        />
      </>
    ) 
  }
}

export default DialogToggleButton;