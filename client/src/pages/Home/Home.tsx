import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { Box } from "@mui/material";
import Loader from "@Components/Loader/Loader";
import { socket } from "@Socket/socket";
import AllRooms from "@Components/Home-UI/Room/AllRooms/AllRooms";
import { errorListeners } from "@Socket/Errors/Listeners";
import { removeErrorListeners } from "@Socket/Errors/RemoveListeners";
import { commonListeners } from "@Socket/Common/Listeners";
import { removeCommonListeners } from "@Socket/Common/RemoveListeners";
import HomeHeader from "@Components/Home-UI/Header/HomeHeader";
import connectionListeners from "@Socket/Connection/Listeners";
import socketIDListeners from "@Socket/SocketID/Listeners";
import removeSocketIDListeners from "@Socket/SocketID/RemoveListeners";
import AllModals from "@Components/Modal-Common/AllModals";
import { getRoomsSocket } from "@Redux/actions/rooms-actions";
import useCustomRef from "@Hooks/useCustomRef";

export const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const page = useAppSelector((state) => state.paginationReducer.page);
  const { loading, userId } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    commonListeners(dispatch);
    errorListeners(navigate, dispatch);
    socketIDListeners(location, navigate, dispatch);
    connectionListeners(userId as string);

    return () => {
      removeCommonListeners();
      removeErrorListeners();
      removeSocketIDListeners();
    };
  }, []);

  const ctx = useCustomRef(page);

  // Using callback ref to call the callBackRef function whenever there a ref is created in the child component ((node) => callBackRef(node)).
  const callBackRef = useCallback((node: HTMLDivElement | null) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(getRoomsSocket({ page: ctx.current, isIntersecting: true }));
        }
      },
      { threshold: 1 }
    );

    if (node !== null) {
      observer.observe(node);
    }
  }, []);

  useEffect(() => {
    dispatch(getRoomsSocket({ page }));
  }, []);

  return loading || !socket.connected ? (
    <Loader />
  ) : (
    <>
      <HomeHeader />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AllRooms ref={callBackRef} />
      </Box>

      <AllModals />
    </>
  );
};

export default Home;
