// import "./App.css";
// import BookCards from "./components/books/Book";
// // import FormComponants from "./components/Form/Form";

// function App() {
//   return <>
//   {/* <FormComponants/> */}
//   <BookCards/>
//   </>;
// }

// export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchBooks, 
  setSearchQuery, 
  toggleBookCheck, 
  selectSearchQuery, 
  selectCheckedBooks, 
  selectFilteredBooks 
} from './store/slices/booksSlice';

import SearchBar from './components/books/SearchBar';
import BookGrid from './components/books/BookGrid';
import BookCard from './components/books/BookCard';

function App() {
  const dispatch = useDispatch();
  
  // Connect cleanly to Redux state selectors
  const filteredBooks = useSelector(selectFilteredBooks);
  const searchQuery = useSelector(selectSearchQuery);
  const checkedBooks = useSelector(selectCheckedBooks);
  const { loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Handle derived calculations for checked items count
  const checkedCount = Object.values(checkedBooks).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* App Title Header Banner */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            mekBot's Digital Library Log
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Dynamically search the book collection and check off items on the list.
          </p>
          {checkedCount > 0 && (
            <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 shadow-sm animate-fade-in">
              🚀 {checkedCount} Book{checkedCount > 1 ? 's' : ''} Selected
            </div>
          )}
        </header>

        {/* Global Component Search Filters Element Bar */}
        <SearchBar 
          value={searchQuery}
          onChange={(val) => dispatch(setSearchQuery(val))}
          placeholder="Filter by title or author name..."
        />

        {/* Dynamic Network Status Component Configurations */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500 animate-pulse">Syncing library log elements...</p>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-2xl max-w-md mx-auto text-center shadow-sm">
            ⚠️ <span className="font-semibold">Network Sync Fault:</span> {error}
          </div>
        )}

        {/* Empty Search Data Fallbacks Structure */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-200 border-dashed rounded-3xl max-w-md mx-auto shadow-sm">
            <p className="text-gray-400 font-medium mb-1">No book matching parameters found</p>
            <p className="text-xs text-gray-400">Try checking spelling or adjusting query filters.</p>
          </div>
        )}

        {/* Render Structural Elements Collection */}
        {!loading && !error && filteredBooks.length > 0 && (
          <BookGrid>
            {filteredBooks.map((entry, index) => {
              const { work, logged_date } = entry;
              const uniqueKey = work.key || `book-${index}`;
              const isItemChecked = !!checkedBooks[uniqueKey];

              return (
                <BookCard
                  key={uniqueKey}
                  work={work}
                  loggedDate={logged_date}
                  isChecked={isItemChecked}
                  onToggleCheck={() => dispatch(toggleBookCheck(uniqueKey))}
                />
              );
            })}
          </BookGrid>
        )}
        
      </div>
    </main>
  );
}

export default App;
