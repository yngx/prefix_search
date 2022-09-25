import React from "react";

const Word = ({word, handleSelection}) => {
    return (
        <div className="word" onClick={() => handleSelection(word)}>
            {word}
        </div>
    )
};

export default Word;