import React,{useState, useEffect} from "react";
import {parseDate} from "utils/global";
import RoutNames from "../constants/routNames";
import WorkoutPage from "./Workout";
import useWorkout from "hooks/useWorkout";
import {useHistory} from "react-router-dom";

const getFullExercises = (workExs, exs)=>{
  const full = workExs.map(workEx=>{
    let idx = exs.findIndex(ex=>ex._id===workEx._id);
    
    return {
      ...workEx,
      ...exs[idx],
    }
  });

  return full;
}

const EditWorkoutPage = () => {
  const history = useHistory();

  const {
    workouts,
    exercises,
    handleClickOpen,
    handleClose,
    handleSubmit,
    workoutExs,
    setWorkoutExs,
    pickDate,
    isSubmit,
    open,
    lockAuthApp,
    returnVals,
    upExercise,
    downExercise,
    delExercise,
    setIdWorkout,
    dataLoaded
  } = useWorkout('edit');

  const [isSetDate, setIsSetDate] = useState(false);

  useEffect(()=>{
    if(!isSetDate){
      setIsSetDate(true);
      return;
    }

    if(!dataLoaded){
      return;
    }

    const selectWork = workouts.find(work=>parseDate(new Date(work.date))===parseDate(new Date(pickDate)));

    if(!selectWork){
      history.push(`${RoutNames.newWorkout}?date=${pickDate}`);
      return;
    }
    setIdWorkout(selectWork._id);
    setWorkoutExs(getFullExercises(selectWork.exercises, exercises));
    
  },[pickDate, dataLoaded]);

  return (
    <WorkoutPage
      title="Edit Workout"
      btnTitle="Edit Workout"
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      workoutExs={workoutExs}
      pickDate={pickDate}
      isSubmit={isSubmit}
      open={open}
      lockAuthApp={lockAuthApp}
      returnVals={returnVals}
      upExercise={upExercise}
      downExercise={downExercise}
      delExercise={delExercise}
    />
  );
}

export default EditWorkoutPage;