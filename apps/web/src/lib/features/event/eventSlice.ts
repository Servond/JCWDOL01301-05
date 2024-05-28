import instance from '@/utils/axiosInstance';
import { Dispatch, createSlice } from '@reduxjs/toolkit';

type TheEvent = {
  eventName: string;
  eventDateTime: string;
  eventLocationName: string;
  eventLocationURL: string;
  eventDescription: string;
  eventBookingStart: string;
  eventBookingEnd: string;
  eventTnc: string;
  eventMaxCapacity: number;
  eventImage: string;
  isFree: boolean;
  eventCategoriesId: number;
  userId: number;
};

interface TheEvents {
  events: TheEvent[];
  event: TheEvent;
  page: number;
  limit: number;
  pages: number;
  rows: number;
}

const initialState: TheEvents = {
  event: {
    eventName: '',
    eventDateTime: '',
    eventLocationName: '',
    eventLocationURL: '',
    eventDescription: '',
    eventBookingStart: '',
    eventBookingEnd: '',
    eventTnc: '',
    eventMaxCapacity: 0,
    eventImage: '',
    isFree: false,
    eventCategoriesId: 0,
    userId: 0,
  },
  events: [],
  page: 0,
  limit: 10,
  pages: 0,
  rows: 0,
};

export const theEventSlice = createSlice({
  name: 'eventt',
  initialState,
  reducers: {
    theEventsState: (state, action) => {
      const { data, page, pageSize, totalRows, totalPage } = action.payload;
      state.events = data;
      state.page = page;
      state.limit = pageSize;
      state.pages = totalPage;
      state.rows = totalRows;
    },
    changePageState: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const fetchEvents =
  (page: number = 0, limit: number = 10) =>
  async (dispatch: Dispatch) => {
    try {
      console.log(page, '<<<<page');
      const { data } = await instance.get(
        `/organizer/event?${page ? 'page=' + page : ''}${
          limit ? '&pageSize=' + limit : ''
        }`,
      );
      dispatch(theEventsState(data));
    } catch (error) {
      console.log(error);
    }
  };

export const setPageChanged =
  (currentPage: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(changePageState(currentPage));
    } catch (error) {
      console.log(error);
    }
  };

export const { theEventsState, changePageState } = theEventSlice.actions;

export default theEventSlice.reducer;
