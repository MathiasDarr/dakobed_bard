import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alignment, Button, Navbar as Bp3Navbar } from '@blueprintjs/core'
import c from 'classnames'

import {compose} from 'redux'
import {connect} from 'react-redux'

import { withRouter } from 'react-router';

import AuthButtons from 'components/AuthButtons/AuthButtons';
import { SearchBox } from 'components/common/SearchBox'

import './Navbar.scss'


const messages = {
  datasets: 'Datasets',
  trip_reports: 'Trip Reports',
  music: 'Music',
  writing: 'Writing',
  feedback: 'Send Feedback'
}

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
                    {messages.datasets}
                  </Button>
                </Link>
              
                <Link to="/" >
                  <Button icon="database" className="Navbar_collections-button bp3-minimal">
                    {messages.trip_reports}
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