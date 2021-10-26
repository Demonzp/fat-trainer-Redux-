import {guestAxios, authAxios, handlerError} from "./global";

const authReq = async (path, values)=>{
  try {
    const res = await guestAxios().post(path, values);
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const attemptReq = async (token)=>{
  try {
    const res = await authAxios(token).get('/user');
    return res.data;
  } catch (error) {
    handlerError(error);
  }
}

export const registerReq = (values)=>{
  return authReq('/signup', values);
}

export const loginReq = (values)=>{
  return authReq('/signin', values);
}

export const verifyEmailReq = (values)=>{
  return authReq('/verification', {...values, verificationCode:+values.verificationCode});
}