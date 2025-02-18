import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Player } from 'domain/models';

export interface PlayerSliceState {
  playerSelected: { [key in string]: Player };
}

const initialState: PlayerSliceState = {
  playerSelected: {}
};

const playerSlice = createSlice({
  initialState,
  name: 'player',
  reducers: {
    addPlayer(state: PlayerSliceState, action: PayloadAction<Player[]>) {
      const allData = { ...state.playerSelected };

      action.payload.forEach((payload) => {
        Object.assign(allData, { [payload.id]: payload });
      });

      state.playerSelected = allData;
    },
    removePlayer(state: PlayerSliceState, action: PayloadAction<string[]>) {
      const allData = { ...state.playerSelected };

      action.payload.forEach((payload) => {
        delete allData?.[payload];
      });

      state.playerSelected = allData;
    },
    resetPlayer(state: PlayerSliceState) {
      state.playerSelected = {};
    }
  }
});

export const {
  reducer: playerReducer,
  actions: { addPlayer, removePlayer, resetPlayer }
} = playerSlice;
