import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import PersonIcon from '@material-ui/icons/Person';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Typography from '@material-ui/core/Typography';
import './App.css';


function App() {
  const [page, setPage] = useState('customers');

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="App">
      <AppBar position="static" className="AppBar" style={{ background: '#0be3bf' }}>
        <Typography variant="h2" >
          Customer Database
        </Typography>
        <Tabs value={page} onChange={handleChange} centered>
          <Tab icon={<PersonIcon />} value="customers" label="Customers" />
          <Tab icon={<DirectionsRunIcon />} value="trainings" label="Trainings" />
        </Tabs>
      </AppBar>

      {page === 'customers' && <Customerlist />}
      {page === 'trainings' && <Trainingslist />}
    </div>
    
  );
}

export default App;
