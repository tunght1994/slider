import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mediaItemsT } from '../../App';
// Create an async thunk for fetching the data
export const fetchMediaItems = createAsyncThunk('mediaItems/fetchMediaItems', async () => {
    const data = mediaItemsT
    return data
    // try {
    //   const response = await fetch('your-api-endpoint');
    //   const data = await response.json('s');
    //   return data.mediaItems;
    // } catch (error) {
    //   throw new Error('Failed to fetch media items.');
    // }
  });

// Define the initial state
