import React, { Component, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import c from 'classnames';
import togglePreview from 'util/togglePreview'

import './Entity.scss';

class EntityLink extends PureComponent {
  constructor(props) {
    super(props);
  }

  // onClick(event) {
  //   const { entity, history, preview, profile = true} = this.props;
  //   if (preview) {
  //     event.preventDefault();
  //     togglePreview
  //   }
  // }
}

class Entity {
  static Link = withRouter(EntityLink);

}

export default Entity;