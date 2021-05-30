import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string' 
import { Alignment, Button, Navbar as Bp3Navbar } from '@blueprintjs/core'
import c from 'classnames'
import {compose} from 'redux'
import {connect} from 'react-redux'

import { withRouter } from 'react-router';

import AuthButtons from 'components/AuthButtons/AuthButtons';
import { SearchBox } from 'components/common/SearchBox'
import { entitiesQuery } from 'queries';
import { selectMetadata, selectSession } from 'selectors';
import  AdvancedSearch from 'components/AdvancedSearch/AdvancedSearch';

import './Navbar.scss'


const messages = {
  collections: 'Collections',
  feedback: 'Send Feedback',
  placeholder: 'Search Placeholder',
  index: 'Indices',
  outdoors: 'Outdoors',
  trip_reports: 'Trip Reports'
}

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.navbarRef = React.createRef()
    this.state = {
      mobileSearchOpen: false,
      advancedSearchOpen: false,
    }

    this.onToggleAdvancedSearch = this.onToggleAdvancedSearch.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.navbarRef = React.createRef();
  }

  onSearchSubmit(queryText) {
    console.log("THE PROPS LOOK LIKE", this.props)
    // const { history, query } = this.props;
    // let search = queryString.stringify({ q: queryText });
    // if (query) {
    //   const newQuery = query.set('q',queryText);
    //   search = newQuery.toLocation();
    // }
    // history.push({
    //   pathname: '/search',
    //   search
    // });

  }

  onToggleAdvancedSearch(){
    this.setState(({ advancedSearchOpen }) => ({ advancedSearchOpen: !advancedSearchOpen }));
  }

  render(){
    const {metadata, session, query, result, isHomepage } = this.props
    const { advancedSearchOpen, mobileSearchOpen } = this.state;
    
    const queryText = query?.getString('q')

    return(
      <>
        <div className="Navbar" ref={this.navbarRef}>
          <Bp3Navbar id="Navbar" className="bp3-dark" >
            
            <Bp3Navbar.Group align={Alignment.LEFT}  className={c('Navbar__left-group')}>
              <Link to="/" className="Navrbar__home-link">
                <span className="Navbar__home-link__text"> {"Dakobed Bard   "}</span>
              </Link>
            </Bp3Navbar.Group>
            
            <Bp3Navbar.Group align={Alignment.CENTER} className={c('Navbar__middle-group')}>
              <div className="Navbar__search-container">
                <div className="Navbar__search-container__content">
                  <div className="Navbar__search-container__searchbar">
                    <SearchBox 
                      onSearch={this.onSearchSubmit}
                      query={query}
                      placeholder={messages.placeholder}
                    />
                  </div>
                  <Button 
                    className="Navbar__search-container__search-tips bp3-fixed"
                    icon="settings"
                    minimal
                    onClick={this.onToggleAdvancedSearch}
                  />
                </div>
              </div>
            </Bp3Navbar.Group>

            <Bp3Navbar.Group align={Alignment.RIGHT} className={c('Navbar__right-group')}>
              <>
                <Link to="/trip_reports">
                  <Button icon="camera" className="Navbar_collections-button bp3-minimal">
                    {"TripReportIndexScreen"}
                  </Button>
                </Link>


                <Link to="/trip_reports/2">
                  <Button icon="camera" className="Navbar_collections-button bp3-minimal">
                    {"TripReportScreen"}
                  </Button>
                </Link>


                {/* <Link to="/outdoors">
                  <Button icon="mountain" className="Navbar_collections-button bp3-minimal">
                    {messages.outdoors}
                  </Button>
                </Link> */}



                <Link to="/collections/2" >
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    {"CollectionScreen"}
                  </Button>
                </Link>

                <Link to="/collection_index" >
                  <Button icon="music" className="Navbar_collections-button bp3-minimal">
                    {"CollectionIndex"}
                  </Button>
                </Link>            
              </>

              <Bp3Navbar.Divider className={c({'mobile-hidden': mobileSearchOpen })} />
              <div className={c({'mobile-hidden':mobileSearchOpen})} >
                <AuthButtons className={c({hide:mobileSearchOpen})} />
              </div>
            </Bp3Navbar.Group>
          </Bp3Navbar>
        </div>

        <AdvancedSearch
          isOpen={advancedSearchOpen}
          onToggle={this.onToggleAdvancedSearch}
          navbarRer={this.navbarRef}
        />
      </>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const query = entitiesQuery(location);
  return({
    query,
    isHomepage: location.pathname === '/',
    metadata: selectMetadata(state),
    session: selectSession(state)
  });
};

export default compose(
  withRouter, 
  connect(mapStateToProps)
)(Navbar)

// export default Navbar