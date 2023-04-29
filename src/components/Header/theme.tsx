import { Box, Button, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppDispatch, useTheme } from "../../features/hook";
import { darkTheme, lightTheme } from "../../features/userSlice";

export default function Theme() {
  const mode = useTheme();
  const dispatch = useAppDispatch();
  const setDarkTheme = () => {
    dispatch(darkTheme());
  };
  const setlightTheme = () => {
    dispatch(lightTheme());
  };
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button
          variant="outlined"
          sx={{
            m: 0,
            borderRadius: "10px 0px 0px 10px",
            bgcolor: mode === "light" ? "secondary.main" : "unset",
            color: mode === "light" ? "secondary.100" : "primary",
            borderColor: mode === "light" ? "secondary.100" : "primary",
            "&:hover": {
              bgcolor: mode === "light" ? "secondary.main" : "unset",
              color: mode === "light" ? "secondary.100" : "primary",
              borderColor: mode === "light" ? "secondary.100" : "primary",
            },
          }}
          startIcon={<LightModeIcon />}
          onClick={() => setlightTheme()}
        >
          Light
        </Button>
        <Button
          variant="outlined"
          sx={{
            m: 0,
            borderRadius: "0px 10px 10px 0px",
            bgcolor: mode === "dark" ? "secondary.main" : "unset",
            color: mode === "dark" ? "secondary.100" : "primary",
            borderColor: mode === "dark" ? "secondary.100" : "primary",
            "&:hover": {
              bgcolor: mode === "dark" ? "secondary.main" : "unset",
              color: mode === "dark" ? "secondary.100" : "primary",
              borderColor: mode === "dark" ? "secondary.100" : "primary",
            },
          }}
          startIcon={<DarkModeIcon />}
          onClick={() => setDarkTheme()}
        >
          Dark
        </Button>
      </Box>
    </>
  );
}
