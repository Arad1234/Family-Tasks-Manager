import Room from "../models/room.model";
import Task from "../models/task.model";
import { DeleteMemberSchemaType } from "../schema/member/deleteMember.schema";

export const deleteMember = async (payload: DeleteMemberSchemaType) => {
  const { memberId, roomId } = payload;
  try {
    const room = await Room.findOne({ _id: roomId });

    const memberToDelete = room?.familyMembers.find(
      (member) => member.userId.toString() === memberId
    );

    // Delete all the tasks of the member
    if (memberToDelete && memberToDelete.tasks.length > 0) {
      memberToDelete.tasks.map(async (taskId) => {
        const taskToDelete = await Task.findOne({ _id: taskId });
        await taskToDelete?.deleteOne();
      });
    }

    // Delete the member from the room's family members.
    if (room) {
      room.familyMembers = room.familyMembers.filter((member) => {
        return member.userId.toString() !== memberId;
      });
    }

    await room?.save();
  } catch (error: any) {
    throw new Error(error);
  }
};
