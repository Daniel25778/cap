import { createSlice } from '@reduxjs/toolkit';
import type { MatchFilter } from 'domain/models/match';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PlayerFilter } from 'domain/models';

export interface FilterSliceState {
  playerFilter: PlayerFilter;
  matchFilter: MatchFilter;
}

const initialState: FilterSliceState = {
  matchFilter: {
    date: null,
    name: '',
    sort: null,
    sortBy: null,
    type: null
  },
  playerFilter: {
    instagram: '',
    name: '',
    nickname: '',
    sort: null,
    sortBy: null
  }
};

const filterSlice = createSlice({
  initialState,
  name: 'filter',
  reducers: {
    resetMatchFilter(state: FilterSliceState) {
      state.matchFilter = initialState.matchFilter;
    },
    resetPlayerFilter(state: FilterSliceState) {
      state.playerFilter = initialState.playerFilter;
    },

    setMatchFilter(state: FilterSliceState, action: PayloadAction<Partial<MatchFilter>>) {
      state.matchFilter = {
        date: action.payload.date === undefined ? state.matchFilter.date : action.payload.date,
        name: action.payload.name === undefined ? state.matchFilter.name : action.payload.name,
        sort: action.payload.sort === undefined ? state.matchFilter.sort : action.payload.sort,
        sortBy:
          action.payload.sortBy === undefined ? state.matchFilter.sortBy : action.payload.sortBy,
        type: action.payload.type === undefined ? state.matchFilter.type : action.payload.type
      };
    },
    setPlayerFilter(state: FilterSliceState, action: PayloadAction<Partial<PlayerFilter>>) {
      state.playerFilter = {
        instagram:
          action.payload.instagram === undefined
            ? state.playerFilter.instagram
            : action.payload.instagram,
        name: action.payload.name === undefined ? state.playerFilter.name : action.payload.name,
        nickname:
          action.payload.nickname === undefined
            ? state.playerFilter.nickname
            : action.payload.nickname,
        sort: action.payload.sort === undefined ? state.playerFilter.sort : action.payload.sort,
        sortBy:
          action.payload.sortBy === undefined ? state.playerFilter.sortBy : action.payload.sortBy
      };
    }
  }
});

export const {
  reducer: filterReducer,
  actions: { resetPlayerFilter, setMatchFilter, resetMatchFilter, setPlayerFilter }
} = filterSlice;
