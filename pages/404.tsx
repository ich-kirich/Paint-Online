import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" color="textPrimary">
        404
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Page Not Found
      </Typography>
      <Link href="/">
        <Button variant="contained" color="primary">
          Back to Home
        </Button>
      </Link>
    </Box>
  );
}
