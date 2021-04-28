import _ from 'lodash';
import React, { Component } from 'react';
import queryString from 'query-string';
import Screen from 'components/Screen/Screen';
import WelcomeDialog from 'components/common/WelcomeDialog'

import './HomeScreen.scss';

const messages = {
  title:'Dakobed Bard Website'
}



export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    console.log("WHAT ")
  }

  componentDidMount() {
    // for now, always load

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

    console.log("asdsfa")
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
                <b>
                  Hrsdfg
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


export default HomeScreen;
