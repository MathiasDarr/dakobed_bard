import React, { Component } from 'react';
import { Divider } from '@blueprintjs/core';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { Count, Schema, SectionLoading, Skeleton } from 'components/common';
import EntityTable from './EntityTable';
import { selectModel } from 'selectors';



const messages = {
  search_placeholder: 'Search schema',
  empty: 'No maching result found',
  edge_create_success: 'Successfully linked source and target',
  add_to: 'Add to...'
}


class EntityTableViews extends Component {
  constructor(props){
    super(props);
    this.state = {
      updateStatus: null
    }
  }

  handleTabeChange(type) {
    const { history, location } = this.props;
    const parsedHash = queryString.parse(location.hash);
    parsedHash.type = type;


    history.push({
      pathname: location.pathname,
      search: "",
      hash: queryString.stingify({ updateStatus })
    })

  }

  onStatusChange(updateStatus) {
    this.setState({ updateStatus})
  }

  renderTable() {

    const { collection, activeSchema, querySchemaEntities, isEntitySet, writeable } = this.props;
    const { updateStatus } = this.state;

    return <EntityTable 
      query={querySchemaEntities(activeSchema)}
      collection={collection}
      schema={activeSchema}
      onStatusChange={this.onStatusChange}
      updateStatus={updateStatus}
      writeable={writeable}
      isEntitySet={isEntitySet}
    />;

  }


  render(){


    const { activeSchema, schemaViews, selectableSchemata, isPending, writeable } = this.props;
    const showSchemaSelect = writeable && selectableSchemata.length;

    if (isPending && !activeSchema) {
      return <SectionLoading />
    }


    return (
      <Tabs
        id="EntityTableViewsTabs"
        className="EntityTableViews__tabs info-tabs-padding"
        onChange={this.handleTabeChange}
        selectorTabId={activeSchema.name}
        renderActiveTabPanelOnly
        vertical
      >

      {schemaViews.map(ref => (

        <Tab 
        id={this.ref.id}
        key={ref.id}
        className="EntityTableViews__tab"
        title={
          <>
            {isPending && <Skeleton.Text type="span" length={15} />}
            {!isPending && <Skeleton.Label schema={ref.id} plural icon /> }
            <Count count={ref.count} isPending={isPending} />
          </>
        }
        panel={this.renderTable()}
        />
      ))}
      {schemaViews.length > 0 && showSchemaSelect && <MenuDivider />}
      {showSchemaSelect && (

        <Tab
          id="new"
          key="new"
          disabled
          className="EntityTableViews__tab schema-add-tab"
          title={
            <Schema.Select>
              <Button
                icon="plus"
                text={messages.ad}
              />
            </Schema.Select>
          }
        />
      )}        
      </Tabs>
    );
  }
} 

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps ;
  const hashQuery = queryString.parse(location.hash);


  return {

  }

}



export default compose(
  withRouter,  
)(EntityTableViews)