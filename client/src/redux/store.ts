import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import roomsSliceReducer from "./slices/Rooms/rooms-slice";
import persistedAuthReducer from "./slices/Auth/auth-slice";
import modalSliceReducer from "./slices/Modal/modal-slice";
import calendarEventsSliceReducer from "./slices/CalendarEvents/CalendarEvents";
import membersSliceReducer from "./slices/FamilyRoom/members-slice";
import familyRoomSliceReducer from "./slices/FamilyRoom/familyRoom-slice";
import burgerMenuSliceReducer from "./slices/BurgerMenu/burgerMenu-slice";
import paginationSliceReducer from "./slices/Pagination/pagination-slice";
import { roomsSocketMiddleware } from "./middlewares/roomsSocketMiddleware";
import { familyRoomSocketMiddleware } from "./middlewares/familyRoomSocketMiddleware";
import { initializeListenersMiddleware } from "./middlewares/initializeListenersMiddleware";

export const store = configureStore({
  reducer: {
    authReducer: persistedAuthReducer,
    roomsReducer: roomsSliceReducer,
    familyRoomReducer: familyRoomSliceReducer,
    modalReducer: modalSliceReducer,
    calendarEventsReducer: calendarEventsSliceReducer,
    membersReducer: membersSliceReducer,
    burgerMenuReducer: burgerMenuSliceReducer,
    paginationReducer: paginationSliceReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      initializeListenersMiddleware,
      roomsSocketMiddleware,
      familyRoomSocketMiddleware,
    ]),
});

// Give redux the option to make the store persistent throughout page reloads.
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
