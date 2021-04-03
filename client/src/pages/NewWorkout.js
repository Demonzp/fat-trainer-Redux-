import React, { useEffect, useState } from "react";
import WorkoutPage from "./Workout";
import useWorkout from "hooks/useWorkout";
import { parseDate } from "utils/global";
import RoutNames from "../constants/routNames";
import { useHistory } from "react-router";

const NewWorkoutPage = () => {
  const history = useHistory();

  const {
    workouts,
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
    delExercise,
    dataLoaded,
  } = useWorkout('new');

  const [isSetDate, setIsSetDate] = useState(false);

  useEffect(() => {

    if(!isSetDate){
      setIsSetDate(true);
      return;
    }

    if (!dataLoaded) {
      return;
    }

    const selectWork = workouts.find(work => parseDate(new Date(work.date)) === parseDate(new Date(pickDate)));
    if(selectWork){
      history.push(`${RoutNames.editWorkout}?date=${pickDate}`);
      return;
    }

  }, [pickDate, dataLoaded]);

  return (
    <WorkoutPage
      title="New Workout"
      btnTitle="Create Workout"
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

export default NewWorkoutPage;