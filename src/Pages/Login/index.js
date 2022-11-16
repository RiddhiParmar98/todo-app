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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  logInWithEmailAndPassword,
  loginWithGoogle,
  logOut,
} from "../../firebase/firebaseMethods";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState({});
  // const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("email id required"),
    password: Yup.string().required("password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values 111: ", values);
    console.log("Login");
    // logInWithEmailAndPassword(formData.email, formData.password);
    // setUser(formData)
  };

  const handleSocialLogin = (event) => {
    event.preventDefault();
    loginWithGoogle();
    // navigate("/");
  };

  const handleLogout = () => {
    logOut();
  };
  console.log("user", user);
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
            {({ handleSubmit, getFieldProps,values }) => (
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
              >
                {console.log('values', values)}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...getFieldProps("email")}
                  // autoFocus
                  // onChange={(e) =>
                  //   setFormData({ ...formData, email: e.target.value })
                  // }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...getFieldProps("password")}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, password: e.target.value })
                  // }
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
                  {/* <Button
                variant="outlined"
                type="submit"
                sx={{ ml: 3 }}
                color="secondary"
                startIcon={<FacebookIcon />}
              >
                Login with Facebook
              </Button> */}
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    onClick={handleSocialLogin}
                    sx={{ mt: 2 }}
                    color="primary"
                    startIcon={<GoogleIcon />}
                  >
                    Login with Google
                  </Button>

                  <Button
                    variant="outlined"
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
