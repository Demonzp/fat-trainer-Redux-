import routes from "routes.js";

const getAuthRoutes = ()=>{
  return routes.filter((rout)=> rout.middelware==='guest' && !rout.hidden);
}
const getDashboardRoutes = ()=>{
  return routes.filter((rout)=> rout.middelware==='auth' && !rout.hidden);
}

const attempt = ({ token, user }) => (dispatch) => {
  dispatch({
    type: "AUTH_CHANGE",
    payload:{
      user,
      token
    }
  });

  if(user){
    dispatch({
      type:"ROUTES_CHANGE",
      payload:getDashboardRoutes()
    });
  }else{
    dispatch({
      type:"ROUTES_CHANGE",
      payload:getAuthRoutes()
    });
  }
  
  dispatch(setLockAuthApp(false));
}

const setLockAuthApp = (status) => (dispatch)=>{
  dispatch({
    type: "SET_LOCK_AUTH_APP",
    payload:status
  });
}

export {
  attempt,
  setLockAuthApp
}