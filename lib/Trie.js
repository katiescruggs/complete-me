import Node from '../lib/Node.js';

class Trie {
  constructor() {
    this.root = new Node();
    this.num = 0;
    this.selections = {};
  }

  count() {
    return this.num;
  }

  populate(words) {
    words.forEach(word => {
      this.insert(word);
    });
  }

  select(word) {
    let currentNode = this.root;

    word = word.split('');
    word.forEach(letter => {
      currentNode = currentNode.children[letter];
    });
    currentNode.popularity++;
  }

  insert(word) {
    word = word.toLowerCase().split('');
    let currentNode = this.root;

    word.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    if (!currentNode.wordEnd) {
      this.num++;
    }
    currentNode.wordEnd = true;
  }

  suggest(phrase) {
    phrase = phrase.split('');
    let currentNode = this.root;

    phrase.forEach(letter => {
      if (currentNode && currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    });

    if (!currentNode || !currentNode.children) {
      return [];
    } else {
      return this.findSuggestions(currentNode, phrase.join(''), []);
    }
  }
  
  findSuggestions(currentNode, phrase, suggestions) {
    let childrenLetters = Object.keys(currentNode.children);

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push({word: newPhrase, selected: letterNode.popularity});
      }
      return this.findSuggestions(letterNode, newPhrase, suggestions);
    });

    return this.sortSuggestions(suggestions);
  }

  sortSuggestions(suggestions) {
    suggestions.sort((a, b) => {
      return b.selected - a.selected;
    });

    return suggestions.map(suggestion => {
      return suggestion.word;
    });
  }
}

module.exports = Trie;