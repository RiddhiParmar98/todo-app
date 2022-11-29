import React, { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, editTodo } from "./TodoSlice";
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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const TodoForm = (props) => {
  const { isEdit } = props;
  const todo = useSelector((state) => [...state.todo.todos]);
  const loginUser = useSelector((state) => state.user.loginUser);  const param = useParams();
const fileRef = useRef(null);
  const updateDataIndex =
    isEdit && todo.findIndex((todoItem) => todoItem.id === param.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    fileRef.current.click();
  };

  const intialValue = isEdit
    ? todo[updateDataIndex]
    : {
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

  const handleSubmit = async (values, { isSubmitting }) => {
    if (isEdit) {
      dispatch(editTodo(values));
    } else {
      const id = `id${Math.floor(Math.random() * 1000000000)}`;
      const date = new Date();
      const newTodo = {
        id,
        date,
        userId: loginUser[0].userId,
        ...values,
      };
      await addDoc(collection(db, "todos"), { todo: newTodo });
      dispatch(createTodo(newTodo));
    }
    navigate("/todolist", { replace: true });
  };

  const handleImageUpload = (event, setFieldValue) => {
    const file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      setFieldValue("imageUrl", reader.result);
    };
    reader.readAsDataURL(file);
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
