import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chess } from 'chess.js';

const initialState = {
  fen: 'start',
  game: new Chess(),
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setFen: (state, action: PayloadAction<string>) => {
      state.fen = action.payload;
    },
  },
});

export const { setFen } = gameSlice.actions;

export default gameSlice.reducer;
