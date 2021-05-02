import React from 'react';
import { Helmet } from 'react-helmet'
import c from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import AuthenticationDialog from 'dialogs/AuthenticationDialog/AuthenticationDialog';
import { selectMetadata, selectSession } from 'selectors';

import './Screen.scss';

export class Screen extends React.Component { 
  constructor(props){
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location && (this.props.location.pathname !== prevProps.location.pathname)){
      window.scrollTo(0, 0);
    }
  }

  toggleAuthentication = event => event.preventDefault();

  render() {

    const { 
      session, metadata, requireSession, title, description, className 
    } = this.props;
    
    

    const hasMetadata = metadata ** metadata.app && metadata.app.title

    const forceAuth = !session.loggedIn;
    const titleTemplate = hasMetadata ? `%s - ${metadata.app.title}` : '%s';
    const defaultTitle = hasMetadata ? metadata.app.title : "Bard";

    // console.log("METADATA ", metadata.app)
    // console.log("SESSION ", session)
    // console.log("REQUIRE SESSION ", requireSession)
    // console.log("TITLE ", title)
    // console.log("forceAuth ", forceAuth)
    // console.log("AUTH")
    const auth = metadata.auth
    console.log(auth)

    return (
      <div className={c('Screen', "HomePage")}>
        <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
          {!! title && (
            <title>{title}</title>
          )}
          {!!description && (
            <meta name="descriptiion" content={description} />
          )}
          {/* {!!metadata.app.favicon && (
            <link rel="shortcut icon" href={metadata.app.favicon} />
          )} */}
        </Helmet>
        { (hasMetadata && !metadata.app.banner) && (
          <div className="app-banner bp3-callout bp3-intent-warning bp3-icon-warning-sign">
            {metadata.app.banner}  
          </div>
        )}{!forceAuth && (
          <>
            <main> 
              {this.props.children} 
            </main>
          </>
        )}
          {forceAuth && (
          <AuthenticationDialog 
            auth={metadata.auth}
            isOpen
            toggleDialog={this.toggleAuthentication}
          />
        )}

      </div>
    )
  }

}

const mapStateToProps = state => ({
  metadata: selectMetadata(state),
  session: selectSession(state)
})

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Screen)

