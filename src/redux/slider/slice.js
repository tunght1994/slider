import { createSlice } from "@reduxjs/toolkit";
import { fetchMediaItems } from "./action";

const initialState = {
    listMedia: {
      time: "",
      mediaItems: []
    },
  };
  
  
  const mediaItemsSlice = createSlice({
    name: 'mediaItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMediaItems.fulfilled, (state, action) => {
          state.listMedia = action.payload;
        })
    },
  });
  
  // Export the async thunk and the mediaItems reducer
  export default mediaItemsSlice.reducer