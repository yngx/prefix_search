import React from 'react';

const Search = ({handleChange, searchWord}) => {    
    return(
        <form>
            <label>Search for a word: </label>
            <input id="searchBox" type="text" placeholder='type a word' onChange={handleChange}></input>
        </form>
    )
}

export default Search;