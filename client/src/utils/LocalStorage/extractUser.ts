export const extractUserFromLocalStorage = () => {
  const persistedData = localStorage.getItem("persist:userData");
  const parsedData = JSON.parse(persistedData as string);
  const parsedUserId = JSON.parse(parsedData.userId);
  const parsedUsername = JSON.parse(parsedData.username);
  return { parsedUserId, parsedUsername };
};
