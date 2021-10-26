import { useSelector, useDispatch } from "react-redux";
import { addExercise, loadedEx, updateExs, down, up, del} from "state/actions/exercise";

const useExercise = () => {
  const { lockAuthApp } = useSelector(state => state.auth);
  const { exercises } = useSelector(state => state.exercise);

  const dispatch = useDispatch();

  const setExercises = (exercises) => {
    dispatch(loadedEx(exercises));
  }

  const create = async (data) => {
    return await dispatch(addExercise(data));
  }

  const updateExercises = async (data)=>{
    return await dispatch(updateExs(data));
  }

  const downExercise = (id)=>{
    dispatch(down(id));
  }

  const upExercise = (id)=>{
    dispatch(up(id));
  }

  const delExercise = async (id)=>{
    return await dispatch(del(id));
  }


  return {
    create,
    lockAuthApp,
    exercises,
    setExercises,
    updateExercises,
    downExercise,
    upExercise,
    delExercise
  }
}

export default useExercise;