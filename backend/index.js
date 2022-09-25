const express = require('express');
const process = require('process');
const cors = require('cors');

const app = express()
const dataStore = require('./data/dataStore');

const PORT = 3001;
app.use(cors());

let wordStore;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/wordList', (req, res) => {
    try{

        const searchWord = req.query.word;
        const wordList = wordStore.find(searchWord);

        res.setHeader('content-type', 'application/json')
        res.status(200).send(JSON.stringify(wordList));
    } catch (err) {
        console.log(`error in get: ${err}`);
        res.status(500);
    }
});

app.listen(PORT, async () => {

    console.time('bootup');
    wordStore = await dataStore.processWordListAsync();
    console.timeEnd('bootup');

    for (const [key,value] of Object.entries(process.memoryUsage())){
        console.log(`Memory usage by ${key}, ${value/1000000}MB `)
    }
    
    console.log(`Server running on port ${PORT}`);
});