import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Spinner } from '@blueprintjs/core';

import NotFoundScreen from 'screens/NotFoundScreen/NotFoundScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';



class Router extends Component {

  render() {
    console.log("hda")
    const { metadata, session } = this.props;
    const isLoaded = metadata && metadata.app && session;

    const Loading = (
      <div className="RouterLoading">
        <div className="spinner"><Spinner className="bp3-large" /></div>
      </div>
    );
    if (!isLoaded) {
      return Loading;
    }

    return (
      <>
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = state => ({

});

export default Router

// export default connect(mapStateToProps, { fetchMetadata })(Router);
