import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Spinner } from '@blueprintjs/core';

import Navbar from 'components/Navbar/Navbar';
import NotFoundScreen from 'screens/NotFoundScreen/NotFoundScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import CollectionScreen from 'screens/CollectionScreen/CollectionScreen';
import EntityScreen from 'screens/EntityScreen/EntityScreen';

import './Router.scss';


class Router extends Component {

  render() {
    console.log("hda")
    const { metadata, session } = this.props;
    // const isLoaded = metadata && metadata.app && session;

    const Loading = (
      <div className="RouterLoading">
        adf 
        <div className="spinner"><Spinner className="bp3-large" /></div>
      </div>
    );
    // if (!isLoaded) {
    //   return Loading;
    // }

    return (
      <>
        <Navbar />
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/datasets" exact component={CollectionScreen} />
            <Route path="/entities" exact component={EntityScreen} />
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


{/* <Suspense fallback={Loading}>
<Switch>

  <Route path="/datasets" exact component={CollectionScreen} />
  <Route path="/entities" exact component={EntityScreen} />
  <Route component={NotFoundScreen} />

</Switch>
</Suspense> */}