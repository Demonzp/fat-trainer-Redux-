import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "@material-ui/lab";
import { IconButton, Container } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import {delMessage} from "state/actions/msg";

function Message(){
  const dispatch = useDispatch();
  const appMessages = useSelector((state) => state.msg.msgs);

  return (
    <Container>
      {appMessages.map((msg)=>{
        return(
          <Alert 
            key={msg.id}
            severity={msg.type}
            style={{marginTop:'5px'}}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() =>dispatch(delMessage(msg.id))}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {msg.txt}
          </Alert>
        );
      })}
    </Container>
  );
}

export default Message;