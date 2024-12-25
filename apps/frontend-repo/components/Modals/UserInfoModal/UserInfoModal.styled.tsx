import { Box, colors, styled } from "@mui/material";

export const UserModalContainer = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxWidth: "90%",
  borderRadius: 10,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  backgroundColor: colors.grey[900],
  boxShadow:
    "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
}));
