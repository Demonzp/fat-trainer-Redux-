// import React from "react";

// import { makeStyles } from "@material-ui/core/styles";
// import {
//   ListItem,
//   List,
// } from "@material-ui/core";

// // core components
// import GridItem from "components/Grid/GridItem.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
// import FormBtn from "components/FormBtn/FormBtn";

// import WorkoutExItem from "components/WorkoutExItem/WorkoutExItem.js";
// import ExercisePicker from "components/ExercisePicker/ExercisePicker.js";
// import useWorkout from "hooks/useWorkout";
// import { parseDate } from "utils/global.js";

// const styles = {
//   cardTitleWhite: {
//     color: "#FFFFFF",
//     marginTop: "0px",
//     minHeight: "auto",
//     fontWeight: "300",
//     fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
//     marginBottom: "3px",
//     textDecoration: "none"
//   },
//   formControl: {
//     minWidth: 200,
//   },
// };

// const useStyles = makeStyles(styles);

// const NewWorkoutPage = () => {

//   const classes = useStyles();
//   const {
//     pickDate,
//     lockAuthApp,
//     handleClickOpen,
//     workoutExs,
//     open,
//     handleClose,
//     handleSubmit,
//     isSubmit,
//     returnVals,
//     upExercise,
//     downExercise,
//     delExercise
//   } = useWorkout();

//   return (
//     <GridContainer>
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary">
//             <h4 className={classes.cardTitleWhite}>New Workout</h4>
//           </CardHeader>
//           <CardBody>
//             <List>
//               <ListItem>
//                 <Button color="primary" onClick={handleClickOpen}>Add Exercise</Button>
//               </ListItem>
//             </List>
//             <ExercisePicker workoutExs={workoutExs} open={open} onClose={handleClose} />
//             <List>
//               {workoutExs.map((exercise, i) => {
//                 return (
//                   <WorkoutExItem
//                     key={exercise._id}
//                     isSubmit={isSubmit}
//                     exercise={exercise}
//                     returnVals={returnVals}
//                     workoutExs={workoutExs}
//                     delExercise={delExercise}
//                     upExercise={upExercise}
//                     downExercise={downExercise}
//                     i={i}
//                   />
//                 );
//               })}
//             </List>
//           </CardBody>
//           <CardFooter>
//             <List>
//               <FormBtn
//                 fn={handleSubmit}
//                 isLoading={lockAuthApp}
//               >
//                 Create Workout
//                   </FormBtn>
//               <ListItem>
//                 <span>on date: {parseDate(pickDate)}</span>
//               </ListItem>
//             </List>
//           </CardFooter>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }

// export default NewWorkoutPage;

import React from "react";
import WorkoutPage from "./Workout";
import useWorkout from "hooks/useWorkout";

const NewWorkoutPage = ()=>{
  const {
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
  } = useWorkout('new');
  //const handleSubmitNewWorkout = ()=>{handleSubmit}
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