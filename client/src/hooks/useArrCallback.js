import { useState, useEffect } from "react";

const useArrCallback = ({ length, callback }) => {

  const [isSubmit, setIsSubmit] = useState(false);
  const [values, setValues] = useState([]);
  const [num, setNum] = useState(0);

  const handleSubmit = (e) => {
    console.log('nen!!');
    e.preventDefault();
    setIsSubmit(true);
  }

  useEffect(() => {
    if (num>0 && num === length) {
      setIsSubmit(false);
      callback(values);
      setValues([]);
      setNum(0);
    }
  }, [num]);

  const returnVals = (vals) => {
    setNum((prev)=>prev+1);
    setValues((prev) => [...prev, vals]);
  };

  return {
    isSubmit,
    handleSubmit,
    returnVals
  };
}

export default useArrCallback;