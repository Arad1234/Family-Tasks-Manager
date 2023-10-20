import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addTaskSocket } from "@Redux/actions/familyRoom-actions";
import { CreateTaskFormModal, IRoom, IUser } from "../../../../types";
import ModalComponent from "../../../Modal-Common/ModalComponent";
import ModalForm from "./ModalForm";
import { ObjectSchema, date, object, string } from "yup";

const AssignTaskModal = () => {
  const memberForAssignTask = useAppSelector(
    (state) => state.membersReducer.memberForAssignTask as IUser
  );
  const familyRoom = useAppSelector(
    (state) => state.familyRoomReducer.familyRoom as IRoom
  );

  const dispatch = useAppDispatch();

  const formInitialValues = {
    name: "",
    description: "",
    startTime: undefined,
    endTime: undefined,
  };

  const formValidationSchema: ObjectSchema<CreateTaskFormModal> = object({
    name: string()
      .required("Required Field")
      .min(5, "Must be between 5 to 20 chars")
      .max(20, "Must be between 5 to 20 chars"),
    description: string().optional(),

    startTime: date().optional(),
    endTime: date()
      .optional()
      .test("end-time-condition", "End Time is required", function (value) {
        const { startTime } = this.parent;
        return startTime && !value ? false : true;
      }),
  });

  const formHandleSubmit = ({
    description,
    endTime,
    name,
    startTime,
  }: CreateTaskFormModal) => {
    dispatch(
      addTaskSocket({
        userId: memberForAssignTask._id,
        roomId: familyRoom._id,
        name,
        description,
        startTime,
        endTime,
      })
    );
  };

  return (
    <ModalComponent>
      <Typography sx={{ fontSize: "18px", fontWeight: "400" }}>
        Task for{" "}
        <Typography
          component={"span"}
          sx={{ fontSize: "20px", fontWeight: "600" }}
        >
          {memberForAssignTask?.username}
        </Typography>
      </Typography>
      <ModalForm
        formHandleSubmit={formHandleSubmit}
        formInitialValues={formInitialValues}
        formValidationSchema={formValidationSchema}
      />
    </ModalComponent>
  );
};

export default AssignTaskModal;
