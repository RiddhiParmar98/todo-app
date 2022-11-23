import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputControl from "../InputControl";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../Login/userSlice";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
const SignUp = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [getUser, setGetUser] = useState([]);
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    cPassword: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .max(20, "Must be 15 characters or less")
      .required("First Name is Required"),
    lastname: Yup.string()
      .max(20, "Must be 15 characters or less")
      .required("Last Name is Required"),
    username: Yup.string().required("Username is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string().required("Password field is required"),
    cPassword: Yup.string()
      .required("Confirm password field is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
  });

  const fetchPost = async () => {
    await getDocs(collection(db, "registerUser")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGetUser(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const id = `id${Math.floor(Math.random() * 1000000000)}`;
      const date = new Date();
      const newUser = {
        id,
        date,
        ...values,
      };
      const isUserExisted = user.findIndex(
        (userItem, idx) => userItem.email === values.email
      );
      if (isUserExisted >= 0) {
        toast.error("User with this email already exists.");
      } else {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("access-token", user.accessToken);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        const docRef = await addDoc(collection(db, "registerUser"), {
          user: newUser,
        });
        dispatch(createUser(newUser));
        navigate("/todolist", { replace: true });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, getFieldProps, resetForm }) => (
            <>
              <Box
                component="form"
                onSubmit={handleSubmit}
                m={4} //margin
                p={4} //padding
                width={500}
                boxShadow={10}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputControl
                      component={TextField}
                      autoComplete="given-name"
                      name="firstname"
                      fullWidth
                      id="firstname"
                      label="First Name"
                      // component={InputControl}
                      {...getFieldProps("firstname")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputControl
                      component={TextField}
                      fullWidth
                      id="lastname"
                      label="Last Name"
                      name="lastname"
                      autoComplete="family-name"
                      {...getFieldProps("lastname")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      component={TextField}
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      autoComplete="family-name"
                      {...getFieldProps("username")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <InputControl
                      component={TextField}
                      fullWidth
                      id="email"
                      label="Email Id"
                      name="email"
                      autoComplete="email"
                      {...getFieldProps("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      component={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      {...getFieldProps("password")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputControl
                      component={TextField}
                      fullWidth
                      name="cPassword"
                      label="Confirm Password"
                      type="password"
                      id="cPassword"
                      {...getFieldProps("cPassword")}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Button
                  type="button"
                  color="info"
                  variant="contained"
                  onClick={resetForm}
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                  Reset
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" style={{ color: "blue" }}>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
