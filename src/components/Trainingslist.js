import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from'moment'


function Trainingslist() {
  const [trainings, setTrainings] = useState([]);

  const gridRef = useRef();

  useEffect(() => {
    getTrainings();
  }, [])

  // Get all trainings from REST and set them to trainings -state
  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  //Define columns for trainings
  const columns = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: function (params) {
      return moment(params.value).format('MMM Do YYYY, h:mm a');
    }},
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
    { headerName: 'Duration', field: 'duration', sortable: true, filter: true, valueFormatter: function (params) {
      return params.value + ' min'; }},
    { headerName: 'Customer', field:'customer', sortable: true, filter: true, valueFormatter: function (params) {
      return params.value.firstname + ' ' + params.value.lastname;
    } }
    
  ]

  return(
    <div>
      <div className="ag-theme-material" style={{height:'700px', width:'90%', margin:'auto'}}>
        <AgGridReact
          ref={gridRef}
          suppressCellSelection={true}
          onGridReady={ params => {
            gridRef.current = params.api
          }}
          columnDefs={columns}
          rowData={trainings}
          pagination="true"
          paginationPageSize="10"
        >
        </AgGridReact>
      </div>
    </div>
  );
}

export default Trainingslist;