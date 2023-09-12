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
import React, { useEffect, useLayoutEffect, useState } from "react";
import bg from "../bg.jpg";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { create_user } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.user);

  const [firstRender, setFirstRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    email: Yup.string().required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(create_user(values));
      setFirstRender(false);
    },
  });

  useEffect(() => {
    if (!firstRender) {
      !state.isLoading && (state.isError || state.isSuccess) && setOpen(true);
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
            Sign up
          </Typography>
          <Stack spacing={3} sx={{ mt: 4, width: "100%" }}>
            <TextField
              variant="outlined"
              label="Name"
              name="name"
              fullWidth
              placeholder="Enter Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              color="secondary"
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              fullWidth
              placeholder="Enter Your Email Address"
              value={formik.values.email}
              onChange={(e) => {
                const value = e.target.value || "";
                formik.setFieldValue("email", value.toLowerCase());
              }}
              color="secondary"
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
                onClick={() => navigate("/")}
              >
                {"Already have an account, Log in"}
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
          severity={!state.isLoading && state.isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
          onClose={() => setOpen(false)}
        >
          {state.isSuccess && "User created successfully"}
          {state.isError && state.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
