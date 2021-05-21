import React, { PureComponent } from 'react';

import './TextLoading.scss';

const messages = {
  loading: "Loading"
}
export default class TextLoading extends PureComponent {
  render() {
    const { loading, children } = this.props;
    if (loading) {
      return (
        <span className="TextLoading">
          {messages.loading}
        </span>
      )
    }
    return children;
  }
}