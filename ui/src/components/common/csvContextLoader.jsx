import React from 'react';
import fetchCsvData from 'util/fetchCsvData';

const csvContextLoader  = (Viewer) => (
  class extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        url: null,
        requestRow: 400,
        rows: [],
        parser: null
      };
      this.processCsvResults = this.processCsvResults.bind(this);
      this.getRowCount = this.getRowCount.bind(this);
      this.fetchMoreRows = this.fetchMoreRows.bind(this);
    }

    componentDidMount() {
      this.fetchIfNeeded();
    }

    componentDidUpdate() {
      const { rows, requestedRow, parser } = this.state;
      if (rows.length < requestedRow && parser !== null) {
        parser.resume();
      }
      this.fetchIfNeeded();
    }

    fetchIfNeeded() {
      const { document } = this.props;
      const url = document.links?.csv || document.links?.file;
      if (url && this.state.url !== url) {
        fetchCsvData(url, this.processCsvResults);
        this.setState( { url });
      }
    }

    processCsvResults(results, parser) {
      if (!results?.data) return;
      this.setState((previousState) => {
        const rows = previousState.rows.concat(results.data);
        const rowIndex = rows.length;
        if (rowIndex >previousState.requestedRow) {
          parser.pause();
        }
        return { rows, parser };
      });
    }


    getRowCount() {
      const { document } = this.props;
      const { rows } = this.state;
      const rowCountRaw = document.getFirst('rowCount');
      return rowCountRaw ? parseInt(rowCountRaw, 10) : rows.length;
    }
    
    fetchMoreRows() {
      const { requestedRow } = this.state();
      const rowCount = this.getRowCount();
      
      const nextRow = Math.min(rowCount, requestedRow + 100);
      if (nextRow > requestedRow) {
        this.setState((previousState) => ({
          requestedRow: Math.min(rowCount, previousState.requestedRow + 100)
        }));
      }
    }
    render() {
      
      const { document } = this.props;
      const { requestRow, rows } = this.props;
      if (document.id === undefined) {
        return null;
      }

      const columnJson = document.getFirst('columns');
      const columnsHeader = rows.length > 0 ? rows[0] : [];
      
      return (
        <div>
          DIXIE CHICKEN
        </div>

        // <Viewer
        //   rows={rows}
        //   columns={columns}
        //   requestedRow={requestRow}
        //   totalRowCount={this.getRowCount()}
        //   fetchMoreRows={this.fetchMoreRows}
        //   {...this.props}
        // />
      );
    }

  }
 )


export default csvContextLoader;