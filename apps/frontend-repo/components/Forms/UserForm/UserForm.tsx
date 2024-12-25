"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { updateUserSchema, UpdateUserValues } from "@repo/shared-types/user";
import { UserFormContainer } from "./UserForm.styled";
import UpdateButton from "../../Buttons/UpdateButton/UpdateButton";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { updateUserInfo } from "../../../store/actions/userActions";
import { useEffect } from "react";

type UserFormProps = {
  onSuccess: () => void;
};

const UserForm = ({ onSuccess }: UserFormProps) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<UpdateUserValues>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      displayName: user?.user?.displayName,
      email: user?.user?.email,
    },
  });

  const onUpdate = async (data: UpdateUserValues) => {
    dispatch(updateUserInfo(data));
  };

  useEffect(() => {
    if (user.success) {
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }
  }, [onSuccess, user.success]);

  return (
    <Box component="form" onSubmit={handleSubmit(onUpdate)} noValidate>
      {user.success && (
        <Typography color="success" sx={{ textAlign: "center" }}>
          Success Updating Profile
        </Typography>
      )}
      <UserFormContainer>
        <Controller
          control={control}
          name="displayName"
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor="email">Display Name</FormLabel>
              <TextField
                {...field}
                error={!!errors?.displayName}
                helperText={errors?.displayName?.message}
                id="displayName"
                type="text"
                name="displayName"
                placeholder="Input your name.."
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={errors?.displayName ? "error" : "primary"}
                sx={{ border: "hidden" }}
              />
            </FormControl>
          )}
        />

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
                required
                fullWidth
                variant="outlined"
                color={errors?.email ? "error" : "primary"}
                disabled
              />
            </FormControl>
          )}
        />

        {user.error && (
          <Typography color="error" sx={{ textAlign: "center" }}>
            {user.error}
          </Typography>
        )}

        <UpdateButton
          type="submit"
          disabled={!isValid || user.loading || user.success || !isDirty}
          fullWidth
          variant="contained"
          isLoading={user.loading}
        >
          {user.loading ? "Updating..." : "Update Profile"}
        </UpdateButton>
      </UserFormContainer>
    </Box>
  );
};

export default UserForm;
