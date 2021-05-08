import React, { Component } from 'react';
import { DualPane } from 'components/common';
import Screen from 'components/Screen/Screen';

const messages = {
  title: 'Datasets',
  placeholder: 'Search collections',
  empty: 'No collections were found matching this query',
  no_results: 'NO datasets were found matching this query'
}

const facetKeys = [
  'location'
]


export class DatasetIndexScreen extends Component {
  constructor(props){
    super(props);
    this.state = { facets: facetKeys};
    this.updateQuery = this.updateQuery.bind(this)
  }

  render(){
    return(
      <Screen
        className="DatasetIndexScreen"
        title={messages.title}
      >
        <DualPane>
          <DualPane.SidePane>
            <h1>

            </h1>
          </DualPane.SidePane>
          <DualPane.ContentPane>
            CONTENT PANE
          </DualPane.ContentPane>
        </DualPane>

      </Screen>
    )
  }
}




