import _ from 'lodash';
import React, { Component } from 'react';
import queryString from 'query-string';


//import './HomeScreen.scss';

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
        <div>
          HOME SCREEN
        </div>

    );
  }
}
