"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Route } from "../../../constant/Route";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { userAuthSchema, UserAuthValues } from "@repo/types";
import { LoginCard } from "./LoginForm.styled";
import { loginUser } from "../../../store/actions/authActions";
import { useEffect } from "react";
import MainContainer from "../../Containers/MainContainer/MainContainer";
import cookie from "js-cookie";

export default function LoginForm() {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<UserAuthValues>({
    resolver: zodResolver(userAuthSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: UserAuthValues) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (auth.userToken) {
      localStorage.setItem("token", auth.userToken);
      cookie.set("token", auth.userToken);
      router.push(Route.Home); // Redirect to the dashboard after successful login
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

            {auth.error && (
              <Typography color="error" sx={{ textAlign: "center" }}>
                {auth.error}
              </Typography>
            )}

            <Button
              type="submit"
              disabled={!isValid || auth.loading}
              fullWidth
              variant="contained"
            >
              {auth.loading ? "Signing in..." : "Sign in"}
            </Button>
          </Box>
        </LoginCard>
      </MainContainer>
    </Container>
  );
}
