const auth = (state, action) => {

  if (state === undefined) {
    return {
      authAttempted: false,
      lockAuthApp: false,
      token: '',
      user: null,
      activRoutes:[]
    };
  }

  switch (action.type) {
    case "AUTH_CHANGE": {
      const {user, token} = action.payload;

      return {
        ...state, 
        user, 
        authAttempted: true,
        lockAuthApp: false, 
        token 
      }
    }

    case "ROUTES_CHANGE":{
      return{
        ...state,
        activRoutes: action.payload
      }
    }

    case "SET_LOCK_AUTH_APP":{
      return {
        ...state,
        lockAuthApp: action.payload 
      }
    }

    default:
      return state;
  }
};

export default auth;