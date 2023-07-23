import { Typography } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks";
import ModalComponent from "../common/ModalComponent";
import ModalTitle from "../common/ModalTitle";

const ShowMembersModal = () => {
  const { currentRoom } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = currentRoom;
  console.log(familyMembers);
  console.log(currentRoom);
  return (
    <ModalComponent>
      <ModalTitle>Members</ModalTitle>
      {familyMembers.map((member) => {
        return (
          <Typography
            variant="h5"
            key={member.userId}
          >
            {member.username}
          </Typography>
        );
      })}
    </ModalComponent>
  );
};

export default ShowMembersModal;
