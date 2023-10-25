import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@Redux/hooks";
import { Box } from "@mui/material";
import Loader from "@Components/Loader/Loader";
import { socket } from "@Socket/socket";
import AllRooms from "@Components/Home-UI/Room/AllRooms/AllRooms";
import HomeHeader from "@Components/Home-UI/Header/HomeHeader";
import AllModals from "@Components/Modal-Common/AllModals";
import {
  getRoomsSocket,
  initializeCommonListeners,
  initializeConnectionListeners,
  initializeErrorListeners,
} from "@Redux/actions/rooms-actions";
import useCustomRef from "@Hooks/useCustomRef";

export const Home = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const page = useAppSelector((state) => state.paginationReducer.page);
  const isSearchRoom = useAppSelector(
    (state) => state.roomsReducer.isSearchRoom
  );
  const { loading, userId } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (userId) {
      dispatch(initializeConnectionListeners());
    }
  }, [userId]);

  useEffect(() => {
    dispatch(initializeCommonListeners({ navigate, location }));
    dispatch(initializeErrorListeners({ navigate }));
  }, [location, navigate]);

  // Using custom ref to avoid useCallback closure.
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
        {isSearchRoom ? (
          <Loader height="88vh" />
        ) : (
          <AllRooms ref={callBackRef} />
        )}
      </Box>

      <AllModals />
    </>
  );
};

export default Home;
