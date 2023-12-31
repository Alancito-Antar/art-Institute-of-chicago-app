/* eslint-disable import/no-cycle */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  cancelTriggerNotification,
  createTriggerNotification,
} from '../../helpers/notifee';
import { Event } from '../../services/events/types';
import { RootState } from '../store';
import {
  clearFavoritesDataFromStorage,
  loadFavoritesDataFromStorage,
  saveFavoritesDataToStorage,
} from './storage';

interface InitialState {
  events: Event[];
}

const initialState: InitialState = { events: [] };

// Loads the data from storage and updates the store
export const loadFavoritesData = createAsyncThunk<Event[] | undefined>(
  'favorites/loadFavoritesData',
  async (_, _thunkApi) => {
    const favorites = await loadFavoritesDataFromStorage();
    return favorites;
  },
);

// Saves the favorite data to storage and updates the store (if it already exists we remove it)
export const saveFavoritesData = createAsyncThunk<
  Event[] | undefined,
  Event,
  {
    state: RootState;
  }
>('favorites/saveFavoritesData', async (event, thunkApi) => {
  const currentState = thunkApi.getState().favorites;
  const currentEventIndex = currentState.events.findIndex(
    x => x.id === event.id,
  );

  const updatedFavoritesEvents: Event[] = [...currentState.events];

  if (currentEventIndex !== -1) {
    // Event is already on the list. Lets cancel the triggered notification and remove it from favorites.
    cancelTriggerNotification(event.id);
    updatedFavoritesEvents.splice(currentEventIndex, 1);
  } else {
    // If it does not exists, lets create notification trigger and add it to favorites.
    createTriggerNotification(event);
    updatedFavoritesEvents.push(event);
  }

  await saveFavoritesDataToStorage(updatedFavoritesEvents);
  return updatedFavoritesEvents;
});

// Remove the brands data from storage
export const clearFavoritesData = createAsyncThunk<void, void>(
  'favorites/clearFavoritesData',
  async (_, _thunkApi) => {
    // Remove top brands data from storage
    await clearFavoritesDataFromStorage();
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Loading
    builder.addCase(loadFavoritesData.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.events = action.payload;
    });

    // Saving
    builder.addCase(saveFavoritesData.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.events = action.payload;
    });

    // Clearing
    builder.addCase(clearFavoritesData.fulfilled, state => {
      state.events = initialState.events;
    });
  },
});

// Action creators are generated for each case reducer function

export default favoritesSlice;
