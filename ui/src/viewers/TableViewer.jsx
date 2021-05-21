import React, { Componet } from 'react';

import {
  Cell, Column, Table, TruncatedFormat
} from '@blueprintjs/table';

import csvContentLoader from './csvContextLoader';


import './TableViewer.scss';
import csvContextLoader from '../components/common/csvContextLoader';

class TableViewer extends Component {
  constructor(props){
    super(props);
    this.renderCell = this.renderCell.bind(this);
  }


  componentDidUpdate(prevProps){
    const initialDataLoad = prevProps.rows.length === 0 && this.props.rows.length !== 0;
    if(initialDataLoad) {
      this.forceUpdate();
    }
  }

  onVisibleCellsChange(row) {
    const { fetchMoreRows, requstedRow } = this.props;

    if ((row.rowIndexEnd + 50) > requstedRow) {
      fetchMoreRows();
    }
  }


  renderCell(rowIndex, colIndex) {
    const row = this.props.rows[rowIndex];
    const value = row ? row[colIndex] : undefined
  }


  render() {
    return(
      <div className="TableViewer">
        <Table
          numRows={totalRowCount}
          onVisibleCellsChange={this.onVisibleCellsChange}
        >
          {columns.map((column, i) => (
            <Column 
              key={column}
              id={i}
              name={column}
              cellRenderer={this.renderCell}
            />
          ))}
        </Table>
      </div>
    )
  }
}

export default csvContextLoader(TableViewer);