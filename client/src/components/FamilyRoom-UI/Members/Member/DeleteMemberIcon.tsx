import { Box } from "@mui/material";
import { HiUserRemove } from "react-icons/hi";
import { useAppDispatch } from "../../../../redux/hooks";
import { setOpenModal } from "../../../../redux/slices/Modal/modal-slice";
import { setMemberForDelete } from "../../../../redux/slices/FamilyRoom/members-slice";
import { IUser } from "../../../../types";
import { DELETE_MEMBER_MODAL } from "@Utils/constants/modalStatusConstants";

interface Props {
  member: IUser;
}

const DeleteMemberIcon = ({ member }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowDeleteMemberModal = () => {
    dispatch(setOpenModal(DELETE_MEMBER_MODAL));

    dispatch(setMemberForDelete(member));
  };

  return (
    <Box onClick={handleShowDeleteMemberModal}>
      <HiUserRemove
        size={25}
        color={"red"}
      />
    </Box>
  );
};

export default DeleteMemberIcon;
