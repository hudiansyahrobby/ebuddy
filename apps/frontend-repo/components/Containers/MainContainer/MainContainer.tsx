import { Container } from "@mui/material";
import React from "react";
import { BackgroudContainer } from "./MainContainer.styled";

interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <BackgroudContainer>{children}</BackgroudContainer>
    </Container>
  );
};

export default MainContainer;
