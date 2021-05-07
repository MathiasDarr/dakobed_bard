import React, { Component } from 'react';
import Screen from 'components/Screen/Screen'
import { DualPane} from 'components/common'


const messages = {
  side_pane_message: "Trip reports Side Pane",
  content_pane_message: "Trip reports Content Pane"
}

export class TripReportScreen extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
    <Screen
        title ={"TripReportScreen"}
        description={"Trip reports"}
    >

      <DualPane>
        <DualPane.SidePane>
          <>
            
            <h2>
            { messages.side_pane_message }
            </h2>
            sdfa
          </>
        </DualPane.SidePane>
        <DualPane.ContentPane>
          <h1>
            { messages.content_pane_message }
          </h1>

          <DualPane>
        <DualPane.SidePane>
          <>
            
            <h2>
            { "Inner Side Pane" }
            </h2>
            sdfa
          </>
        </DualPane.SidePane>
        <DualPane.ContentPane>
          <h1>
            { "Inner Dual Pane" }
          </h1>
        </DualPane.ContentPane>
      </DualPane>

        </DualPane.ContentPane>
      </DualPane>


    </Screen>
    )
  }
  

}

export default TripReportScreen;