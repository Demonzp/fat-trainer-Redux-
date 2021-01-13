import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AlarmIcon from '@material-ui/icons/Alarm';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { blue } from '@material-ui/core/colors';

import useExercise from 'hooks/useExercise';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const SimpleDialog = ({workoutExs, onClose, open })=> {
  const classes = useStyles();
  const {exercises} = useExercise();
  const [filterEx, setFilterEx] = useState([]);

  useEffect(()=>{
    setFilterEx(
      exercises.filter((ex)=>{
        const idx = workoutExs.findIndex((wEx)=>wEx._id===ex._id);
        if(idx>=0){
          return false;
        }
        return true;
      })
    );
  }, [workoutExs, exercises]);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        {filterEx.map((ex) => (
          <ListItem button onClick={() => handleListItemClick(ex._id)} key={ex._id}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {ex.measureType=="Kilograms"?<FitnessCenterIcon />:null}
                {ex.measureType=="Meters"?<TrendingFlatIcon />:null}
                {ex.measureType=="Minutes"?<AlarmIcon />:null}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${ex.name}, ${ex.measureType}`} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default SimpleDialog;