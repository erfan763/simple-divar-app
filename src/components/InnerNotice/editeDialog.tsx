import { Box, Button, CircularProgress, Dialog, TextField } from "@mui/material";
import { useUser } from "../../features/hook";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { INoticeType, getNotice, patchNotice } from "../../api/notice";
import { useEffect, useState } from "react";
import { getModifiedValues } from "../../logic/utils";
import Location from "../../components/Location";
import { LatLngLiteral } from "leaflet";
const schema = Yup.object({
  title: Yup.string().required(""),
  desc: Yup.string().required(""),
  phone: Yup.number().required(""),
  address: Yup.string().required(""),
});
export default function EditeDialog({
  open,
  onClose,
  position,
  setPosition,
}: {
  open: boolean;
  onClose: () => void;
  position?: LatLngLiteral;
  setPosition: React.Dispatch<React.SetStateAction<LatLngLiteral | undefined>>;
}) {
  const { noticeId } = useParams<{ noticeId: string }>();
  const user = useUser();
  const [notice, setNotice] = useState<INoticeType | undefined>();

  useEffect(() => {
    const getSingleNotice = async () => {
      try {
        const resp = noticeId && (await getNotice(Number(noticeId)));
        resp !== "" && setNotice(resp);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleNotice();
  }, []);

  const { handleSubmit, getFieldProps, touched, errors, isSubmitting, isValid } = useFormik({
    initialValues: {
      title: notice?.title,
      desc: notice?.desc,
      phone: notice?.phone,
      address: notice?.address,
    },
    enableReinitialize: true,
    validationSchema: schema,
    async onSubmit(data, { setSubmitting }) {
      try {
        setSubmitting(true);
        const modified = getModifiedValues(
          { ...data, position: notice?.position },
          {
            title: notice?.title,
            desc: notice?.desc,
            phone: notice?.phone,
            address: notice?.address,
            position: position,
          }
        );
        if (modified) {
          user && (await patchNotice({ ...data, position: position }, String(noticeId)));
          toast.success("Notice updated successfully");
          onClose();
        } else {
          toast.error("There is no change");
        }

        setSubmitting(false);
      } catch (error: any) {
        toast.error(error.data);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box py={4} p={2} textAlign="center">
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="contained" sx={{ mb: 2, mt: 4 }} fullWidth disabled={!isValid}>
              Submit
            </Button>
          )}
        </form>
      </Box>
    </Dialog>
  );
}
