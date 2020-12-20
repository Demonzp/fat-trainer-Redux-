import axios from 'axios';

export const guestAxios = ()=>{
  return axios.create({
    baseURL:'http://localhost:5000/api'
  });
}

export const authAxios = (token)=>{
  //console.log('token = ', token);
  return axios.create({
    baseURL:'http://localhost:5000/api',
    headers:{
      Authorization: token
    }
  });
}
