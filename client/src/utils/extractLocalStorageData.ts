export const extractUserIdLocalStorage = () => {
  const persistedData = localStorage.getItem("persist:root");
  const parsedData = JSON.parse(persistedData as string);
  const parsedUserId = JSON.parse(parsedData.userId);
  return parsedUserId;
};
