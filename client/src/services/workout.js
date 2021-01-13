import { authAxios, handlerError } from "./global";

export const createReq = async ({token, data})=>{
  try {
    const res = await authAxios(token).post('/workout', data);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const getReq = async (token)=>{
  try {
    const res = await authAxios(token).get('/workout');
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}