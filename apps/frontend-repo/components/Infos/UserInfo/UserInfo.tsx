import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../hooks/redux";

const UserInfo = () => {
  const user = useAppSelector((state) => state.user);

  if (user.loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Stack gap={1}>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          Display Name:
        </Box>{" "}
        {user?.user?.displayName ?? "-"}
      </Typography>
      <Typography>
        <Box component="span" sx={{ fontWeight: "bold" }}>
          Email:
        </Box>{" "}
        {user?.user?.email ?? "-"}
      </Typography>
    </Stack>
  );
};

export default UserInfo;
