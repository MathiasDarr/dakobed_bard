import React, { Component } from 'react';
import { Intent, Button } from '@blueprintjs/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { showErrorToast } from 'app/toast';
import FormDialog from 'dialogs/common/FormDialog';

const messages = {
  title: 'New Folder',
  save: 'Create',
  untitled: 'Folder title',
  error: 'There was error creating the folder'
}

export class DocumentFolderDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      blocking: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  onChangeTitle(event){
    this.setState({ title: event.target.value })
  }

  async onSubmit(){
    const {
      collection, parent, history 
    } = this.props;
    const { title } = this.state;
    this.setState({ blocking: true });
    try {
      const metadata = {
        file_name: title,
        foreign_id: title
      }
    } catch (e) {
      showErrorToast(messages.error);
      this.setState({ blocking: false });
    }
  }

  render() {
    const { toggleDialog, isOpen } = this.props;
    // const isOpen = false;
    const { title, blocking } = this.state;
    
    return (
      <FormDialog
        processing={blocking}
        icon="folder-new"
        className="DocumentFolderDialog"
        isOpen={isOpen}
        title={messages.title}
        onClose={toggleDialog}
      >
        <div className="bp3-dialog-body">
          <div className="bp3-form-group">
            <div className="bp3-input-group bp3-large bp3-fill">
              <input
                id="label"
                type="text"
                className="bp3-input"
                autoComplete="off"
                placeholder={messages.untitled}
                onChange={this.onChangeTitle}
                value={title}
              />
            </div>
          </div>
        </div>
        <div className="bp3-dialog-footer">
          <div className="bp3-dialog-footer-actions">
            <Button 
              type="submit"
              disabled={blocking}
              intent={Intent.PRIMARY}
              text={messages.save}
            />
          </div>
        </div>
      </FormDialog>
    )
  }
}

const mapDispatchToProps = {};
export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(DocumentFolderDialog);