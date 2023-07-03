import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Circles } from "react-loader-spinner";
import { getRoomsThunk } from "../../store/actions/rooms-actions";
import { reset } from "../../store/slices/auth-slice";
import CreateRoomModal from "../Modals/CreateRoomModal/CreateRoomModal";

const Home = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.authReducer);
  const { rooms } = useAppSelector((state) => state.roomsReducer);
  const navigate = useNavigate();

  const handleCreateRoom = () => {};

  useEffect(() => {
    const getRooms = async () => {
      const response = await dispatch(getRoomsThunk());
      if (response.error) {
        alert(response.payload);
        dispatch(reset());
        navigate("/");
      }
    };
    getRooms();
  }, []);

  if (loading) {
    console.log(loading);
    return (
      <Circles
        height="80"
        width="80"
        color="green"
        ariaLabel="loading"
      />
    );
  }
  return (
    <div>
      {rooms.map((room) => {
        return (
          <div key={room.roomName}>
            <h3>{room.roomName}</h3>
            <p>{room.familyMembers}</p>
          </div>
        );
      })}
      <button onClick={handleCreateRoom}>Create Room</button>
      <CreateRoomModal />
    </div>
  );
};

export default Home;
