export const extractRoomsFromLocalStorage = () => {
  const persistedData = localStorage.getItem("persist:rooms");
  const parsedData = JSON.parse(persistedData as string);
  const parsedRooms = JSON.parse(parsedData.rooms);
  return parsedRooms;
};
