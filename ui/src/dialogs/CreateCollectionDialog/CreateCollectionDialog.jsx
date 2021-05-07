import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FormDialog from 'dialogs/common/FormDialog';

import {
  createCollection
} from 'actions';

const messages = {
  title: "Create Collection Dialog",
  save: "Save"
}

class CreateCollectionDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      collection: {
        label: ''
      },
      blocking: false
    }
    
  }

  async onSubmit(){
    console.log("SUBMITTED FORM");
  }

  onChangeLabel(){
      
  }

  render(){
    const { isOpen, toggleDialog } = this.props

    const disabled = false;
    return(
      <div>
        <FormDialog
          icon="briefcase"
          processing={true}
          className="CreateCollectionDialog"
          isOpen={isOpen}
          title={messages.title}
        >
          <div className="bp3-dialog-body">
            <label className="bp3-label" htmlFor="label" >
              <h2>{messages.title}</h2>
              <div className="bp3-input-group bp3-fill">
              <input 
                id="label"
                type="text"
                className="bp3-input"
                autoComplete="off"
                onChange={this.onChangeLabel}
                value={"COLLECTION LABEL"}
                />
              </div>
            </label>
          </div>
          <div className="bp3-dialog-footer">
            <div className="bp3-dialog-footer-actions">
              <Button 
                onClick={this.onSubmit}
                intent={Intent.PRIMARY}
                disabled={disabled}
                text={messages.save}
              />
            </div>
          </div>
        </FormDialog>
      </div>
    )
  }


}

export default CreateCollectionDialog;