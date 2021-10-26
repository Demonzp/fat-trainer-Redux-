import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  ListItem
} from "@material-ui/core";

import { Exercise as Validation } from "validation/workoutEx.js";

import CustomTextInput from "components/FormTextField/CustomTextInput";
import MoreSimpleForm from "components/MoreSimpleForm/MoreSimpleForm";
import ExerciseBtns from "components/ExercisesBtns/ExerciseBtns";

const styles = {
  exItem: {
    marginRight: 5
  }
};

const useStyles = makeStyles(styles);

const WorkoutExItem = ({ exercise, isSubmit, returnVals, i, workoutExs, delExercise, upExercise, downExercise}) => {
  const classes = useStyles();

  const getText = (val) => {
    if (val === "Kilograms") {
      return "kg";
    } else if (val === "Meters") {
      return "m";
    } else if (val === "Minutes") {
      return "min";
    } else {
      return "unknown";
    }
  }

  const handlerError = (_)=>{
    returnVals({});
  }

  return (
    <ListItem>
      <MoreSimpleForm
        submit={returnVals}
        handlerError={handlerError}
        validation={Validation}
        vals={{
          _id: exercise._id,
          name: exercise.name,
          zIndex: exercise.zIndex,
          repeats: exercise.repeats,
          measurment: exercise.measurment
        }}
        direction="row"
        isSubmit={isSubmit}
      >
        <CustomTextInput disabled name="name" label="Exercise Name"/>
        <CustomTextInput 
          style={{maxWidth:'120px'}} 
          name="repeats" 
          label="Repeats" 
        />
        <CustomTextInput
          name="measurment"
          label="Measurment"
        />
      </MoreSimpleForm>
      <Grid
        container
        item
        xs={1}
        justify="center"
        alignItems="center"
        className={classes.exItem}
      >
        <span>{getText(exercise.measureType)}</span>
      </Grid>
      <ExerciseBtns
        i={i}
        length={workoutExs.length}
        up={()=>{upExercise(exercise._id)}}
        down={()=>{downExercise(exercise._id)}}
        del={()=>{delExercise(exercise._id)}}
      />
    </ListItem>
  );
}

export default WorkoutExItem;