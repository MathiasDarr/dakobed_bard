import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';
import { Button } from '@blueprintjs/core';

class QueryInfiniteLoad extends Component {
  constructor(props) {
    super(props);
    this.getMoreResults = this.getMoreResults.bind(this);
    console.log("QUERY INFINITE LOAD RESULTS ", this.props)
  }

  componentDidMount() {
    this.fetchIfNeeded();
  }

  getMoreResults() {
    const { query, result } = this.props;
    this.props.fetch({ query, result, next: result.next });
  }

  fetchIfNeeded(){
    const { query, result } = this.props;
    // if (result.shouldLoad) {
    // if(true)
    this.props.fetch({ query, result });
    
  }

  render(){
    const { loadOnScroll = true, result } = this.props;
    // const canLoadMore = result && result.next && !result.isPending && !result.isError && result.results.length < result.total;

    return(
      <div>QUERY INFINITE LOAD</div>
    )

    // const canLoadMore = true;
    // if (canLoadMore) {
    //   if (loadOnScroll) {
    //     console.log("I NEED MORE RESULTS WAYPOINT")
    //     return (
    //       <Waypoint 
    //         onEnter={this.getMoreResults}
    //         bottomOffset="-100px"
    //         scrollableAncestor={window}
    //       />
    //     );
    //   } else {
    //     console.log("I NEED MORE RESULTS NOTE ADFDAAYPOIN")
    //     return (
    //       <div className="QueryInfiniteLoad__button">
    //         <Button
    //           onClick={this.getMoreResults}
    //           className="QueryInfiniteLoad__button"
    //         >
    //           {"Load more"}
    //         </Button>
    //       </div>
    //     )
    //   }
    // }

    
  }

}

export default QueryInfiniteLoad;