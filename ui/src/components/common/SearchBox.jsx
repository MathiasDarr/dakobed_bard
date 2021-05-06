import React, { PureComponent } from 'react';
import { InputGroup } from '@blueprintjs/core';


export class SearchBox extends PureComponent{
  constructor(props){
    super(props);
    this.state = {};
    this.onQueryTextChange = this.onQueryTextChange.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind(this);
  }

  onQueryTextChange(e){
    const queryText = e.target.value;
    this.setState({queryText});
  }

  onSubmitSearch(event){
    const { onSearch } = this.props;
    const { queryText } = this.state;
    event.preventDefault();
    if (onSearch){
      onSearch(queryText);
    }
  }

  render(){
    const { queryText } = this.state;
    const searchPlaceholder = "placeholdery"
    return(
      <form onSubmit={this.onSubmitSearch} className="SearchBox">
        <InputGroup
          fill
          leftIcon ="search"
          onChange={this.onQueryTextChange}
          placeholder={searchPlaceholder}
          value={queryText}
        />
      </form>
    )
  }
}

export default SearchBox 