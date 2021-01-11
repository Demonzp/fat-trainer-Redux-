import React, { useEffect, useState } from "react";
import {
  ListItem,
  Button
} from "@material-ui/core";

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ClearIcon from '@material-ui/icons/Clear';

import { Exercise as Validation } from "validation/exercise";

import { measurementTypes } from "constants/selectMeasurement";
import FormSelectField from "components/FormSelectField/FormSelectField";
import CustomTextInput from "components/FormTextField/CustomTextInput";
import useExercise from "hooks/useExercise";
import MoreSimpleForm from "components/MoreSimpleForm/MoreSimpleForm";

const ExerciseItem = ({ exercise, isSubmit, returnVals, i }) => {

  const { exercises, lockAuthApp } = useExercise();
  const [isItemSubmit, setIsItemSubmit] = useState(false);

  const handlerError = (_) => {
    returnVals({});
    setIsItemSubmit(false);
  }

  const submit = (vals) => {
    returnVals(vals);
    setIsItemSubmit(false);
  }

  useEffect(() => {
    if (isSubmit) {
      setIsItemSubmit(true);
    }
  }, [isSubmit]);

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
        isSubmit={isItemSubmit}
      >
        <CustomTextInput name="name" label="Exercise Name" />
        <FormSelectField name="measureType" arrValues={measurementTypes} label="Measurement type" />
      </MoreSimpleForm>
      {i > 0 ?
        <Button
          variant="contained"
          color="primary"
          size="large"
        //onClick={() => upExercise(exercise.key)}
        >
          <ArrowUpwardIcon />
        </Button>
        : null
      }
      {i < exercises.length - 1 ?
        <Button
          variant="contained"
          color="primary"
          size="large"
        //onClick={() => downExercise(exercise.key)}
        >
          <ArrowDownwardIcon />
        </Button>
        : null
      }
      <Button
        variant="contained"
        color="primary"
        size="large"
      //onClick={() => delExercise(exercise.id)}
      >
        <ClearIcon />
      </Button>
    </ListItem>
  );
}

export default ExerciseItem;