import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviage = useNavigate();
  useEffect(() => {
    const getRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/data/rooms"
        );
        const { data } = response;
        console.log(data);
      } catch (error: any) {
        const { data } = error.response;
        alert(data.error);
        naviage("/");
      }
    };

    getRooms();
  }, []);
  return <div>Home</div>;
};

export default Home;
