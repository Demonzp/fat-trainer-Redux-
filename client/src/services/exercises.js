import {authAxios, handlerError} from "./global";

export const createReq = async({token, ex})=>{
  try {
    const res = await authAxios(token).post('/exercise', ex);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const getReq = async(token)=>{
  try {
    const res = await authAxios(token).get('/exercise');
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}