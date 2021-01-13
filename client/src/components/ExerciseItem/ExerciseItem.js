import React from "react";
import {
  ListItem,
} from "@material-ui/core";

import { Exercise as Validation } from "validation/exercise";

import { measurementTypes } from "constants/selectMeasurement";
import FormSelectField from "components/FormSelectField/FormSelectField";
import CustomTextInput from "components/FormTextField/CustomTextInput";
import useExercise from "hooks/useExercise";
import MoreSimpleForm from "components/MoreSimpleForm/MoreSimpleForm";
import ExerciseBtns from "components/ExercisesBtns/ExerciseBtns";

const ExerciseItem = ({ exercise, isSubmit, returnVals, i }) => {

  const { exercises, lockAuthApp, downExercise, upExercise, delExercise } = useExercise();

  const handlerError = (_) => {
    returnVals({});
  }

  const submit = (vals) => {
    returnVals(vals);
  }

  return (
    <ListItem>
      <MoreSimpleForm
        submit={submit}
        handlerError={handlerError}
        validation={Validation}
        vals={{
          _id: exercise._id,
          name: exercise.name,
          measureType: exercise.measureType,
          zIndex: exercise.zIndex
        }}
        isLoading={lockAuthApp}
        direction="row"
        isSubmit={isSubmit}
      >
        <CustomTextInput name="name" label="Exercise Name" />
        <FormSelectField name="measureType" arrValues={measurementTypes} label="Measurement type" />
      </MoreSimpleForm>
      <ExerciseBtns
        i={i}
        length={exercises.length}
        up={() => upExercise(exercise._id)}
        down={() => downExercise(exercise._id)}
        del={() => delExercise(exercise._id)}
      />
    </ListItem>
  );
}

export default ExerciseItem;