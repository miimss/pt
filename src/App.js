import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Calendar from './components/Calendar';
import PersonIcon from '@material-ui/icons/Person';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Typography from '@material-ui/core/Typography';
import './App.css';
import CustomersTrainings from './components/CustomersTrainings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css';


function App() {
  const [page, setPage] = useState('customers');
  const [customer, setCustomer] = useState({});

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="App">
      <AppBar position="static" className="AppBar" style={{ background: '#78c2ad'}}>
        <Typography variant="h2" style={{color: 'white' }}>
          Customer Database
        </Typography>
        <Tabs value={page} onChange={handleChange} centered>
          <Tab icon={<PersonIcon />} value="customers" label="Customers" />
          <Tab icon={<DirectionsRunIcon />} value="trainings" label="Trainings" />
          <Tab icon={<CalendarTodayIcon />} value="calendar" label="Calendar" />
        </Tabs>
      </AppBar>

      {page === 'customers' && <Customerlist setPage={setPage} setCustomer={setCustomer}/>}
      {page === 'trainings' && <Trainingslist />}
      {page === 'calendar' && <Calendar />}
      {page === 'ctrainings' && <CustomersTrainings customer={customer}/>}
    </div>
    
  );
}

export default App;
