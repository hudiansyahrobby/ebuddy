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
import { AuthCard } from "./AuthForm.styled";
import { loginUser, signupUser } from "../../../store/actions/authActions";
import { useEffect } from "react";
import MainContainer from "../../Containers/MainContainer/MainContainer";
import cookie from "js-cookie";
import Link from "next/link";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
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

  const onSubmit = async (data: UserAuthValues) => {
    if (isLogin) {
      dispatch(loginUser(data));
    } else {
      dispatch(signupUser(data));
    }
  };

  const isLogin = type === "login";
  const isSignup = type === "signup";

  useEffect(() => {
    if (auth.userToken) {
      cookie.set("token", auth.userToken);
      router.push(Route.Home);
      return;
    }

    if (auth.success && isSignup) {
      setTimeout(() => {
        router.push(Route.Login);
      }, 1000);
    }
  }, [auth.userToken, auth.success, router]);

  console.log("auth.success", auth.success);
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
        <AuthCard variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {isLogin ? "Login" : "Register"}
          </Typography>

          {isSignup && auth.success && (
            <Typography color="success" sx={{ textAlign: "center" }}>
              You have successfully registered. Please login.
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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

            {isLogin ? (
              <Link href={Route.Signup}>
                <Typography color="info" fontSize={14}>
                  Don't have any account ? Please Register
                </Typography>
              </Link>
            ) : (
              <Link href={Route.Login}>
                <Typography color="info" fontSize={14}>
                  Already have an account ? Please Login
                </Typography>
              </Link>
            )}

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
              {auth.loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
            </Button>
          </Box>
        </AuthCard>
      </MainContainer>
    </Container>
  );
}
