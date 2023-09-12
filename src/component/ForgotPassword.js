import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { reset_link } from "../features/user/userSlice";
import React, { useEffect, useState } from "react";
import bg from "../bg.jpg";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(reset_link(values));
      setFirstRender(false);
    },
  });

  useEffect(() => {
    if (!firstRender) {
      !state.isLoading && state.isError && setOpen(true);
      if (!state.isLoading && state.isSuccess) {
        formik.resetForm();
        setOpen(true);
      }
      console.log(state.isError);
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
          component={"form"}
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
            Forgot Password
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
              onChange={formik.handleChange}
              color="secondary"
              onBlur={formik.handleBlur}
            />
          </Stack>
          {!state.isLoading ? (
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              sx={{ mt: 4, height: 48 }}
              fullWidth
              size="large"
            >
              Send Link
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              color="secondary"
              sx={{ mt: 4, height: 48 }}
              fullWidth
              size="large"
            >
              <CircularProgress />
            </Button>
          )}
        </Box>
      </Container>
      {/* Alert */}
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
          {!state.isLoading && state.isError
            ? state.message
            : "Reset Link Send Successfully"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ForgotPassword;
