import React from 'react'
import SinglePane from 'components/common/SinglePane';
import Screen from 'components/Screen/Screen';
import ErrorSection from 'components/common/ErrorSection';


function ErrorScreen(props) {
  const { title = '', error } = this.props;
  const screenTitle = error === undefined ? title: error.message;
  return (
    <Screen title={screenTitle}>
      <SinglePane>
        {/* <ErrorSection {...props} /> */}
      </SinglePane>
    </Screen>
  )
}

export default ErrorScreen