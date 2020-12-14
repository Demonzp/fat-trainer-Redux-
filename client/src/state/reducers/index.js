import auth from './auth';
//import appMessage from './app_message';

const reducer = (state, action) => {
  return {
    auth: auth(state, action),
    //appMessage: appMessage(state, action),
  };
};

export default reducer;