import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import bg from "../bg.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(login(values));
      setFirstRender(false);
    },
  });

  useEffect(() => {
    if (!firstRender) {
      if (state.user) {
        navigate("./home");
      }
      !state.isLoading && state.isError && setOpen(true);
    }
  }, [state.isLoading]);

  return (
    <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
      <Container component="main" maxWidth="xs">
        <Box
          position={"absolute"}
          height={"100vh"}
          width={"100%"}
          sx={{
            top: 0,
            left: 0,
            zIndex: -1,
            background: `#9E9E9E  url(${bg}) no-repeat center /cover`,
            backgroundBlendMode: "multiply",
          }}
        />
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            my: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Typography component="h1" fontWeight={"bolder"} variant="h5">
            Sign in
          </Typography>
          <Stack spacing={3} sx={{ mt: 4, width: "100%" }}>
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              fullWidth
              autoFocus
              placeholder="Enter Your Email Address"
              value={formik.values.email}
              onChange={(e) => {
                const value = e.target.value || "";
                formik.setFieldValue("email", value.toLowerCase());
              }}
              color="secondary"
              onBlur={formik.handleBlur}
            />
            <TextField
              variant="outlined"
              label="Password"
              color="secondary"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{ mt: 4 }}
            fullWidth
            size="large"
          >
            Submit
          </Button>
          <Stack alignItems={"center"} spacing={1} mt={2}>
            <Box>
              <Typography
                component={"a"}
                variant="body2"
                color={"black"}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/forgot_password")}
              >
                Forgot password?
              </Typography>
            </Box>
            <Box>
              <Typography
                component={"a"}
                variant="body2"
                color={"black"}
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/sign_up")}
              >
                {"Don't have an account? Sign Up"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={"error"}
          sx={{ width: "100%" }}
          onClose={() => setOpen(false)}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
