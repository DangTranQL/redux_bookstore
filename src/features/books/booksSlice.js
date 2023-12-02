import { createSlice } from '@reduxjs/toolkit';
import api from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    error: null,
    addingBook: null,
    removingBook: null,
    gettingBooks: null,
    book: null,
    bookslist: [],
  };

export const slice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    startLoading(state) {
        state.isLoading = true;
    },
    hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
    },
    addBookSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const newBook = action.payload;
        state.addingBook = newBook.id;
    },
    getBookSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const getBooks = action.payload;
        state.book = getBooks;
    },
    removeBookSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const removeBook = action.payload;
        state.removingBook = removeBook.id;
    },
    getFavoriteSuccess(state, action) {
        state.isLoading = false;
        state.error = null;
        const allBooks = action.payload;
        state.bookslist = allBooks;
        console.log("ALLBOOKS", state.bookslist);
    }
  },
});

export default slice.reducer;

export const addBook =
  (book) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.post(`/favorites`, book);
      dispatch(slice.actions.addBookSuccess(response.data));
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const removeBooks =
  ({ bookId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.delete(`/favorites/${bookId}`);
      dispatch(slice.actions.removeBookSuccess(response.data));
      toast.success("The book has been removed");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getBook = 
    ({ bookId }) =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
        const response = await api.get(`/books/${bookId}`);
        dispatch(slice.actions.getBookSuccess(response.data));
        } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
        }
    };

export const getFavorite = 
    () =>
    async (dispatch) => {
        dispatch(slice.actions.startLoading());
        try {
        const response = await api.get(`/favorites`);
        dispatch(slice.actions.getFavoriteSuccess(response.data));
        } catch (error) {
        dispatch(slice.actions.hasError(error.message));
        toast.error(error.message);
        }
    }