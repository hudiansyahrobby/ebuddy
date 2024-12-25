import { colors, Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import UserInfoModal from "../../Modals/UserInfoModal/UserInfoModal";
import { MainHeroImage } from "./MainHero.styled";

const MainHero = () => {
  return (
    <Grid2
      container
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Stack spacing={2}>
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: 32,
                md: 48,
                lg: 54,
              },
            }}
            fontWeight="bold"
            color={colors.blueGrey[100]}
          >
            Empower Your Journey with Personalised Insights
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: 14,
                md: 16,
              },
            }}
            fontWeight="normal"
            color={colors.blueGrey[100]}
          >
            Unlock personalized experiences and tailored solutions by securely
            sharing your details. We value your privacy and ensure your data
            works for you.
          </Typography>

          <UserInfoModal />
        </Stack>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <MainHeroImage
          src="/hero.svg"
          alt="Hero Image"
          width={500}
          height={500}
        />
      </Grid2>
    </Grid2>
  );
};

export default MainHero;
