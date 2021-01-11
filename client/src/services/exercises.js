import { authAxios, handlerError } from "./global";

export const createReq = async ({ token, data }) => {
  try {
    const res = await authAxios(token).post('/exercise', data);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const updateReq = async ({token, data}) => {
  try {
    const res = await authAxios(token).put(`/exercise/${data._id}`, data);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const getReq = async (token) => {
  try {
    const res = await authAxios(token).get('/exercise');
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const delReq = async ({token, data})=>{
  try {
    const res = await authAxios(token).delete(`/exercise/${data}`);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}