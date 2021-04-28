import React from 'react';

import c from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux';

import { withRouter } from 'react-router'


export class Screen extends React.Component { 
  constructor(props){
    super(props);
  }

  render() {

    const { title } = this.props;

    console.log("THE PROPS LOOK LIKE " + this)


    return (
      <div className={c('Screen', "HomePage")}>
        <>
          <main> 
            {this.props.children} 
          </main>
        </>

      </div>
    )
  }

}

export default Screen