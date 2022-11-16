import React, { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "./TodoSlice";
import {
  Box,
  FormControl,
  Fab,
  Button,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import InputControl from "../InputControl";
import { Formik } from "formik";
import * as Yup from "yup";

const TodoForm = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const handleClick = () => {
    fileRef.current.click();
  };

  const intialValue = {
    title: "",
    description: "",
    imageUrl: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "must be contain atleast 2 character")
      .required("Title is Required"),
    description: Yup.string()
      .min(2, "must be contain atleast 2 character")
      .required("Description is Required"),
  });

  const handleSubmit = (values, { isSubmitting }) => {
    const id = `id${Math.floor(Math.random() * 1000000000)}`;
    const date = new Date();
    const newTodo = {
      id,
      date,
      ...values,
    };
    dispatch(createTodo(newTodo));
  };

  const handleImageUpload = (event, setFieldValue) => {
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    console.log(imageUrl);
    setFieldValue("imageUrl", imageUrl);
  };

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2">
        Add To Do
      </Typography>

      <Formik
        initialValues={intialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, getFieldProps, setFieldValue, values }) => (
          <>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              boxShadow={5}
              m={4} //margin
              p={4} //padding
              sx={{ mt: 3 }}
            >
              <Grid item xs={12}>
                <InputControl
                  component={TextField}
                  fullWidth
                  id="title"
                  label="Enter Title"
                  name="title"
                  autoComplete="title"
                  {...getFieldProps("title")}
                />
              </Grid>

              <InputControl
                component={TextField}
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                // autoComplete="description"
                {...getFieldProps("description")}
              />
              <FormControl sx={{ width: 200, m: 1 }}>
                <label htmlFor="upload-photo" />
                <input
                  style={{ display: "none" }}
                  id="uploadPhoto"
                  name="uploadPhoto"
                  type="file"
                  ref={fileRef}
                  onChange={(event) => {
                    handleImageUpload(event, setFieldValue);
                  }}
                />
                <Fab
                  color="secondary"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                  onClick={handleClick}
                >
                  <AddIcon /> Add Todo Image
                </Fab>
                <br />
              </FormControl>
              {values.imageUrl && (
                <Box
                  sx={{
                    width: 300,
                    height: "auto",
                    display: "flex",
                    margin: "5px",
                    flexDirection: "column",
                  }}
                >
                  <img src={values.imageUrl} alt={values.title} />
                </Box>
              )}
              <FormControl fullWidth sx={{ m: 1 }}>
                <Button type="submit" variant="contained" disableElevation>
                  Submit
                </Button>
              </FormControl>
            </Box>
          </>
        )}
      </Formik>
    </Box>
  );
};

export default TodoForm;
