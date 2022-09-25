import React, {useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Search from './Search';
import SearchResultList from './SearchResultList';
import { searchCharacters } from './wordService';

function App() {
  const [wordList, setWordList] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const debouncedSearchWord = useDebounce(searchWord, 250);

  useEffect(
    () => {
      if (debouncedSearchWord) {
        // setIsSearching(true);
        searchCharacters(debouncedSearchWord).then((words) => {
          //setIsSearching(false);
          setWordList(words);
        });
      } else {
        setWordList([]);
        //setIsSearching(false);
      }
    },
    [debouncedSearchWord] // Only call effect if debounced search term changes
  );

  const handleChange = (e) => {
    const word = e.currentTarget.value;
    setSearchWord(word);
  }
 
  const handleSelection  = (word) => {
    console.log(`printing selected word: ${word}`);
  }

  return (
    <div className="App">
      <Header />
      <Search handleChange={handleChange} searchWord={searchWord}/>
      <p></p>
      <SearchResultList wordList={wordList} handleSelection={handleSelection} />
    </div>
  );
}

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export default App;
