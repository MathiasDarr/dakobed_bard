import React from 'react'
import { connect } from 'react-redux';
import { Button, Tooltip, Position, Intent } from '@blueprintjs/core';

import DocumentUploadDialog from 'dialogs/DocumentUploadDialog/DocumentUploadDialog';
import { selectSession } from 'selectors';


const messages = {
  login: "You must sign in to create a collection"
}

class DocumentUploadButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: true
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
        <DocumentUploadDialog
          isOpen={this.state.isOpen}
          toggleDialog={this.toggle}
        />
      </>
    )
  }
  
}

const mapStateToProps = state => ({session: selectSession(state)})

export default DocumentUploadButton; 