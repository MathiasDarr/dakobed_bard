import _ from 'lodash';
import React, { Component } from 'react';
import queryString from 'query-string';
import Screen from 'components/Screen/Screen';
import WelcomeDialog from 'components/common/WelcomeDialog'

import { compose } from 'redux';
import { connect } from 'react-redux';


import { fetchStatistics } from 'actions/index';
import { Statistics } from 'components/common';
import './HomeScreen.scss';
import { selectStatistics, selectMetadata } from 'selectors';

const messages = {
  title:'Dakobed Bard Website'
}



export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // for now, always load
    //this.props.fetchStatistics()

  }

  onSubmit(queryText) {
    const { history } = this.props;
    history.push({
      pathname: '/search',
      search: queryString.stringify({
        q: queryText,
      }),
    });
  }

  render() {

    // const appHomePage = metadata.pages.find(page => page.home);
    return (
      <Screen
        title= {messages.title} 
      >
        <div className = "HomeScreen">
          <section className="Homescreen__section title-section">
            <h1 className="Homescreen_app-title">
              {messages.title}
            </h1>
            
            
            <div className="HomeScreen__thirds">
              <div>

                <Statistics 
                  styleType="dark"
                  itemLink={value=>({
                    pathname:'search'
                  })}
                />


                <b>
                  Hrsdfgf
                </b>
                <div className ="HomeScreen__contact">
                  Helaf adf 
                </div>
              daf 

              </div>
            </div>
          </section>
        </div>
      </Screen>
    );
  }
}


const mapStateToProps = (state) => ({
  statistics: selectStatistics(state),
  metadata: selectMetadata(state)
})

const mapDispatchToProps = {
  fetchStatistics
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(HomeScreen);
