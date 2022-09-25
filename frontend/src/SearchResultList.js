import React from 'react';
import Word from './Word';

const SearchResultList  = ({wordList, handleSelection}) => {
    return (
        <div> 
            {wordList?.map((word, index) => {
                return (
                    <Word word={word} handleSelection={handleSelection} key={index}/>
                )
            })}
        </div>
    )
};

export default SearchResultList;