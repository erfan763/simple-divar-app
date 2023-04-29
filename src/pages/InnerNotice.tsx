import { Box, Button, CardMedia, Typography } from "@mui/material";
import Header from "../components/publishNotce/header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { INoticeType, getNotice } from "../api/notice";
import home from "../assets/home.png";
import { useUser } from "../features/hook";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirm from "../components/DeleteConfirm";
import EditeDialog from "../components/InnerNotice/editeDialog";
import Location from "../components/Location";
import { LatLngLiteral } from "leaflet";

export default function InnerNotice() {
  const { noticeId } = useParams<{ noticeId: string }>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
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
  }, [editDialog]);

  const [position, setPosition] = useState<LatLngLiteral | undefined>(notice?.position);
  return (
    <>
      <DeleteConfirm
        url={`/notices/${noticeId}`}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDone={() => {
          navigate("/home");
        }}
      />
      <EditeDialog
        position={position}
        setPosition={setPosition}
        open={editDialog}
        onClose={() => setEditDialog(false)}
      />
      <Header />
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h4" p={2}>
          {notice?.title}
        </Typography>

        <Box width="50%" p={2}>
          <CardMedia component="img" height="340" sx={{ borderRadius: "15px" }} image={home} alt="green iguana" />
        </Box>
        <Box width="45%">
          <Typography variant="h6" py={2}>
            Description : {notice?.desc}
          </Typography>
          <Typography variant="h6" py={2}>
            Pone : {notice?.phone}
          </Typography>
          <Typography variant="h6" py={2}>
            Address : {notice?.address}
          </Typography>
        </Box>
        <Location position={notice?.position} staticLoaction />
        <Box mt={2}></Box>
        {notice?.userId === user?.id && (
          <Box display="flex" gap={2} m={4}>
            <Button
              sx={{
                bgcolor: "secondary.main",
                color: "secondary.100",
                "&:hover": { bgcolor: "secondary.main", color: "secondary.100" },
              }}
              onClick={() => setEditDialog(true)}
            >
              <EditIcon />
              Edit
            </Button>
            <Button
              sx={{
                bgcolor: "error.main",
                color: "secondary.100",
                "&:hover": { bgcolor: "error.main", color: "secondary.100" },
              }}
              onClick={() => setDeleteOpen(true)}
            >
              <DeleteOutlineIcon />
              Remove
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
