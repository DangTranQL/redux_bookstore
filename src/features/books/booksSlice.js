import { createSlice } from '@reduxjs/toolkit';
import api from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    error: null,
    addingBook: null,
    bookid: null,
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
        state.bookid = getBooks.id;
    },
  },
});

export default slice.reducer;

export const addBook =
  ({ book }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await api.post(`/favorites`, book);
      dispatch(slice.actions.createPostSuccess(response.data));
      toast.success("The book has been added to the reading list!");
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