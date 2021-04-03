import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useWorkouts from "./useWorkoutes.js";
import { getUrlParams, downInArray, upInArray } from "utils/global.js";
import useArrCallback from "hooks/useArrCallback";

const useWorkout = (action) => {

  const location = useLocation();
  const { date = null } = getUrlParams(location);
  const { workouts, exercises, lockAuthApp, createWorkout, editWorkout, dataLoaded } = useWorkouts();

  const [pickDate, setPickDate] = useState(new Date());
  const [workoutExs, setWorkoutExs] = useState([]);
  const [idWorkout, setIdWorkout] = useState();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    let day;
    if (date) {
      day = new Date(date);
      if (day == 'Invalid Date') {
        day = new Date();
      }
      day = new Date(day.setHours(day.getHours() + 2));
    } else {
      day = new Date();
    }
    setPickDate(day);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (id) => {
    if (id) {
      setWorkoutExs((prev) => {
        return [
          ...prev,
          exercises[exercises.findIndex(ex => ex._id === id)]
        ]
      });
    }
    setOpen(false);
  };

  const callback = (arrVals) => {
    let isError = false;

    for (const vals of arrVals) {
      if (Object.keys(vals).length === 0) {
        isError = true;
        break;
      }
    }

    if (!isError) {
      if (action === 'new') {
        createWorkout({
          date: pickDate,
          exercises: arrVals
        });
      } else if (action === 'edit') {
        editWorkout({
          _id: idWorkout,
          date: pickDate,
          exercises: arrVals
        });
      }

    }
  };

  const {
    isSubmit,
    handleSubmit,
    returnVals
  } = useArrCallback({ length: workoutExs.length, callback });

  const downExercise = (id) => {
    setWorkoutExs(downInArray({
      nameKey: '_id',
      key: id,
      array: workoutExs
    }));
  }

  const upExercise = (id) => {
    setWorkoutExs(upInArray({
      nameKey: '_id',
      key: id,
      array: workoutExs
    }));
  }

  const delExercise = async (id) => {
    setWorkoutExs(workoutExs.filter(ex => ex._id !== id));
  }

  return {
    workouts,
    exercises,
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
    setWorkoutExs,
    setIdWorkout,
    dataLoaded
  }

}

export default useWorkout;