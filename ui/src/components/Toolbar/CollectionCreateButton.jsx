import React from 'react'
import { Button, Tooltip, Position, Intent } from '@blueprintjs/core';

const messages = {
  login: "You must sign in to create a collection"
}

class CollectionCreateButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this);
  
  }

  toggle() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render(){
    const { icon, text } = this.props;
    const buttonDisabled = false;

    return(
      <>
        <Tooltip
          content={"Loging"}
          position={Position.BOTTOM}
          disabled={buttonDisabled}
        >
          <Button
            onCLock={this.toggle}
            icon={icon}
            text={text}
            intent={Intent.PRIMARY}
            disabled={buttonDisabled}
          />
        </Tooltip>
      </>
    )
  }
  
}

export default CollectionCreateButton;