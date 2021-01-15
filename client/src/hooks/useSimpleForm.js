import React, { useState, useEffect } from "react";
import UseValidationForm from "utils/useValidationForm.js";

const useSimpleForm = ({ handlerError = ()=>{}, submit, vals, validation, children, isLoading, isSubmit=false }) => {
  const [fields, setFields] = useState([]);
  const [btns, setBtns] = useState([]);
  const [navs, setNavs] = useState([]);
  const [isInit, setIsInit] = useState(false);

  const preSubmit = (e) => {
    if (isLoading) {
      return;
    }
    submit(values);
  };

  const { handleChange, handleSubmit, values, errors } = UseValidationForm(
    preSubmit,
    handlerError,
    vals,
    validation,
  );

  useEffect(() => {
    const tmpFields = [];
    const tmpBtns = [];
    const tmpLinks = [];

    const toArrChild = (el, key = 1) => {
      if (el.type.name === 'FormBtn') {
        tmpBtns.push(React.cloneElement(el, { isLoading, key, style: { marginLeft: '5px', marginRight: '5px' } }));
      } else if (el.type.name === 'FormNavLink') {
        tmpLinks.push(React.cloneElement(el, { key }));
      } else if (el.type.name === 'EmailInput') {
        tmpFields.push(React.cloneElement(el, { name: 'email', value: values['email'], error: errors[el.props.name], handleChange, key }));
      } else if (el.type.name === 'PasswordInput') {
        tmpFields.push(React.cloneElement(el, { name: 'password', value: values['password'], error: errors[el.props.name], handleChange, key }));
      } else {
        tmpFields.push(React.cloneElement(el, { value: values[el.props.name], error: errors[el.props.name], handleChange, key }));
      }
    }

    if (!Array.isArray(children)) {
      toArrChild(children);
    } else {
      children.forEach((el, i) => {
        toArrChild(el, i);
      });
    }
    setFields(tmpFields);
    setBtns(tmpBtns);
    setNavs(tmpLinks);
    setIsInit(true);

  }, [children]);

  const updateFields = () => {
    const newFields = fields.map((field) => {
      return React.cloneElement(field, { value: values[field.props.name], error: errors[field.props.name], handleChange, key: field.props.key })
    });
    setFields(newFields);
  }

  useEffect(() => {
    if (!isInit) {
      return;
    }
    updateFields();
  }, [values, errors]);

  useEffect(()=>{
    if(isSubmit){
      handleSubmit();
    }
  }, [isSubmit]);

  return {
    fields,
    btns,
    navs,
    handleSubmit
  }
}

export default useSimpleForm;