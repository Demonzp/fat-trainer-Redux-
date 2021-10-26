import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
import { Grid } from "@material-ui/core";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import RoutNames from "../constants/routNames";

import InfiniteCalendar, { Calendar, withMultipleDates, defaultMultipleDateInterpolation } from "sa-react-infinite-calendar";
import "sa-react-infinite-calendar/styles.css";

import useWorkouts from "hooks/useWorkoutes.js";
import {parseDate} from "utils/global";

const DashboardPage = () => {
  const history = useHistory();
  const { workouts } = useWorkouts();
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    setSelected(workouts.map(work=> new Date(work.date)));
  },[workouts]);

  const handlerPickDate = (date) => {
    if(!date){
      history.push(`${RoutNames.newWorkout}`);
      return;
    }

    const isWork = selected.find(work=> parseDate(work)===parseDate(date));

    if(!isWork){
      history.push(`${RoutNames.newWorkout}?date=${date}`);
    }else{
      history.push(`${RoutNames.editWorkout}?date=${date}`);
    }
  }

  const handlerAddNewExercise = (_) => {
    history.push(RoutNames.newExercise);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Grid container direction="row" justify="space-between">
          <Button color="primary" onClick={handlerAddNewExercise}>Add New Exercise</Button>
          <Button color="primary" onClick={() => handlerPickDate()}>Add New Workout</Button>
        </Grid>
        <InfiniteCalendar
          Component={withMultipleDates(Calendar)}
          selected={selected}
          onSelect={handlerPickDate}
          height={550}
          interpolateSelection={defaultMultipleDateInterpolation}
        />
      </GridItem>
    </GridContainer>
  );
}

export default DashboardPage;