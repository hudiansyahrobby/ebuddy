import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Route } from "../constant/Route";

const Header = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link href={Route.Home} passHref legacyBehavior>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              News
            </Typography>
          </Link>
          <Link href={Route.Login} passHref legacyBehavior>
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
