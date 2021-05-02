import React from 'react';
import { Helmet } from 'react-helmet'
import c from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux';

import { withRouter } from 'react-router'
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
      session, metadata, requireSession, title, className 
    } = this.props;
    

    // const hasMetadata = metadata && metadata.app.title;
    // const forceAuth = requireSession && !session.loggedIn;
    // const titleTemplate = hasMetadata ? `%s - ${metadata.app.title}` : '%s';
    // const defaultTitle = hasMetadata ? metadata.app.title : "Cache";

    console.log("THE PROPS LOOK LIKE ", this.props.children)

    return (
      <div className={c('Screen', "HomePage")}>
        <>
          <main> 
            {this.props.children} 
          </main>
        </>

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

