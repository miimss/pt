import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Weights from '../images/painot.jpg';

function Trainingslist() {
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

  // Fetch all trainings from REST and set them to trainings -state
  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }


  // Delete selected training
  const deleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete training?')) {
      fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
        method: 'DELETE'
      })
      .then(_ => gridRef.current.refreshCells({rowNodes: getTrainings()}))
      .then(_ => setMsg('Training was deleted successfully'))
      .then(_ => setOpen(true))
      .catch(err => console.error(err))
    }
  }

  //Define columns for trainings
  const columns = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true, valueFormatter: function (params) {
      return moment(params.value).format('MMM Do YYYY, h:mm a');
    }},
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true, width: '140' },
    { headerName: 'Duration', field: 'duration', sortable: true, filter: true, width: '140', valueFormatter: function (params) {
      return params.value + ' min'; }},
    { headerName: 'Customer', field:'customer', sortable: true, filter: true, width: '150' , valueFormatter: function (params) {
      return params.value.firstname + ' ' + params.value.lastname;
    }},
    {
      headerName: '', 
      field: 'links[0].href',
      width: 110,
      cellRendererFramework: params => 
        <Button variant="outlined" size="small" style={{color: '#04b088', borderColor:  '#04b088'}} onClick={() => deleteTraining(params.data.id)}>
          Delete
        </Button>
    }
    
  ]

  return(
    <div>
      <Container fluid>
          <Row>
            <Col md={4}>
              <Image src={Weights} fluid alt="dumbbells on a rack"/>
            </Col>
            <Col>
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Trainingslist;