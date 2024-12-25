"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Route } from "../../../constant/Route";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logoutUser } from "../../../store/actions/authActions";

const Header = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
  };

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
              Info
            </Typography>
          </Link>
          {auth.userToken ? (
            <Button color="inherit" onClick={onLogout}>
              {auth.loading ? "Logging out..." : "Logout"}
            </Button>
          ) : (
            <Link href={Route.Login} passHref legacyBehavior>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
