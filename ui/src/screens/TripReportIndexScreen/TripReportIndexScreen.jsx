import React, { Component } from 'react';

import Screen from 'components/Screen/Screen';
import Dashboard from 'components/Dashboard/Dashboard';
import CollectionIndex from 'components/CollectionIndex/CollectionIndex';
import CollectionCreateButton from 'components/Toolbar/CollectionCreateButton'


const messages = {
  title:"Trip Reports Index",
  subheading: "Collections let you upload and share documents.",
  create: "New trip report"
}

class TripReportIndexScreen extends Component{
  render(){
    return(
      <Screen
        className="TripReportIndexScreen"
        title={messages.title}  
      >
      <Dashboard>
        <div className="Dashboard__title-container">
          <h5 className="Dashboard__title">
            {messages.title}
          </h5>
          
          <p className="Dashboard__subheading">
            {messages.subheading}
          </p>
          
          <div className="Dashboard__actions">  
            <CollectionCreateButton 
              icon="briefcase"
              text={messages.create}
            />
          </div>
        
        </div>
        
      </Dashboard>
        
      </Screen>
    )
  }
}

export default TripReportIndexScreen;