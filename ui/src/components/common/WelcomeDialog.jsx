import React, { Component } from 'react';
import FancyBorder from './FancyBorder'

export class WelcomeDialog extends Component {
  
  constructor(props) {
    super(props)
  }


  render() {
    // const appHomePage = metadata.pages.find(page => page.home);

    console.log("asdsfa")
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          Welcome
        </h1>
        <p className="Dialog-message">
          Thank you for visiting our spacecraft!
        </p>
      </FancyBorder>
    );
  }
}

export default WelcomeDialog