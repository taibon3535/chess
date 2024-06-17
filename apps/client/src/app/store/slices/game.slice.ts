import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chess, Color } from 'chess.js';

const game = new Chess();

const initialState = {
  fen: 'start',
  game,
  turn: game.turn(),
  isCheck: game.isCheck(),
  room: '',
  color: 'w',
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
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});

export const { setFen, setTurn, setIsCheck, setRoom, setColor } =
  gameSlice.actions;

export default gameSlice.reducer;
