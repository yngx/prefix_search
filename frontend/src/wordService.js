export function searchCharacters(searchWord) {
    return fetch(
        `http://localhost:3001/wordList?word=${searchWord}`, 
        {
            method: 'GET',
        }
    )
    .then(data => {
        return data.json();
    }).catch(err => {
        console.log(`in error ${err}`);
        return [];
    });
}