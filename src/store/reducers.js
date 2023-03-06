import { combineReducers } from '@reduxjs/toolkit';
import { infoSlice } from './infos/slice';

export const rootReducer = combineReducers({
    infos: infoSlice.reducer
})