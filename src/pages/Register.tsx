import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../features/hook";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerThunk } from "../features/asyncThunks";
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "../components/Link";
import { toast } from "react-toastify";

const schema = Yup.object({
  email: Yup.string().email().required(""),
  username: Yup.string().required(""),
  password: Yup.string().required(""),
});
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { handleSubmit, getFieldProps, touched, errors, isSubmitting, isValid } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    enableReinitialize: true,
    isInitialValid: false,
    validationSchema: schema,
    async onSubmit(data, { setSubmitting }) {
      try {
        setSubmitting(true);
        const resp = await dispatch(
          registerThunk({ email: data.email, password: data.password, username: data.username })
        );
        unwrapResult(resp);
        navigate("/home");
        setSubmitting(false);
      } catch (error: any) {
        toast.error(error.data);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={10}>
      <Typography variant="h4" mb="15px">
        Sign Up
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          label="Email"
          {...getFieldProps("email")}
          error={Boolean(touched.email && errors.email)}
          helperText={errors.email}
          sx={{ minWidth: "320px", pb: 2 }}
        />
        <TextField
          fullWidth
          label="Username"
          {...getFieldProps("username")}
          error={Boolean(touched.username && errors.username)}
          helperText={errors.username}
          sx={{ minWidth: "320px", pb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          {...getFieldProps("password")}
          error={Boolean(touched.password && errors.password)}
          helperText={errors.password}
        />

        {isSubmitting ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="contained" sx={{ mb: 2, mt: 4 }} fullWidth disabled={!isValid}>
            Submit
          </Button>
        )}
      </form>
      <Link sx={{ textDecoration: "none" }} to="/login">
        <Typography width="fit-content" m="auto" color="primary.main" fontWeight={700} fontSize="20px" mt="8px">
          Sign in
        </Typography>
      </Link>
    </Box>
  );
}
