import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filters/slice';
import { persistReducer, persistStore } from 'redux-persist';
import { persistReducer as persistedReducer } from './persist/slice';
import { playerReducer } from './player/slice';
import { redirectReducer } from './redirect/slice';
import { sidebarReducer } from './sidebar/slice';
import { useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import type { TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage
};

const persisted = persistReducer(persistConfig, persistedReducer);

const rootReducer = combineReducers({
  filter: filterReducer,
  persist: persisted,
  player: playerReducer,
  redirect: redirectReducer,
  sidebar: sidebarReducer
});

export const store = configureStore({ middleware: [thunkMiddleware], reducer: rootReducer });
export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
