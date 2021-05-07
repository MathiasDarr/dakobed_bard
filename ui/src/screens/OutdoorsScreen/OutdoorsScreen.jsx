import React, { Component } from 'react';
import Screen from 'components/Screen/Screen'
import { DualPane} from 'components/common'

import DocumentUploadButton from 'components/Toolbar/DocumentUploadButton';

import './OutdoorsScreen.scss'





export class OutdoorsScreen extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <Screen
      className="TripReportIndexScreen"
      title={"Collection Screen"} 
      >
        titile={"Outdoors Screen"}
      </Screen>
    )
  }
}

export default OutdoorsScreen;