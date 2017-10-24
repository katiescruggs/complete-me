import Node from '../lib/Node.js';
import fs from 'fs';

const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

class Trie {
  constructor() {
    this.root = new Node();
    this.num = 0;
  }

  insert(word) {
    this.num++;
    word = word.split('');

    let currentPosition = this.root.children;
    let currentParent = this.root;

    for(let i = 0; i < word.length; i++) {
      if(!currentPosition.hasOwnProperty(word[i])) {
        currentPosition[word[i]] = new Node(word[i]);
      }
        currentPosition = currentPosition[word[i]].children;
        currentParent = currentParent.children[word[i]];
    }
    currentParent.wordEnd = true;

  }

  suggest() {

  }

  populate() {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  count() {
    return this.num;
  }

  select() {

  }
}

module.exports = Trie;