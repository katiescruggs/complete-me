import Node from '../lib/Node.js';

class Trie {
  constructor() {
    this.root = new Node();
    this.num = 0;
    this.selections = {};
  }

  insert(word) {
    word = word.toLowerCase().split('');
    let currentNode = this.root;
    let currentChildren = this.root.children;

    word.forEach( letter => {
      if (!currentChildren[letter]) {
        currentChildren[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
      currentChildren = currentChildren[letter].children;
    });
    if(!currentNode.wordEnd) {
      this.num++;
    }
    currentNode.wordEnd = true;
  }

  findSuggestions(currentNode, phrase) {
    let childrenLetters = Object.keys(currentNode.children);
    let suggestions = [];
    // [ {word: 'w', popularity: 2}]

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newPhrase = phrase + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push(newPhrase);
      }
      suggestions.push(...this.findSuggestions(letterNode, newPhrase));
    });

    return this.prioritizeSuggestions(suggestions);
  }

  suggest(phrase) {
    phrase = phrase.split('');
    let currentNode = this.root;

    phrase.forEach(letter => {
      currentNode = currentNode.children[letter];
    });

    if(!currentNode) {
      return [];
    }

    return this.findSuggestions(currentNode, phrase.join(''));
  }

  populate(words) {
    words.forEach(word => {
      this.insert(word);
    });
  }

  count() {
    return this.num;
  }

  select(word) {
    if (this.selections[word]) {
      this.selections[word]++;
    } else {
      this.selections[word] = 1; 
    }
  }

  prioritizeSuggestions(suggestions) {
    suggestions.forEach(word => {
      if (!this.selections[word]) {
        this.selections[word] = 0;
      }
    });
    for (let j = 0; j < suggestions.length; j++) {
      for (let i = 0; i < suggestions.length - 1; i++) {
        if (this.selections[suggestions[i]] <
            this.selections[suggestions[i + 1]]) {
          let temp = suggestions[i];

          suggestions[i] = suggestions[i + 1];
          suggestions[i + 1] = temp;
        }
      }
    }
    return suggestions;
  }
}

module.exports = Trie;