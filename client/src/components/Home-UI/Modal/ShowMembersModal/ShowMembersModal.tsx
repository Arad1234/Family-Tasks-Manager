import { Typography } from "@mui/material";
import { useAppSelector } from "../../../../redux/hooks";
import ModalComponent from "../common/ModalComponent";
import ModalTitle from "../common/ModalTitle";

const ShowMembersModal = () => {
  const { room } = useAppSelector((state) => state.roomsReducer);
  const { familyMembers } = room;
  console.log(room);
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
