import { Box, Button, Divider } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Header({ divider }: { divider?: boolean }) {
  const navigate = useNavigate();
  return (
    <div>
      <Box height="60px" display="flex" alignItems="center" p={2}>
        <Button
          sx={{
            bgcolor: "secondary.main",
            color: "secondary.100",
            "&:hover": { bgcolor: "secondary.main", color: "secondary.100" },
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Box>
      {divider && <Divider />}
      <Outlet />
    </div>
  );
}
