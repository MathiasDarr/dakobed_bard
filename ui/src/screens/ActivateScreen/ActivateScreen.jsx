import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Screen from 'components/Screen/Screen';
// import { PasswordAuthActivate } from 'components/auth/PassworthAuth';


export class ActivateScreen extends Component {
  constructor(props){
    super(props);
    this.onActivate = this.onActivate.bind(this);
  }

  onActivate(data){

  }

  render(){
    return(
      <Screen>
        <div className="smal-screen-outer">
          <div className="small-screen-inner">
            <section className="small-screen">
              <h1>
                Activate your account
                {/* <PasswordAuthActivate className="bp3-card" onSubmit={this.onActivate} /> */}
              </h1>
            </section>
          </div>
        </div>
      </Screen>
    )
  }

}

export default ActivateScreen;