export interface CreateRoomPayload {
	roomName: string;
	maxMembers: number;
	roomPassword: string;
}

export interface JoinRoomPayload {
	roomId: string;
	userId: string;
	roomPassword: string;
}
