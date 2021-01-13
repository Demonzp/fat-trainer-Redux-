import React from "react";

import {
  Button
} from "@material-ui/core";

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ClearIcon from '@material-ui/icons/Clear';

const ExerciseBtns = ({i,length, up, down, del}) => {
  return (
    <React.Fragment>
      {i > 0 ?
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={up}
        >
          <ArrowUpwardIcon />
        </Button>
        : null
      }
      {i < length - 1 ?
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={down}
        >
          <ArrowDownwardIcon />
        </Button>
        : null
      }
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={del}
      >
        <ClearIcon />
      </Button>
    </React.Fragment>

  );
}

export default ExerciseBtns;