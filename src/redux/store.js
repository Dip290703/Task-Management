// src/redux/store.js (or wherever your store is defined)

import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boardsSlice";
import data from "../data.json";

// 🔹 Load boards state from localStorage
const loadBoardsFromLocalStorage = () => {
 try {
    const stored = localStorage.getItem("taskAppData");
    if (stored) return JSON.parse(stored);

    // Set first board to isActive: true (only on first load)
    const boardsFromJSON = [...data.boards];
    if (boardsFromJSON.length) boardsFromJSON[0].isActive = true;

    localStorage.setItem("taskAppData", JSON.stringify(boardsFromJSON));
    return boardsFromJSON;
  } catch (e) {
    console.error("Failed to load from localStorage", e);
    return [];
  }
};

// 🔹 Save boards state to localStorage
const saveBoardsToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.boards);
    localStorage.setItem("taskAppData", serializedState);
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

// 🔹 Create store with preloaded state
const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
  preloadedState: {
    boards: loadBoardsFromLocalStorage(), // <- loaded from localStorage
  },
});

// 🔹 Subscribe to state changes and save to localStorage
store.subscribe(() => {
  saveBoardsToLocalStorage(store.getState());
});

export default store;
