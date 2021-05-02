import React, { PureComponent } from 'react';
import { Classes } from '@blueprintjs/core';
import c from 'classnames';

class TextSkeleton extends PureComponent {
  render() {
    const {className, length, type } = this.props;
    const placeHolder = '-'.repeat(length);

    return React.createElement(
      type,
      { className: c(Classes.SKELETON, className)},
      placeHolder,
    );
  }
}

class Skeleton {
  static Text = TextSkeleton;
}

export default Skeleton;