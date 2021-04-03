import { Dashboard, Person } from "@material-ui/icons";

import SigninPage from "pages/Signin";
import SignupPage from "pages/Signup";
import VerificationPage from "pages/Verification";
import DashboardPage from "pages/Dashboard";
import NewExercisePage from "pages/NewExercise";
import EditExercisesPage from "pages/EditExercises";
import NewWorkoutPage from "pages/NewWorkout";
import EditWorkoutPage from "pages/EditWorkout";

import RoutNames from "./constants/routNames";
import RouteMiddlewares from "./constants/routeMiddlewares";

const Routes = [
    {
      path: RoutNames.login,
      name: "Sign in",
      icon: Dashboard,
      component: SigninPage,
      layout: "",
      middelware:RouteMiddlewares.guest,
      hidden: false
    },
    {
      path: RoutNames.registration,
      name: "Sign up",
      icon: Person,
      component: SignupPage,
      layout: "",
      middelware:RouteMiddlewares.guest,
      hidden: false
    },
    {
      path: RoutNames.verification,
      name: "Verification",
      icon: Person,
      component: VerificationPage,
      layout: "",
      middelware:RouteMiddlewares.guest,
      hidden: true
    },
    {
      path: RoutNames.dashboard,
      name: "Dashboard",
      icon: Person,
      component: DashboardPage,
      layout: "",
      middelware:RouteMiddlewares.auth,
      hidden: false
    },
    {
      path: RoutNames.newExercise,
      name: "New Exercise",
      icon: Person,
      component: NewExercisePage,
      layout: "",
      middelware:RouteMiddlewares.auth,
      hidden: false
    },
    {
      path: RoutNames.editExercises,
      name: "Edit Exercises",
      icon: Person,
      component: EditExercisesPage,
      layout: "",
      middelware:RouteMiddlewares.auth,
      hidden: false
    },
    {
      path: RoutNames.newWorkout,
      name: "New Workout",
      icon: Person,
      component: NewWorkoutPage,
      layout: "",
      middelware:RouteMiddlewares.auth,
      hidden: false
    },
    {
      path: RoutNames.editWorkout,
      name: "Edit Workout",
      icon: Person,
      component: EditWorkoutPage,
      layout: "",
      middelware:RouteMiddlewares.auth,
      hidden: false
    }
  ];
  
  export default Routes;