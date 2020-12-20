import { createId } from "utils/global";
import MsgTypes from "constants/msgTypes";

const _timers = {};
const _maxNumMess = 4;
const _timeOut = 30000;

const _middelware = (dispatch, getState)=>{
  const messages = getState().msg.msgs;

  if(messages.length>=_maxNumMess){
    dispatch(delMessage(messages[0].id));
  }
}

const _addMessage = (msg) => (dispatch) => {
  const newMsg = {
    ...msg,
    id: createId(8)
  };

  dispatch({
    type: 'ADD_MESSAGE',
    payload: newMsg
  });

  const timer = setTimeout(() => {
    dispatch(delMessage(newMsg.id));
  }, _timeOut);
  
  _timers[newMsg.id] = timer;
};

const _delTimer = (timerId)=>{
  if (_timers.hasOwnProperty(timerId)) {
    clearTimeout(_timers[timerId]);
    delete _timers[timerId];
  }
}

const clearMessages = () => (dispatch) => {
  for (const timer in _timers) {
    _delTimer(timer);
  }

  dispatch({
    type: 'CLEAR_MESSAGES'
  });
}

const delMessage = (id) => {
  _delTimer(id);
  
  return {
    type: 'DEL_MESSAGE',
    payload: id
  };
}

const addMessage = (msg = { type: MsgTypes.warning, txt: 'some Error' }) => (dispatch) => {
  dispatch(_middelware);
  dispatch(_addMessage(msg));
};

export {
  addMessage,
  delMessage,
  clearMessages
}