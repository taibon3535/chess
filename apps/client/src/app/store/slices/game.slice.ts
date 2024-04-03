import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chess, Color } from 'chess.js';

const game = new Chess();

const initialState = {
  fen: 'start',
  game,
  turn: game.turn(),
  isCheck: game.isCheck(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setFen: (state, action: PayloadAction<string>) => {
      state.fen = action.payload;
    },
    setTurn: (state, action: PayloadAction<Color>) => {
      state.turn = action.payload;
    },
    setIsCheck: (state, action: PayloadAction<boolean>) => {
      state.isCheck = action.payload;
    },
  },
});

export const { setFen, setTurn, setIsCheck } = gameSlice.actions;

export default gameSlice.reducer;
