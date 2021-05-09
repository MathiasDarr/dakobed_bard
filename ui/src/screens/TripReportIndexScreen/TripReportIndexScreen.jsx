import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';



import Screen from 'components/Screen/Screen';
import Dashboard from 'components/Dashboard/Dashboard';
import CollectionIndex from 'components/CollectionIndex/CollectionIndex';
import CollectionCreateButton from 'components/Toolbar/CollectionCreateButton'
import { tripReportsQuery } from 'queries';



const messages = {
  title:"Trip Reports Index",
  subheading: "Collections let you upload and share documents.",
  create: "New trip report",
  empty: "You do not have any collections yet",
  no_results: "No collections were found matching this query"
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
          <h5 className="Dashboard__title"> {messages.title} </h5>
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
        <CollectionIndex
          icon="briefcase"
          noResultsText={messages.no_results}
          emptyText={messages.empty}
        />
      </Dashboard>
        
      </Screen>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  return { query: tripReportsQuery(location)}
};

export default compose(
  connect(mapStateToProps, {})
)(TripReportIndexScreen);