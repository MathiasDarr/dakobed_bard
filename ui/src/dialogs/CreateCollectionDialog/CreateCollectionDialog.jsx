import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FormDialog from 'dialogs/common/FormDialog';

import { createCollection } from 'actions';
import { showWarningToast } from 'app/toast';



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
    const { history, createCollection, toggleDialog } = this.props;
    const { collection } = this.state;
    this.seteState({ blocking: true });
    try {
      const response = await createCollection(collection);
    } catch (e) {
      this.setState({ blocking: false })
    }
  }

  onChangeLabel(target){
    // const { collection } = this.state;
    // collection.label = target.value;
    // this.setState({ collection });      
  }
  checkValid(){
    // const { collection } = this.state;
    // return collection.label.trim().length >= 3;
  }


  render(){
    const { isOpen, toggleDialog } = this.props;
    const { collection, blocking } = this.state;
    const disabled = blocking || !this.checkValid();
    return(
      <div>
        <FormDialog
          icon="briefcase"
          processing={true}
          className="CreateCollectionDialog"
          isOpen={isOpen}
          title={messages.title}
          onClose={toggleDialog}
          enforceFocus={false}
          autoFocus={false}
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


CreateCollectionDialog = withRouter(CreateCollectionDialog);
export default connect(null, { CreateCollectionDialog })(CreateCollectionDialog);