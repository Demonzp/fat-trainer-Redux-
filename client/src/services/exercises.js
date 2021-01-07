import {authAxios, handlerError} from "./global";

export const createReq = async({token, ex})=>{
  try {
    const res = await authAxios(token).post('/exercise', ex);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}