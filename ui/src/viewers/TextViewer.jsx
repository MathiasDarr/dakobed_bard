import React, { PureComponent } from 'react';
import { Pre } from '@blueprintjs/core';
import { Skeleton } from 'components/common';

import './TextViewer.scss';
class TextViewer extends PureComponent {
  render() {
    const { document, dir, noStyle } = this.props;
    let text;
    if (document.isPending) {
      text = <Skeleton.Text type="pre" length={4000} />
    } else {
      const direction = isLangRtl(lang) ? "rtl": "";
      text = <Pre style={{ direction }}>{bodyText}</Pre>
    }
    return noStyle ? text: (
      <div className="outer">
        <div className="inner TextViewer" dir={dir}>
          {text}
        </div>
      </div>
    )
  }
}

export default TextViewer;