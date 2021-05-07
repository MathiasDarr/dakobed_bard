import React, { Component } from 'react';
import Screen from 'components/Screen/Screen'
import { DualPane} from 'components/common'

import './OutdoorsScreen.scss'



export class OutdoorsScreen extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <Screen>
        titile={"Outdoors Screen"}
      </Screen>
    )
  }
}

export default OutdoorsScreen;