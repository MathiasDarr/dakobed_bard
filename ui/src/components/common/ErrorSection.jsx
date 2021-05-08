import React, { PureComponent } from 'react';

import { connect } from 'react-redux';
import { NonIdealState } from '@blueprintjs/core'
import AuthenticationDialog from 'dialogs/AuthenticationDialog/AuthenticationDialog';


import { selectSession, selectMetadata } from 'selectors';


export class ErrorSection extends PureComponent {
  constructor(props){
    super(props);
    this.state = { isOpen: false };
  }

  render(){
    return(
      <>
        {/* <AuthenticationDialog
          auth={metadata.auth}
          nextPath={window.location.href}
          isOpen={isOpen}
          toggleDialog={this.onSignIn}
        />
        <div className="ErrorSection">
          <div className="inner-div">
            <NonIdealState
              icon={icon}
              title={message}
              description={description}
            />
          </div>
        </div> */}
      </>
    )
  }
}


const mapStateToProps = state => ({
  metadata: selectMetadata(state),
  session: selectSession(state)
})

export default connect(mapStateToProps)(ErrorSection);