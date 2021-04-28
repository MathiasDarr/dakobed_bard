import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alignment, Button, Navbar as Bp3Navbar } from '@blueprintjs/core'
import c from 'classnames'

import {compose} from 'redux'
import {connect} from 'react-redux'

import { withRouter } from 'react-router';


import { SearchBox } from 'components/common/SearchBox'

import './Navbar.scss'


export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.navbarRef = React.createRef()
    this.state = {
      mobileSearchOpen: false,
      advancedSearchOpen: false,
    }
  
  }
  render(){
    const {metadata} = this.props
    const { advancedSearchOpen, mobileSearchOpen } = this.state;
    const title = "Bard Home"
    return(
      <>
        <div className="Navbar" ref={this.navbarRef}>
          <Bp3Navbar id="Navbar" className="bp3-dark" >
            
            <Bp3Navbar.Group align={Alignment.LEFT}  className={c('Navbar__left-group')}>
              <Link to="/" className="Navbar__home-link">
                <img src={process.env.PUBLIC_URL + '/static/gp.JPG'} alt={title} />
              </Link>
            </Bp3Navbar.Group>
            
            <Bp3Navbar.Group align={Alignment.CENTER} className={c('Navbar__middle-group')}>
              <div className="Navbar__search-container">
                <div className="Navbar__search-container__content">
                  <div className="Navbar__search-container__searchbar">
                    <SearchBox 

                    />
                  </div>
                </div>
              </div>
            </Bp3Navbar.Group>

            <Bp3Navbar.Group align={Alignment.RIGHT} className={c('Navbar__right-group')}>
              <>
                <Link to="/datasets">
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    Datasets
                  </Button>
                </Link>
              
                <Link to="/" >
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    Trip Reports
                  </Button>
                </Link>
              </>

              <Bp3Navbar.Divider className={c({'mobile-hidden': mobileSearchOpen })} />





            </Bp3Navbar.Group>
          </Bp3Navbar>
        </div>
        Navbar
      </>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const {location} = ownProps;
  return({
    isHomepage: location.pathname === '/'
  });
};

export default compose(
  withRouter, 
  connect(mapStateToProps)
)(Navbar)

// export default Navbar