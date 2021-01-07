import React from "react";
import FormSelectField from "components/FormSelectField/FormSelectField";
import SimpleForm from "components/SimpleForm/SimpleForm";
import CustomTextInput from "components/FormTextField/CustomTextInput";
import FormBtn from "components/FormBtn/FormBtn";
import { measurementTypes } from "constants/selectMeasurement";
import {Exercise as Validation} from "validation/exercise";
import useExercise from "hooks/useExercise";

const NewExercisePage = () => {
  const {create, lockAuthApp} = useExercise();

  const submit = (values)=>{
    create(values);
  }

  return (
    <SimpleForm
      submit={submit}
      validation={Validation}
      title="Create new exercise"
      subTitle="Please, add a new exercise name and measurement type"
      vals={{ name: '', measureType: 'none'}}
      isLoading={lockAuthApp}
    >
      <CustomTextInput name="name" label="Exercise Name"/>
      <FormSelectField name="measureType" arrValues={measurementTypes} label="Measurement type"/>
      <FormBtn type="submit">Create Exercise</FormBtn>
    </SimpleForm>
  );
}

export default NewExercisePage;