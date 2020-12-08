import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTraining';
 
function CustomersTrainings(props) {
  const [trainings, setTrainings] = useState([]);
  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);
  
  const gridRef = useRef();

  useEffect(() => {
    getTrainings();
  }, [])
 
  const closeSnackbar = () => {
    setOpen(false);
  }

// Fetch selected customer's trainings
  const getTrainings = () => {
    fetch(props.customer.data.links[2].href)
    .then(response => response.json())
    .then(data => setTrainings(data.content))
    .catch(err => console.error(err))
  }

  // Add a new training to a customer
  const addTraining = (newTraining) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: {'Content-type' : 'application/json' },
      body: JSON.stringify(newTraining)      
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
    .then(_ => setMsg('Training was added succesfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
  }
  
  // Delete selected training
  const deleteTraining = (link) => {
    console.log(link);
    if (window.confirm('Are you sure?')) {
      fetch(link, {
        method: 'DELETE'
      })
      .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
      .then(_ => setMsg('Training was deleted succesfully'))
      .then(_ => setOpen(true))
      .catch(err => console.error(err))
    }
  }

   //Define columns for trainings
   const columns = [
    { 
      headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: function (params) {
      return moment(params.value).format('MMM Do YYYY, h:mm a');
    }},
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
    { 
      headerName: 'Duration', field: 'duration', sortable: true, filter: true, valueFormatter: function (params) {
      return params.value + ' min'; }},
    {
      headerName: '', 
      field: 'links[0].href',
      width: 110,
      cellRendererFramework: params => 
        <Button variant="outlined" size="small" style={{ color: '#04b088', borderColor:  '#04b088'}} onClick={() => deleteTraining(params.data.links[0].href)}>
          Delete
        </Button>
    }
  ]

  return (
    <div>
      <div className="add">
        <h2>{props.customer.data.firstname} {props.customer.data.lastname}</h2>
        <AddTraining addTraining={addTraining} link={props.customer.data.links[0].href}/>
      </div>
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

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message={msg}
        />
      </div>
        
    </div>
  );
}
 
export default CustomersTrainings;