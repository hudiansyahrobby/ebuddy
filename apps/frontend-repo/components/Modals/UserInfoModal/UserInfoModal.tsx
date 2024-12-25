import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserForm from "../../Forms/UserForm/UserForm";
import UserInfo from "../../Infos/UserInfo/UserInfo";
import { UserModalContainer } from "./UserInfoModal.styled";
import { useAppDispatch } from "../../../hooks/redux";
import { fetchUserInfo } from "../../../store/actions/userActions";
import { clearUserState } from "../../../store/reducers/userReducers";

const UserInfoModal = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, open]);

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{ width: 200 }}>
        Get User Info
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="User Info"
        aria-describedby="user info of logged in user"
      >
        <UserModalContainer>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Profile Information
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            Review and update your profile details to ensure everything is
            accurate and up to date.
          </Typography>

          <Button
            variant="text"
            size="small"
            startIcon={<ModeEditIcon />}
            onClick={() => {
              dispatch(clearUserState());
              setIsEdit(!isEdit);
            }}
            sx={{ width: "fit", alignSelf: "flex-end", p: 0, mb: 3 }}
          >
            {!isEdit ? "Edit Profile" : "Cancel Edit"}
          </Button>
          {isEdit ? (
            <UserForm
              onSuccess={() => {
                setIsEdit(false);
              }}
            />
          ) : (
            <UserInfo />
          )}
        </UserModalContainer>
      </Modal>
    </>
  );
};

export default UserInfoModal;
