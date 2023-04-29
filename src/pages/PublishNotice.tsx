import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import Header from "../components/publishNotce/header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newNotice } from "../api/notice";
import { useUser } from "../features/hook";
import Location from "../components/Location";
import { useState } from "react";
import { LatLngLiteral } from "leaflet";

const schema = Yup.object({
  title: Yup.string().required(""),
  desc: Yup.string().required(""),
  phone: Yup.number().required(""),
  address: Yup.string().required(""),
});
export default function PublishNotice() {
  const navigate = useNavigate();
  const user = useUser();

  const [position, setPosition] = useState<LatLngLiteral>();

  const { handleSubmit, getFieldProps, touched, errors, isSubmitting, isValid } = useFormik({
    initialValues: {
      title: "",
      desc: "",
      phone: "",
      address: "",
    },
    enableReinitialize: true,
    isInitialValid: false,
    validationSchema: schema,
    async onSubmit(data, { setSubmitting }) {
      try {
        setSubmitting(true);
        user && (await newNotice({ ...data, userId: user?.id, position: position }));
        toast.success("notice published successfully");
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
    <>
      <Header divider />
      <Typography variant="h4" textAlign="center" p={3}>
        New Notice
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4} px={10}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Title"
              {...getFieldProps("title")}
              error={Boolean(touched.title && errors.title)}
              helperText={errors.title}
              sx={{ minWidth: "320px", pb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Phone Number"
              {...getFieldProps("phone")}
              error={Boolean(touched.phone && errors.phone)}
              helperText={errors.phone}
              sx={{ minWidth: "320px", pb: 2 }}
            />
          </Box>
          <TextField
            fullWidth
            label="Address"
            {...getFieldProps("address")}
            error={Boolean(touched.address && errors.address)}
            helperText={errors.address}
            sx={{ minWidth: "320px", pb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...getFieldProps("desc")}
            error={Boolean(touched.desc && errors.desc)}
            helperText={errors.desc}
            sx={{ minWidth: "320px", pb: 2 }}
          />
          <Location position={position} setPosition={setPosition} />
          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" sx={{ mb: 2, mt: 4 }} fullWidth disabled={!isValid || !position}>
              Submit
            </Button>
          )}
        </form>
      </Box>
    </>
  );
}
