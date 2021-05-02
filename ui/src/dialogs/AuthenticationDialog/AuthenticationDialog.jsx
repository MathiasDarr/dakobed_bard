import React, { Component } from 'react';
import { 
  Callout, Intent, Dialog, MenuDivider, Button,
} from '@blueprintjs/core';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { endpoint } from 'app/api';
import { showResponseToast } from 'app/toast';
import { PasswordAuthLogin, PasswordAuthSignup } from 'components/auth/PasswordAuth';
import {
  loginWithPassword as loginWithPasswordAction,
  loginWithTOken as loginWithTokenAction
} from 'actions/sessionActions';

import './AuthenticationDialog.scss'


const messages = {
  title: {
    id: 'signup.title',
    defaultMessage: 'Sign in'
  },
  registration_title: {
    id: 'signup.register',
    defaultMessage: 'Register'
  }
};

export class AuthenticationDialog extends Component {
  constructor(props){
    super(props);

    this.state = {
      submitted: false,
      firstSection: '', 
      secondSection: 'hide'
    };

    this.onLogin = this.onLogin.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onRegisterClock = this.onRegisterClick.bind(this);
    this.onSignInClick = this.onSignInClick.bind(this);
    this.onOAuthLogin = this.onOAuthLogin.bind(this);
  }

  onOAuthLogin(){
    const { nextPath, metadata: { auth } } = this.props;
    if (auth.oauth_uri){
      const nextPathEnc = encodeURIComponent(nextPath || '/');
      window.location.replace(`/api/2/sessions/oauth?next=${nextPathEnc}`);
    }
  }

  onSignup(data) {
    endpoint.post('/roles/code', data).then(() => {
      this.setState( {submitted: true });
    }).catch((e) => {
      showResponseToast(e.response);
    })
  }

  async onLogin(data) {
    const { nextPath, loginWithPassword } = this.props;
    try {
      await loginWithPassword(data.email, data.password)
      window.location.replace(nextPath || '/')
    } catch (e){
      showResponseToast(e.response)
    }
  }


  onRegisterClick(e){
    e.preventDefault();
    this.setState({ firstSection: 'hide', secondSection: ''});
  }

  onSignInClick(e){
    e.preventDefault();
    this.setState({ firstSection: '', secondSection: 'hide'})
  }




  render(){
    const {
      metadta, isOpen, toggleDialog
    } = this.props;
    const { auth } = metadta;
    const { submitted, firstSection, secondSection } = this.state;
    const passwordLogin = auth.password_login_uri;

    if(!isOpen){
      return null;
    }

    return (
      <Dialog 
        icon ="authentication"
        className="AuthenticaionScreen"
        isOpen={isOpen}
        onClose = {toggleDialog}
        title={firstSection === '' ? messages.title : messages.registration_title }
      >
        <div className="inner">
          <section className={firstSection}>
            {passwordLogin && <PasswordAuthLogin buttonClassName="signin-button" onSubmit={this.onLogin} /> }
            {passwordLogin && (
              <div className="link-box">
                <a key="oauth" href ="/" onClick={this.onRegisterClick}>
                  Don't have an account? Register!
                </a>
              </div>
            )}
          </section>
        </div>
      </Dialog>
    )
  }

}


export default AuthenticationDialog;