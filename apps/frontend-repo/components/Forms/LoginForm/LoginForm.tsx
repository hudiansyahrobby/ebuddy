"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as React from "react";
import { LoginCard, LoginContainer } from "./LoginForm.styled";
import { Controller, useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormValues } from "./LoginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });

  const onLogin = (data: LoginFormValues) => {
    console.log(data);
  };

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
      <LoginContainer justifyContent="center" alignItems="center">
        <LoginCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onLogin)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
            noValidate
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    {...field}
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={errors?.email ? "error" : "primary"}
                  />
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    {...field}
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="password"
                    required
                    fullWidth
                    variant="outlined"
                    color={errors?.password ? "error" : "primary"}
                  />
                </FormControl>
              )}
            />

            <Button
              type="submit"
              disabled={!isValid}
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
          </Box>
        </LoginCard>
      </LoginContainer>
    </Container>
  );
}
