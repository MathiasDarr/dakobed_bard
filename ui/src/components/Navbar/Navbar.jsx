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

import './Navbar.scss'
import { entitiesQuery } from 'queries';
import { selectMetadata, selectSession } from 'selectors';


const messages = {
  datasets: 'Datasets',
  home_page:'Home',
  collections: 'Collections',
  music: 'Music',
  writing: 'Writing',
  feedback: 'Send Feedback',
  placeholder: 'Search Placeholder',
  index: 'Indices'
}

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.navbarRef = React.createRef()
    this.state = {
      mobileSearchOpen: false,
      advancedSearchOpen: false,
    }
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

  render(){
    const {metadata, session, query, result, isHomepage } = this.props
    const { advancedSearchOpen, mobileSearchOpen } = this.state;
    
    const queryText = query?.getString('q')

    return(
      <>
        <div className="Navbar" ref={this.navbarRef}>
          <Bp3Navbar id="Navbar" className="bp3-dark" >
            
            <Bp3Navbar.Group align={Alignment.LEFT}  className={c('Navbar__left-group')}>
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
                </div>
              </div>
            </Bp3Navbar.Group>

            <Bp3Navbar.Group align={Alignment.RIGHT} className={c('Navbar__right-group')}>
              <>
                <Link to="/">
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    {messages.home_page}
                  </Button>
                </Link>
              
                <Link to="/collections" >
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    {messages.collections}
                  </Button>
                </Link>

                <Link to="/collection_index" >
                  <Button icon="music" className="Navbar_collections-button bp3-minimal">
                    {messages.index}
                  </Button>
                </Link>


                <Link to="/logout" >
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    Logout
                  </Button>
                </Link>



                <Button icon="comment" className="Navbar__collections-button bp3-minimal">
                  {messages.feedback}
                </Button>

              </>

              <Bp3Navbar.Divider className={c({'mobile-hidden': mobileSearchOpen })} />
              <div className={c({'mobile-hidden':mobileSearchOpen})} >
                <AuthButtons className={c({hide:mobileSearchOpen})} />
              </div>
            </Bp3Navbar.Group>
          </Bp3Navbar>
        </div>
        
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