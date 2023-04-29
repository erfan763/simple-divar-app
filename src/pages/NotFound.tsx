import { ArrowBackRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound({ title, link }: { title?: string; link?: string }) {
  return (
    <>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h4" color="primary">
          404 Not Found
        </Typography>
        <Button
          sx={{ mt: 3 }}
          startIcon={<ArrowBackRounded />}
          component={Link}
          to={link ? link : "/"}
          color="secondary"
          variant="outlined"
        >
          Back to {title ? title : "home"}
        </Button>
      </Box>
    </>
  );
}
