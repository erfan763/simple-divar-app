import { Box, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import UserMenu from "./userMenu";
import Theme from "./theme";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        height="60px"
        borderBottom="2px solid rgb(231, 235, 240)"
        display="flex"
        alignItems="center"
        p={2}
        justifyContent="space-between"
      >
        <Theme />
        <Box display="flex" gap={1}>
          <Button
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.100",
              "&:hover": { bgcolor: "secondary.main", color: "secondary.100" },
            }}
            onClick={() => navigate("publishNotice")}
          >
            publishing the notice
          </Button>
          <UserMenu />
        </Box>
      </Box>
      <Outlet />
    </>
  );
}
