export const extractUserLocalStorage = () => {
  const persistedData = localStorage.getItem("persist:root");
  const parsedData = JSON.parse(persistedData as string);
  const parsedUserId = JSON.parse(parsedData.userId);
  const parsedUsername = JSON.parse(parsedData.username);
  console.log(parsedUsername);
  return { parsedUserId, parsedUsername };
};
