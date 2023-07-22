import RoomButton from "./common/RoomButton";

const ViewTasksButton = () => {
  return (
    <RoomButton
      handleClick={() => alert("Need to add tasks page!")}
      buttonWidth="115px"
    >
      View Tasks
    </RoomButton>
  );
};

export default ViewTasksButton;
