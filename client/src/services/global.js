import axios from "axios";

export const guestAxios = ()=>{
  return axios.create({
    baseURL:'http://localhost:5000/api'
  });
}

export const authAxios = (token)=>{
  return axios.create({
    baseURL:'http://localhost:5000/api',
    headers:{
      Authorization: token
    }
  });
}

export const handlerError = (error)=>{
  if(error.response){
    console.log('error = ', error.response);
    if(error.response.data.message){
      throw {message :error.response.data.message};
    }
    throw {message :error.response.data};
  }
  
  throw error;
}