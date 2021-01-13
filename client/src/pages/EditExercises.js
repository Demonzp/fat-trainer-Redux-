import React from "react";
import useExercise from "hooks/useExercise";
import useArrCallback from "hooks/useArrCallback";
import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FormBtn from "components/FormBtn/FormBtn.js";
import ExerciseItem from "components/ExerciseItem/ExerciseItem.js";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    minWidth: 200,
  },
};

const useStyles = makeStyles(styles);

const EditExercisesPage = () => {
  const classes = useStyles();

  const { exercises, updateExercises, lockAuthApp } = useExercise();

  const callback = (vals)=>{
    updateExercises(vals.filter((ex)=>{
      if (Object.keys(ex).length !== 0) {
        const idx = exercises.findIndex(exercise => exercise._id === ex._id);
        for (const key in exercises[idx]) {
          if (exercises[idx][key] !== ex[key] && ex.hasOwnProperty(key)) {
            return true;
          }
        }
      }
      return false;
    }));
  };

  const {
    isSubmit, 
    handleSubmit, 
    returnVals
  } = useArrCallback({length: exercises.length, callback});

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Edit Exercises</h4>
          </CardHeader>
          <CardBody>
            <List>
              {exercises.map((exercise, i) => {
                return (
                  <ExerciseItem
                    key={exercise._id}
                    isSubmit={isSubmit}
                    exercise={exercise}
                    returnVals={returnVals}
                    i={i}
                  />
                );
              })}
            </List>
          </CardBody>
          <CardFooter>
            <List>
              <FormBtn
                fn={handleSubmit}
                isLoading={lockAuthApp}
              >
                Edit Exercises
              </FormBtn>
            </List>
          </CardFooter>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default EditExercisesPage;