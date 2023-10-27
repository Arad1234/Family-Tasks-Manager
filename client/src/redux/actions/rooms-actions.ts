import {
  ICreateRoomsSocket,
  IDeleteMemeberSocket,
  IGetRoomsSocket,
  IJoinRoomSocket,
} from "@Types/index";
import {
  CREATE_ROOM_SOCKET,
  DELETE_ROOM_SOCKET,
  GET_ROOMS_BY_NAME_SOCKET,
  GET_ROOMS_SOCKET,
  JOIN_ROOM_SOCKET,
  LEAVE_ROOM_SOCKET,
} from "@Utils/constants/actionTypeConstants";

export const getRoomsSocket = ({ page, isIntersecting }: IGetRoomsSocket) => {
  return {
    type: GET_ROOMS_SOCKET,
    payload: { page, isIntersecting },
  };
};

export const createRoomSocket = ({
  maxMembers,
  roomName,
  roomPassword,
}: ICreateRoomsSocket) => {
  return {
    type: CREATE_ROOM_SOCKET,
    payload: { maxMembers, roomName, roomPassword },
  };
};

export const deleteRoomSocket = (roomId: string | undefined) => {
  return { type: DELETE_ROOM_SOCKET, payload: { roomId } };
};

export const joinRoomSocket = ({ roomId, roomPassword }: IJoinRoomSocket) => {
  return { type: JOIN_ROOM_SOCKET, payload: { roomId, roomPassword } };
};

export const deleteMemberSocket = ({
  memberId,
  roomId,
  source,
}: IDeleteMemeberSocket) => {
  console.log("memberId, roomId, source", memberId, roomId, source);
  return {
    type: LEAVE_ROOM_SOCKET,
    payload: { memberId, roomId, source },
  };
};

export const getRoomsByName = (searchQuery: string) => {
  return {
    type: GET_ROOMS_BY_NAME_SOCKET,
    payload: { searchQuery },
  };
};
