import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

function AddTraining(props) {
  const [training, setTraining] = useState({date: new Date(), activity: '', duration: '', customer: props.link});
  const [open, setOpen] = useState(false);
 
  const handleDateChange = (date) => {
    console.log(date);
    setTraining({...training, date: date});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleSave = () => {
    props.addTraining(training);
    
    handleClose();
  }
 
  const inputChanged = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  }
 
  return (
    <div>
      <div className="add">
      <Button variant="outlined" style={{ color: '#04b088', borderColor:  '#04b088', marginTop: '10px'}} onClick={handleClickOpen}>
        Add training
      </Button>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
     
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDateTimePicker
              id="time-picker"
              label="Time picker"
              value={training.date}
              format="yyyy-MM-dd HH:mm:ss"
              onChange={handleDateChange}
            />

          </MuiPickersUtilsProvider>

          <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration in minutes"
            fullWidth
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{  color: '#04b088', borderColor:  '#04b088'}}>
            Cancel
          </Button>
          <Button onClick={handleSave} style={{  color: '#04b088', borderColor:  '#04b088'}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 
export default AddTraining;