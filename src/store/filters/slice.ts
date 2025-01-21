import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PlayerFilter } from 'domain/models';

export interface FilterSliceState {
  playerFilter: PlayerFilter;
}

const initialState: FilterSliceState = {
  playerFilter: {
    instagram: '',
    name: '',
    totalKills: ''
  }
};

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    resetPlayerFilter(state: FilterSliceState) {
      state.playerFilter = initialState.playerFilter;
    },

    setPlayerFilter(state: FilterSliceState, action: PayloadAction<Partial<PlayerFilter>>) {
      state.playerFilter = {
        instagram:
          action.payload.instagram === undefined
            ? state.playerFilter.instagram
            : action.payload.instagram,
        name: action.payload.name === undefined ? state.playerFilter.name : action.payload.name,
        totalKills:
          action.payload.totalKills === undefined
            ? state.playerFilter.totalKills
            : action.payload.totalKills
      };
    }
  }
});

export const {
  reducer: filterReducer,
  actions: { resetPlayerFilter, setPlayerFilter }
} = filterSlice;
