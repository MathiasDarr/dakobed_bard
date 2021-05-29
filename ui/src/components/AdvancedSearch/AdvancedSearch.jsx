import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Button, Classes, Drawer, FormGroup, Intent, Position, TagInput } from '@blueprintjs/core';

import { FIELDS, composeQueryText, parseQueryText } from 'components/AdvancedSearch/util';
import AdvancedSearchMultiField from 'components/AdvancedSearch/AdvancedSearch';
import Query from 'app/Query';

import './AdvancedSearch.scss';
const messages = {
  title: "Advanced Search",
  all_label: 'Any of these words',
  all_helptext: 'Any of these words',
  exact_label: 'This exact word/phrase',
  exact_helptext: 'This exact word/phrase',
  none_label: 'None of these words',
  none_helptext: 'Exclude results with these words',
  must_label: 'Must contain these words',
  must_helptext: 'Only results with these words will be returned',
  variants_label: 'Spelling variations',
  variants_helptext: 'Increase the fuzziness of a search, For example Dakobed~2 will return just the term "Dakobed but also similar spellings such as "Dakopeb", A spelling variant is defined by the number of spelling mistakes that must be made to get from the original word to the variant',
  submit: 'Search',
  clear: 'Clear all'
  
}


class AdvancedSearch extends React.Component {
  constructor(props){
    super(props);      
    this.state = {
      all: [],
      exact: [],
      none: [],
      must: [],
      variants: [],
      proximity: [],
    };

    this.ref = React.createRef();
    this.renderField = this.renderField.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextQueryText = nextProps.query ? nextProps.query.getString('q') : prevState.queryText;
    const queryChagne = !prevState || prevState.queryText !== nextQueryText;
    if (queryChagne) {
      const { query } = nextProps;
      const queryText = query.getString('q');
      const parsed = parseQueryText(queryText);

      return {
        queryText: nextQueryText,
        ...parsed
      }
    }
    return prevState;
  }

  updateQuery(e, isClear) {
    e.preventDefault();
    e.stopPropagation();
    const { history } = this.props;
    const queryText = isClear ? '' : composeQueryText(this.state);
    history.push({
      pathname: '/search',
      search: queryString.stringify({ q: queryText })
    });
  }



  onClear = (e) => {
    this.updateQuery(e, true);
    this.setState({
      all: [],
      exact: [],
      none: [],
      must: [],
      variants: [],
      proximity: [],
      showSearchTips: false
    })
  } 

  renderField({ key }) {
    const values = this.state[key];
    if (key == 'proximity' || key == 'variants') {
      console.log("RENDER FIELD GETS CALLED WITH KEY ", key)
      return(
        <AdvancedSearchMultiField
          values = {values}
          label={messages[`${key}_label`]}
          onChange={vals => this.onChange(key, vals)}
          field={key}
          key={key} 
        />
      );
    }

    return this.renderSimpleField(key, values);
  }


  renderSimpleField(field, values) {
    return (
      <FormGroup
        key={field}
        label={messages[`${field}_label`]}
        labelFor = {field}
        inline
        fill
        helperText={messages[`${field}_helptext`]}

      >
        <TagInput
          id={field}
          addOnBlur
          fill
          values={values}
          separator={field !== 'exact' && ' '}
          onChange={vals => this.onChange(field, vals)}
          tagProps={{ minimal: true }}
        />

      </FormGroup>
    )
  }

  renderTitle = () => {
    return (
      <span className="AdvancedSearch__header"> {messages.title} 
        <span>
          <Button
            text={<span className="bp3-text-muted">{messages.clear}</span>}
            onClick={this.onClear}
            className={`${this.state.showSearchTips ? 'hide' : ''}`}
            minimal
          />
          <Button
            type="submit"
            icon="search"
            intent={Intent.PRIMARY}
            text={messages.submit}
            onClick={this.updateQuery}
            className={`${this.state.showSearchTips ? 'hide' : ''}`}
          />
          <Button
            className="AdvancedSearch__header__close"
            minimal
            icon="chevron-up"
            onClick={this.props.onToggle}
          />
        </span>
      </span>
      
      )
  }




  render(){
    const { isOpen, navbarRef } = this.props;
    const { showSearchTips } = false
    return(
      <div className="AdvancedSearch" ref={this.ref}>
        <Drawer
          isOpen={isOpen}
          position={Position.TOP}
          canOutsideClickClose
          icon="settings"
          title={this.renderTitle()}
          isCloseButtonShown={false}
          hasBackdrop={false}
          enforceFocus={false}
          usePortal
          portalContainer={this.ref.current}
          onClose={(e) => {
            if (!navbarRef || !navbarRef.current || !navbarRef.current.contains(e.target)) {
              this.props.onToggle();
            }
          }}
        >
          <div className={Classes.DIALOG_BODY} >
            <form onSubmit={this.updateQuery} className={`${showSearchTips ? 'hide' : ''} `}>
            {FIELDS.map(this.renderField)}
            </form>
          </div>
        </Drawer>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const query = Query.fromLocation('entities', location, {}, '');
  return { query };
}


export default compose(
  withRouter,
  connect(mapStateToProps)
)(AdvancedSearch)


