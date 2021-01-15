const auth = (state, action) => {

  if (state === undefined) {
    return {
      authAttempted: false,
      lockAuthApp: false,
      token: null,
      user: null,
      activRoutes:[],
      dataLoaded: false
    };
  }

  const payload = action.payload;

  switch (action.type) {
    case "AUTH_CHANGE": {
      const {user, token, dataLoaded} = payload;

      return {
        ...state, 
        user, 
        authAttempted: true,
        lockAuthApp: false, 
        token,
        dataLoaded
      }
    }

    case "ROUTES_CHANGE":{
      return{
        ...state,
        activRoutes: payload
      }
    }

    case "SET_TOKEN":{
      return {
        ...state,
        token: payload
      }
    }

    case "SET_LOCK_AUTH_APP":{
      return {
        ...state,
        lockAuthApp: payload 
      }
    }

    default:
      return state;
  }
};

export default auth;