import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist(props) {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const gridRef = useRef();

  useEffect(() => {
    getCustomers();
  }, [])

  //Get all customers from REST and set them to customers -state
  const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

//Add new customer
  const addCustomer = (newCustomer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
      headers: {'Content-type' : 'application/json' },
      body: JSON.stringify(newCustomer)      
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .then(_ => setMsg('Customer was added successfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
  }

  //Edit selected customer
  const editCustomer = (link, customer) => {
    fetch(link, {
      method: 'PUT',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(customer)      
    })
    .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
    .then(_ => setMsg('Customer was updated successfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
  }

  //Delete selected customer
  const deleteCustomer = (link) => {
    console.log(link);
    if (window.confirm('Are you sure you want to delete customer?')) {
      fetch(link, {
        method: 'DELETE'
      })
      .then(_ => gridRef.current.refreshCells({rowNodes: getCustomers()}))
      .then(_ => setMsg('Customer was deleted succesfully'))
      .then(_ => setOpen(true))
      .catch(err => console.error(err))
    }
  }

  
  const goToTrainings = (customer) => {
    props.setCustomer(customer);
    props.setPage('ctrainings');
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  //Define columns for customers
  const columns = [
    { headerName: 'First name', field: 'firstname', sortable: true, filter: true, width: 135},
    { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, width: 150},
    { headerName: 'Street', field: 'streetaddress', sortable: true, filter: true},
    { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 150},
    { headerName: 'City', field: 'city', sortable: true, filter: true, width: 130},
    { headerName: 'Email', field: 'email', sortable: true, filter: true},
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, width: 140},
    {
      headerName: '', 
      field: 'links[2].href',
      width: 120,
      cellRendererFramework: params =>  
        <Button variant="outlined" size="small" style={{ color: '#04b088', borderColor:  '#04b088'}} onClick={() => goToTrainings(params)}>
          Trainings
        </Button>       
    },
    {
      headerName: '', 
      field: 'links[0].href',
      width: 90,
      cellRendererFramework: params => <EditCustomer editCustomer={editCustomer} params={params} />       
    },
    {
      headerName: '', 
      field: 'links[0].href',
      width: 110,
      cellRendererFramework: params => 
        <Button variant="outlined" size="small" style={{ color: '#04b088', borderColor:  '#04b088'}} onClick={() => deleteCustomer(params.data.links[0].href)}>
          Delete
        </Button>
    }

  ]

  return(
    <div>
      <AddCustomer addCustomer={addCustomer} />
      <div className="ag-theme-material" style={{height:'700px', width:'95%', margin:'auto'}}>
        <AgGridReact
          ref={gridRef}
          suppressCellSelection={true}
          onGridReady={ params => {
            gridRef.current = params.api
          }}
          columnDefs={columns}
          rowData={customers}
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

export default Customerlist;