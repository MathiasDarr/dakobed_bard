import React, { PureComponent } from 'react';

import './ResultText.scss';

class ResultText extends PureComponent {
  renderText(){
    const { result } = this.props;
    if (result?.isError){
      return "Error"
    }
    if (!result || result.total === undefined){
      return "Searching..."
    }

    if (result.total_type === 'gte') {
      return (
        <div> 
          {result.total}
        </div>
      );
    }

    if (result.total === 0){
      return (
        "No result found"
      )
    }
    
    if (result.total === 1) {
      return "One result found"
    }

    return(
      <div>
        Found Results
      </div>
    )

  }
  
  render() {
    return (
      <span className="ResultText text-muted" >
        {this.renderText()}
      </span>
    )
  }
}

export default ResultText;