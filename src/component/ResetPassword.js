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
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { reset_password } from "../features/user/userSlice";

const ResetPassword = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const [firstRender, setFirstRender] = useState(true);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      const password = values.password;
      dispatch(reset_password({ id, password }));
      setFirstRender(false);
    },
  });
  useEffect(() => {
    if (!firstRender) {
      !state.isLoading && state.isError && setOpen(true);
      console.log(state.message);
      state.isSuccess &&
        setTimeout(() => {
          window.close();
        }, 1000);
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
            Reset Password
          </Typography>
          <Stack spacing={3} sx={{ mt: 4, width: "100%" }}>
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              fullWidth
              autoFocus
              placeholder="Enter New Password"
              value={formik.values.password}
              onChange={(e) => {
                const value = e.target.value || "";
                formik.setFieldValue("email", value.toLowerCase());
              }}
              color="secondary"
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              variant="outlined"
              label="Confirm Password"
              color="secondary"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              fullWidth
              placeholder="Confirm New Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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
        </Box>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          severity={!state.isLoading && state.isError ? "error" : "success"}
          sx={{ width: "100%" }}
          onClose={() => setOpen(false)}
        >
          {!state.isLoading && state.isError && state.message}
          {!state.isLoading &&
            state.isSuccess &&
            "Password Change Successfully!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ResetPassword;
