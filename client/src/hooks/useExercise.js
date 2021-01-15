import { useEffect } from "react";
import MsgTypes from "../constants/msgTypes";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "state/actions/msg";
import { addExercise, loadedEx, updateExs, down, up, del} from "state/actions/exercise";
import { setLockAuthApp } from "state/actions/auth";
import { createReq, getReq, updateReq, delReq } from "services/exercises";

const useExercise = () => {
  const { token, lockAuthApp } = useSelector(state => state.auth);
  const { exercises } = useSelector(state => state.exercise);

  const dispatch = useDispatch();

  const setExercises = (exercises) => {
    dispatch(loadedEx(exercises));
    // if (!isLoaded) {
    //   getReq(token)
    //     .then((exercises) => {
    //       dispatch(loadedEx(exercises));
    //     })
    //     .catch((error) => {
    //       _handlerError(error);
    //     });
    // }
  }

  // useEffect(() => {
  //   getExercises();
  // }, []);

  const _handlerError = (error) => {
    dispatch(addMessage({ type: MsgTypes.error, txt: error.message }));
    dispatch(setLockAuthApp(false));
    throw error;
  }

  const create = async (data) => {
    dispatch(setLockAuthApp(true));

    try {
      const resData = await createReq({ token, data });
      dispatch(addExercise(resData.exercise));
      dispatch(addMessage({ type: MsgTypes.success, txt: resData.message }));
      dispatch(setLockAuthApp(false));
      return resData;
    } catch (error) {
      _handlerError(error);
    }
  }

  const updateExercises = async (data)=>{
    console.log('updateExercises = ', data);
    if(data.length<=0){
      return;
    }

    dispatch(setLockAuthApp(true));

    const arrResUpdate = [];
    const arrErrUpdate = [];
    //console.log('updateExercises = ', data);
    for (const exercise of data) {
      try {
        const resData = await updateReq({token, data:exercise});
        arrResUpdate.push({data:resData, id:exercise._id});
      } catch (error) {
        arrErrUpdate.push({err:error, id:exercise._id});
      }
    }

    let errStr = '';

    arrErrUpdate.forEach((err,i)=>{
      errStr+=`${err.err} whis update: "${err.id}"`;
      if(arrErrUpdate.length>1 && i<arrErrUpdate.length-1){
        errStr+= ', ';
      }
    });

    if(arrResUpdate.length<=0){
      _handlerError(errStr);
    }else{
      let successStr = 'success update: ';
      arrResUpdate.forEach((data,i)=>{
        successStr += data.id;
        if(arrResUpdate.length>1 && i<arrResUpdate.length-1){
          successStr+= ', ';
        }
      });

      if(arrErrUpdate.length>0){
        dispatch(addMessage({ type: MsgTypes.warning, txt: errStr+successStr }));
      }else{
        dispatch(addMessage({ type: MsgTypes.success, txt: successStr }));
      }
      dispatch(updateExs(arrResUpdate));
      dispatch(setLockAuthApp(false));
      
      return {arrResUpdate, arrErrUpdate};
    }
  }

  const downExercise = (id)=>{
    dispatch(down(id));
  }

  const upExercise = (id)=>{
    dispatch(up(id));
  }

  const delExercise = async (id)=>{
    dispatch(setLockAuthApp(true));

    try {
      const resData = await delReq({ token, data:id });
      dispatch(del(id));
      return resData;
    } catch (error) {
      _handlerError(error);
    }
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