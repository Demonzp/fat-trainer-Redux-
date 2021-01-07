import MsgTypes from "../constants/msgTypes";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "state/actions/msg";
import { addExercise } from "state/actions/exercise";
import { setLockAuthApp } from "state/actions/auth";
import { createReq } from "services/exercises";

const useExercise = () => {
  const { token, lockAuthApp } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const _handlerError = (error) => {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

  const create = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await createReq({ token, ex: data });
      dispatch(addExercise(resData.exercise));
      dispatch(addMessage({ type: MsgTypes.success, txt: resData.message }));
      dispatch(setLockAuthApp(false));
      return resData;
      //return addExercise(resData);
    } catch (error) {
      _handlerError(error);
    }
  }

  return {
    create,
    lockAuthApp
  }
}

export default useExercise;