import React, { Component } from 'react';

export class FancyBorder extends Component {

  constructor(props) {
    super(props)
  }
  render() {

    // const appHomePage = metadata.pages.find(page => page.home);

    console.log("asdsfa " + this.props.color)
    return (
      <div className={'FancyBorder FancyBorder-' + this.props.color}>
        {this.props.children}
      </div>
    );
  }

}

export default FancyBorder