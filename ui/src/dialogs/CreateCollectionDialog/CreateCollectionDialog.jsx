import React, { Component } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import FormDialog from 'dialogs/common/FormDialog';
import { createCollection } from 'actions';
import { showWarningToast } from 'app/toast';
import getCollectionLink from 'util/getCollectionLink';


const messages = {
  title: "Create Collection Dialog",
  save: "Save"
}

class CreateCollectionDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      collection: {
        label: 'Initial Label',
        summary: '',
        casefile: true
      },
      blocking: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
  }

  async onSubmit(){
    const { history, createCollection, toggleDialog } = this.props;
    let preventRedirect = false;
    console.log("PREVENT REDIRECT ", preventRedirect)
    const { collection } = this.state;
    
    this.setState({ blocking: true });
    try {
      const response = await createCollection(collection);
      console.log("THE RESPONSE LOOKS LIKE ", response.data.collection_id)
      this.setState({ blocking: false });
      
      this.collection_id = response.data;
      
      if(preventRedirect) {
        toggleDialog(response.data);
      } else {
        history.push(`/trip_reports/${response.data.collection_id}`)
      }

      toggleDialog()
    }catch(e) {
      showWarningToast(e.message);
      // this.setState({ blocking: false });
    }

  }

  onChangeLabel({ target }){
    const { collection } = this.state;
    collection.label = target.value;
    this.setState({ collection: {label: target.value} });      
  }

  checkValid(){
    // const { collection } = this.state;
    // return collection.label.trim().length >= 3;
  }


  render(){
    const { isOpen, toggleDialog } = this.props;
    const { collection, blocking } = this.state;
    // const disabled = blocking || !this.checkValid();
    const disabled = false;
    return(
      <div>
        <FormDialog
          icon="briefcase"
          processing={blocking}
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
                value={collection.label}
                />
              </div>
            </label>


          {collection.label}

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
export default connect(null, { createCollection })(CreateCollectionDialog);