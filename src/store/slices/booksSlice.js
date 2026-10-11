import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk to fetch data using native fetch API
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://openlibrary.org/people/mekBot/books/want-to-read.json');
      if (!response.ok) throw new Error('Failed to retrieve reading log entries.');
      const data = await response.json();
      return data.reading_log_entries || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,
    searchQuery: '',
    // Keeps track of checked states indexed by unique book work keys
    checkedBooks: {}, 
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    toggleBookCheck: (state, action) => {
      const bookKey = action.payload;
      state.checkedBooks[bookKey] = !state.checkedBooks[bookKey];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearchQuery, toggleBookCheck } = booksSlice.actions;

// Optimized Memoized Selectors for UI consumption
export const selectAllBooks = (state) => state.books.items;
export const selectSearchQuery = (state) => state.books.searchQuery;
export const selectCheckedBooks = (state) => state.books.checkedBooks;

// Selector to handle search filtering computation in one clean place
export const selectFilteredBooks = (state) => {
  const books = state.books.items;
  const query = state.books.searchQuery.toLowerCase().trim();
  
  if (!query) return books;
  
  return books.filter((entry) => {
    const titleMatch = entry.work.title?.toLowerCase().includes(query);
    const authorMatch = entry.work.author_names?.some(author => 
      author.toLowerCase().includes(query)
    );
    return titleMatch || authorMatch;
  });
};

export default booksSlice.reducer;
