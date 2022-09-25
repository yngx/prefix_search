const data = require('./trie');

const t = new data.Trie();
t.insert('apple');
t.insert('applesauce');
const prefix = t.find('app');
console.log(prefix);