import { combineReducers } from "@reduxjs/toolkit";
import mediaItemsSlice from './slider/slice'

const rootReducer = combineReducers({
    mediaItemsSlice
})

export default rootReducer