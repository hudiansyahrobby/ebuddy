import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Route } from "../constant/Route";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
      }}
    >
      <Typography variant="body1">My Application Footer</Typography>
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href={Route.Home}>
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
};

export default Footer;
