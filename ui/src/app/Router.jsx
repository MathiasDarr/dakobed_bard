import React, { Component, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import {fetchMetadata } from 'actions';
import { Spinner } from '@blueprintjs/core';

import Navbar from 'components/Navbar/Navbar';
import NotFoundScreen from 'screens/NotFoundScreen/NotFoundScreen';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import LogoutScreen from 'screens/LogoutScreen/LogoutScreen';
import ActivateScreen from 'screens/ActivateScreen/ActivateScreen';
import TodoScreen from 'screens/CollectionScreen/TodoScreen';
import EntityScreen from 'screens/EntityScreen/EntityScreen';
import OAuthScreen from 'screens/OAuthScreen/OAuthScreen';
import SearchScreen from 'screens/SearchScreen/SearchScreen'
import CollectionIndexScreen from 'screens/CollectionIndexScreen/CollectionIndexScreen';
import CollectionViews from 'components/Collections/CollectionViews'
import TripReportScreen from 'screens/TripReportScreen/TripReportScreen';
import CollectionScreen from 'screens/CollectionScreen/CollectionScreen'
import TripReportIndexScreen from 'screens/TripReportIndexScreen/TripReportIndexScreen';
import OutdoorsScreen from 'screens/OutdoorsScreen/OutdoorsScreen';

import ListScreen from 'screens/ListScreen/ListScreen';

import ProfileScreen from 'screens/ProfileScreen/ProfileScreen';

import DiagramScreen from 'screens/DiagramScreen/DiagramScreen';


import './Router.scss';
import { selectMetadata, selectSession } from 'selectors';


class Router extends Component {

  componentDidMount(){
    this.props.fetchMetadata()
  }

  componentDidUpdate() {
    this.fetchIfNeeded();
  }

  fetchIfNeeded(){
    const { metadata } = this.props;
    if (metadata.shouldLoad) {
      this.props.fetchMetadata();
    }
  }

  render() {
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
        <Navbar />
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/oauth" exact component={OAuthScreen} />
            <Route path="/logout" exact component={LogoutScreen} />




            <Route path="/activate/:code" exact component={ActivateScreen} />
            {/* 
            <Route path="/collections" exact component={CollectionScreen} /> */}

            <Route path="/collections/:collectionId" exact component={CollectionScreen} />



            <Route path="/collection_index" exact component={CollectionIndexScreen} />
            <Route path="/collection_views" exact component={CollectionViews} />
            <Route path="/entities" exact component={EntityScreen} />
            <Route path="/trip_reports/:collectionId" exact component={TripReportScreen} />
            <Route path="/trip_reports" exact component={TripReportIndexScreen} />

            <Route path="/outdoors" exact component={OutdoorsScreen} />
            <Route path="diagrams" exact component={DiagramScreen} />
            <Route path="/lists/:entitySetId" exact component={ListScreen} />


            <Route path="/search" exact component={SearchScreen} />
            <Route path="/" exact component={HomeScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapStateToProps = state => ({
  metadata: selectMetadata(state),
  session: selectSession(state)
});



export default connect(mapStateToProps, { fetchMetadata })(Router);

