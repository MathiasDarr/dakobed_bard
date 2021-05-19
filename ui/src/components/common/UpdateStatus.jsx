import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { Prompt, withRouter } from 'react-router';
import { Intent, Spinner, Tag } from '@blueprintjs/core';

const messages = {
  status_success: 'Saved',
  status_error: 'Error saving',
  status_in_progress: 'Saving',
  error_warning: 'There was an error saving you latest changes',
  in_progress_warning: 'Changes are still being saved, are you sure you want to leave?'
}

class UpdateStatus extends PureComponent {
  static SUCCESS = 'SUCCESS';
  static ERROR = 'ERROR';
  static IN_PROGRESS = 'IN_PROGRESS';

  getStatusValue() {
    switch (this.props.status) {
      case 'IN_PROGRESS':
        return ({
          text: messages.status_in_progress,
          intent: Intent.PRIMARY,
          icon: <Spinner size="16" intent={Intent.PRIMARY} />
        });
      case 'ERROR': 
        return ({
          text: messages.status_error,
          intent: Intent.DANGER,
          icon: 'error'
        });
      default:
        return ({
          text: messages.status_success,
          intent: Intent.SUCCESS,
          icon:"tick"
        })
    }
  }

  showPrompt(location) {
    const { pathname, hash } = window.location;
    return location.pathname !== pathname || location.hash !== hash
  }

  render(){
    const { status } = this.props;
    const { text, icon, intent } = this.getStatusValue();
    return(
      <>
        <Prompt
          when={status === 'IN_PROGRESS'}
          message={location => {
            if (this.showPrompt(location)) {
              return messages.in_progress_warning;
            }
          }}
        />
        <Prompt
          when={status === 'ERROR'}
          message={location => {
            if(this.showPrompt(location)) {
              return messages.error_warning;
            }
          }}
        />
        <Tag large minimal intent={intent} className="UpdateStatus" icon={icon}>
          {text}
        </Tag>
      </>
    )
  }
}

export default compose(
  withRouter
)(UpdateStatus);