import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { List } from "@material-ui/core";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import UseValidationForm from "utils/useValidationForm";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const SimpleForm = ({submit, title, subTitle, vals, validation=()=>{return{}}, children, isLoading=false}) => {
  const classes = useStyles();

  const [fields, setFields] = useState([]);
  const [btns, setBtns] = useState([]);
  const [navs, setNavs] = useState([]);
  const [isInit, setIsInit] = useState(false);

  const preSubmit = (e)=>{
    if(isLoading){
      return;
    }
    submit(values);
  };

  const { handleChange, handleSubmit, values, errors } = UseValidationForm(
    preSubmit,
    vals,
    validation
  );

  useEffect(()=>{
    const tmpFields = [];
    const tmpBtns = [];
    const tmpLinks = [];

    const toArrChild = (el, key=1)=>{
      if(el.type.name==='FormBtn'){
        tmpBtns.push(React.cloneElement(el, {isLoading, key, style:{marginLeft:'5px',marginRight:'5px'}}));
      }else if(el.type.name==='FormNavLink'){
        tmpLinks.push(React.cloneElement(el, {key}));
      }else if(el.type.name==='EmailInput'){
        tmpFields.push(React.cloneElement(el, {name:'email', value:values['email'], error:null, handleChange, key}));
      }else if(el.type.name==='PasswordInput'){
        tmpFields.push(React.cloneElement(el, {name:'password', value:values['password'], error:null, handleChange, key}));
      }else{
        tmpFields.push(React.cloneElement(el, {value:values[el.props.name], error:null, handleChange, key}));
      }
    }

    if(!Array.isArray(children)){
      toArrChild(children);
    }else{
      children.forEach((el,i)=>{
        toArrChild(el, i);
      });
    }
    setFields(tmpFields);
    setBtns(tmpBtns);
    setNavs(tmpLinks);
    setIsInit(true);

  }, [children]);

  const updateFields = ()=>{
    const newFields = fields.map((field)=>{
      return React.cloneElement(field, {value:values[field.props.name], error:errors[field.props.name], handleChange, key:field.props.key})
    });
    setFields(newFields);
  }

  useEffect(()=>{
    if(!isInit){
      return;
    }
   updateFields();
  }, [values]);

  useEffect(()=>{
    if(!isInit){
      return;
    }
    updateFields();
  },[errors]);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{title}</h4>
              <p className={classes.cardCategoryWhite}>{subTitle}</p>
            </CardHeader>
            <CardBody>
              <List>
                {fields}
              </List>

            </CardBody>
            <CardFooter>
              <List>
                {btns}
                {navs}
              </List>
            </CardFooter>
          </Card>
        </form>
      </GridItem>
    </GridContainer>
  );
}

export default SimpleForm;