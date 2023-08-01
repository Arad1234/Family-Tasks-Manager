import { Box } from "@mui/material";
import { HiUserRemove } from "react-icons/hi";
import { useAppDispatch } from "../../../../redux/hooks";
import { setShowModal } from "../../../../redux/slices/Modal/modal-slice";
import { setMemberForDelete } from "../../../../redux/slices/FamilyRoom/members-slice";
import { IMember } from "../../../../types";

interface Props {
  member: IMember;
}

const DeleteMemberIcon = ({ member }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowDeleteMemberModal = () => {
    dispatch(setShowModal({ isOpen: true, modalStatus: "deleteMember" }));
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
