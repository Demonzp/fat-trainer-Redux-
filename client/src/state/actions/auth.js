import routes from "routes.js";

const getAuthRoutes = ()=>{
  return routes.filter((rout)=> rout.middelware==='guest');
}
const getDashboardRoutes = ()=>{
  return routes.filter((rout)=> rout.middelware==='auth');
}

const setToken = (token)=>(dispatch)=>{
  dispatch({
    type: "SET_TOKEN",
    payload:token
  });
  dispatch(setLockAuthApp(false));
}

const attempt = (props) => (dispatch) => {
  dispatch({
    type: "AUTH_CHANGE",
    payload:props
  });

  if(props.user){
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
  setLockAuthApp,
  setToken,
}