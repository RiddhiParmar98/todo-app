import React from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const InputControl = (props) => {
  const { htmlFor, label, labelName, name, id, type, ...rest } = props;
  return (
    <>
      <InputLabel {...htmlFor}>{labelName}</InputLabel>
      <Field {...{ id, type, label }} {...rest} />
      <ErrorMessage {...{ name }} component={TextError} />
    </>
  );
};

export default InputControl;
