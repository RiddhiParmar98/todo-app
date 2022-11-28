import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
// import EmailIcon from "@mui/icons-material/Email";
import InputControl from "../InputControl";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { createUser, loginUser } from "./userSlice";
import { blue } from "@mui/material/colors";

import { useDispatch, useSelector } from "react-redux";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app, db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
const Login = () => {
  const user = useSelector((state) => [...state.user.user]);
  console.log("user :>> ", user);
  // const color = blue[900];
  const auth = getAuth(app);
  const navigate = useNavigate();
  // const user = useSelector((state) => [...state.user]);
  const dispatch = useDispatch();
  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("email id required"),
    password: Yup.string().required("password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    try {
      const getUser =
        user.length &&
        user.filter(
          (dataItem, idx) =>
            values.email === dataItem.email &&
            values.password === dataItem.password
        );
      if (getUser.length !== 0) {
        navigate("/todolist", { replace: true });
        dispatch(loginUser(getUser));
      } else {
        toast.error("Incorrect email id or password");
      }
    } catch (error) {
      console.log("error log in", error);
      toast.error("Invalid Credentials");
    }
    // try {
    // let user = logInWithEmailAndPassword(values.email, values.password);
    // console.log("user: ",user)
    // console.log('userData: ', userData);
    // localStorage.setItem("accessToken", accessToken);
    // navigate("/todolist", { replace: true });
    // setUser(formData)
    // } catch (error) {
    // console.log(error);
    // toast.error("Incorrect Username or Password");
    // }
    // signInWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userAuth) => {
    //     console.log("userAuth: ", userAuth);
    //     const user = {
    //       email: userAuth?.user?.email,
    //       uid: userAuth?.user?.uid,
    //     };
    //     console.log("user", user);
    //     dispatch(loginUser(user));
    //     localStorage.setItem("accessToken", userAuth?.user?.accessToken);
    //     navigate("/todolist", { replace: true });
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  const handleGoogleSocialLogin = async () => {
    const id = `id${Math.floor(Math.random() * 1000000000)}`;
    const date = new Date();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const username = result?.user?.displayName?.split(" ");
        const userData = {
          id: id,
          date: date,
          username: result?.user?.displayName,
          email: result?.user?.email,
          firstname: username[0],
          lastname: username[1],
        };
        const docRef = addDoc(collection(db, "registerUser"), {
          user: userData,
        });
        dispatch(createUser(userData));
        localStorage.setItem("accessToken", userData?.accessToken);
        navigate("/todolist", { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleFacebookSocialLogin = () => {
    const id = `id${Math.floor(Math.random() * 1000000000)}`;
    const date = new Date();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        // const username = result?.user?.displayName?.split(" ");
        // const userData = {
        //   id: id,
        //   date: date,
        //   username: result?.user?.displayName,
        //   email: result?.user?.email,
        //   firstname: username[0],
        //   lastname: username[1],
        // };
        // const docRef = addDoc(collection(db, "registerUser"), {
        //   user: userData,
        // });
        // dispatch(createUser(userData));
        localStorage.setItem("accessToken", result?.user?.accessToken);
        navigate("/todolist", { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(assets/img/Login_page.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[100]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, getFieldProps, values }) => (
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
              >
                <InputControl
                  component={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...getFieldProps("email")}
                />
                <InputControl
                  component={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...getFieldProps("password")}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 1 }}
                >
                  Sign In
                </Button>
                <Typography
                  variant="subtitle2"
                  color="secondary"
                  sx={{ textAlign: "center" }}
                >
                  OR
                </Typography>
                <Grid container>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleGoogleSocialLogin}
                    sx={{ mt: 1 }}
                    color="error"
                    startIcon={<GoogleIcon />}
                  >
                    Login with Google
                  </Button>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleFacebookSocialLogin}
                    sx={{ mt: 1, backgroundColor: "#0d47a1" }}
                    startIcon={<FacebookIcon />}
                  >
                    Login with Facebook
                  </Button>
                </Grid>
                <Grid
                  sx={{
                    mt: 2,
                  }}
                  container
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Link to="/signup" style={{ color: "blue" }}>
                      New User?create an Account here
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
