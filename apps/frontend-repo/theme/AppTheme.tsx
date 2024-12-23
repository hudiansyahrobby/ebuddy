"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React, { useMemo } from "react";

interface AppThemeProps {
  children: React.ReactNode;
}

const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
