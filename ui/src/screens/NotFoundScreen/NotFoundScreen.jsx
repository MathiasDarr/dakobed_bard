import React, { PureComponent } from 'react';
import { injectIntl, defineMessages } from 'react-intl';


const messages = defineMessages({
  not_found: {
    id: 'error.screen.not_found',
    defaultMessage: 'The requested page could not be found.',
  },
});


export class NotFoundScreen extends PureComponent {
  render() {
    console.log("asdsfa")
    return (<div>Error</div>);
  }
}
export default injectIntl(NotFoundScreen);
