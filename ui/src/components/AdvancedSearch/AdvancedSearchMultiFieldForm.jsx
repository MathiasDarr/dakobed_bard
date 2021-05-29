import React, { PureComponent } from 'react';

class AdvancedSearchMultiFieldForm extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      term: null,
      term2: null,
      distance: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  render(){
    
  }
}

export default AdvancedSearchMultiFieldForm