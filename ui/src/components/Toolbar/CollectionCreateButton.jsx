import React from 'react'
import { connect } from 'react-redux';
import { Button, Tooltip, Position, Intent } from '@blueprintjs/core';

import CreateCollectionDialog from 'dialogs/CreateCollectionDialog/CreateCollectionDialog';
import { selectSession } from 'selectors';

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
    console.log("BUTTON GETTING TOGGLED")
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
          disabled={!buttonDisabled}
        >
          <Button
            onClick={this.toggle}
            icon={icon}
            text={text}
            intent={Intent.PRIMARY}
            disabled={buttonDisabled}
          />
        </Tooltip>
        <CreateCollectionDialog
          isOpen={this.state.isOpen}
          toggleDialog={this.toggle}

        />
      </>
    )
  }
  
}

const mapStateToProps = state => ({session: selectSession(state)})

CollectionCreateButton = connect(mapStateToProps)(CollectionCreateButton)
export default CollectionCreateButton; 