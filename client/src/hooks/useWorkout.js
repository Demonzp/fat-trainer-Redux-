import { useState, useEffect } from "react";
import {useLocation, useHistory} from "react-router-dom";
import useWorkouts from "./useWorkoutes.js";
import {getUrlParams, downInArray, upInArray} from "utils/global.js";
import useArrCallback from "hooks/useArrCallback";
import exercise from "state/reducers/exercise.js";

const useWorkout = ()=>{
  
  const location = useLocation();
  const history = useHistory();
  const {date=null} = getUrlParams(location);
  const {exercises, lockAuthApp, createWorkout} = useWorkouts();

  const [pickDate, setPickDate] = useState(new Date());
  const [workoutExs, setWorkoutExs] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(()=>{
    let day;
    if(date){
      day = new Date(date);
      if(day == 'Invalid Date'){
        day = new Date();
      }
      day = new Date(day.setHours(day.getHours()+2));
    }else{
      day = new Date();
    }
    setPickDate(day);
  },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (id)=>{
    if(id){
      setWorkoutExs((prev)=>{
        return [
          ...prev,
          exercises[exercises.findIndex(ex=>ex._id===id)]
        ]
      });
    }
    setOpen(false);
  };

  const callback = (arrVals)=>{
    let isError = false;

    for(const vals of arrVals){
      if (Object.keys(vals).length === 0) {
        isError = true;
        break;
      }
    }

    if(!isError){
      createWorkout({
        date:pickDate,
        exercises:arrVals
      });
    }
  };

  const {
    isSubmit, 
    handleSubmit, 
    returnVals
  } = useArrCallback({length: workoutExs.length, callback});

  const downExercise = (id)=>{
    setWorkoutExs(downInArray({
      nameKey: '_id',
      key: id,
      array: workoutExs
    }));
  }

  const upExercise = (id)=>{
    setWorkoutExs(upInArray({
      nameKey: '_id',
      key: id,
      array: workoutExs
    }));
  }

  const delExercise = async (id)=>{
    setWorkoutExs(workoutExs.filter(ex=>ex._id!==id));
  }

  return {
    handleClickOpen,
    handleClose,
    handleSubmit,
    workoutExs,
    pickDate,
    isSubmit,
    open,
    lockAuthApp,
    returnVals,
    upExercise,
    downExercise,
    delExercise
  }

}

export default useWorkout;