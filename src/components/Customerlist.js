import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function Customerlist() {
  const [customers, setCustomers] = useState([]);

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

  //Define columns for customers
  const columns = [
    { headerName: 'First name', field: 'firstname', sortable: true, filter: true, width: 150},
    { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, width: 150},
    { headerName: 'Street', field: 'streetaddress', sortable: true, filter: true},
    { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, width: 150},
    { headerName: 'City', field: 'city', sortable: true, filter: true, width: 130},
    { headerName: 'Email', field: 'email', sortable: true, filter: true},
    { headerName: 'Phone', field: 'phone', sortable: true, filter: true, width: 140}
  ]

  return(
    <div>
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
      </div>
    </div>
  );
}

export default Customerlist;