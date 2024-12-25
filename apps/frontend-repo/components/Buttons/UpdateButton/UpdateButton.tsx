import { Button } from "@mui/material";
import React from "react";

type UpdateButtonProps = React.ComponentProps<typeof Button> & {
  isLoading: boolean;
};

const UpdateButton = ({ isLoading, ...props }: UpdateButtonProps) => {
  return (
    <Button variant="contained" {...props}>
      {isLoading ? "Updating..." : "Update"}
    </Button>
  );
};

export default UpdateButton;
