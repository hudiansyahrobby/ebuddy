"use client";

import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MainContainer from "../components/Containers/MainContainer/MainContainer";
import MainHero from "../components/Heros/MainHero/MainHero";
import { Route } from "../constant/Route";
import { useAppSelector } from "../hooks/redux";

export default function Home() {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.userToken) {
      router.push(Route.Login);
    }
  }, [auth.userToken, router]);

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
      <MainContainer>
        <MainHero />
      </MainContainer>
    </Container>
  );
}
