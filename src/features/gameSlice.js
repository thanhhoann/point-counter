import { createSlice } from "@reduxjs/toolkit";

const GAME_STATUS = {
  STARTED: "STARTED",
  ENDED: "ENDED",
};

const initialState = {
  status: GAME_STATUS.ENDED,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setGameStarted: (state) => {
      state.status = GAME_STATUS.STARTED;
    },
    setGameEnded: (state) => {
      state.status = GAME_STATUS.ENDED;
    },
  },
});

export const { setGameStarted, setGameEnded } = gameSlice.actions;
export const selectGameStatus = (state) => state.game.status;

export default gameSlice.reducer;
