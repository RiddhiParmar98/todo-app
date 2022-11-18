import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

import InputControl from "../InputControl";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { loginUser, logOutUser } from "./userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../firebase";

const Login = () => {

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
    // console.log('values: ', values);
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
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userAuth) => {
        console.log("userAuth: ", userAuth);
        const user = {
          email: userAuth?.user?.email,
          uid: userAuth?.user?.uid,
        };
        console.log("user", user);
        dispatch(loginUser(user));
        localStorage.setItem("accessToken", userAuth?.user?.accessToken);
        navigate("/todolist", { replace: true });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGoogleSocialLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const userData = {
          accessToken: result?.user?.accessToken,
          user: result?.user,
        };
        console.log("userData", userData);
        dispatch(loginUser(userData));
        localStorage.setItem("accessToken", result?.user?.accessToken);
        navigate("/todolist", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage: ", errorMessage);
        toast.error(errorMessage);
        // const email = error.customData.email;
        // toast.error(GoogleAuthProvider.credentialFromError(err));
      });
  };

  const handleFacebookSocialLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const userData = {
          accessToken: result?.user?.accessToken,
          user: result?.user,
        };
        console.log("userData", userData.accessToken);
        dispatch(loginUser(userData));
        localStorage.setItem("accessToken", result?.user?.accessToken);
        navigate("/todolist", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        toast.error(errorMessage);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOutUser());
        localStorage.clear();
        navigate("/");
        console.log("logout");
      })
      .catch((error) => {
        console.log("error", error);
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
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

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
                    type="submit"
                    fullWidth
                    onClick={handleGoogleSocialLogin}
                    sx={{ mt: 1 }}
                    color="primary"
                    startIcon={<GoogleIcon />}
                  >
                    Login with Google
                  </Button>

                  <Button
                    variant="outlined"
                    type="submit"
                    fullWidth
                    onClick={handleFacebookSocialLogin}
                    sx={{ mt: 1 }}
                    color="secondary"
                    startIcon={<FacebookIcon />}
                  >
                    Login with Facebook
                  </Button>

                  <Button
                    // variant="outlined"
                    onClick={handleLogout}
                    color="error"
                  >
                    Logout
                  </Button>
                  {/* <Grid item xs>
                  <Link to="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>  */}
                  {/* <Grid item xs>
                    <Link to="/" style={{ color: "blue" }}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>  */}
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
