const TrieNode = function(key) {

    this.key = key;
    this.parent = null;
    this.children = {};
    this.end = false;

    this.getWord = function() {
        const output = [];
        let node = this;

        while (node !== null) {
            output.unshift(node.key);
            node = node.parent;
        }

        return output.join('');
    };
}

const Trie = function() {
    this.root = new TrieNode(null);

    this.insert = function(word) {
        let node = this.root;
        for(let i = 0; i < word.length; i++) {
            if(!node.children[word[i]]) {
                node.children[word[i]] = new TrieNode(word[i]);
                node.children[word[i]].parent = node;
            }
    
            node = node.children[word[i]];
            if (i == word.length-1) {
                node.end = true;
            }
        }
    };

    this.contains = function(word) {
        let node = this.root;

        for(let i = 0; i < word.length; i++) {
            if(node.children[word[i]]) {
                node = node.children[word[i]];
            } else {
                return false;
            }
        }

        findAllWords(node, output);

        return node.end;
    };

    this.find = function(prefix) {
        let node = this.root;
        let output = [];
    
        // for every character in the prefix
        for(let i = 0; i < prefix.length; i++) {
          // make sure prefix actually has words
          if (node.children[prefix[i]]) {
            node = node.children[prefix[i]];
          } else {
            // there's none. just return it.
            return output;
          }
        }
    
        // recursively find all words in the node
        findAllWords(node, output);
    
        return output;
    };
      
    // recursive function to find all words in the given node.
    const findAllWords = (node, arr) => {
        if (arr.length > 20) {
            return;
        }
    
        // base case, if node is at a word, push to output
        if (node.end) {
          arr.unshift(node.getWord());
        }
    
        // iterate through each children, call recursive findAllWords
        for (let child in node.children) {
          findAllWords(node.children[child], arr);
        }
    };

}

exports.Trie = Trie;