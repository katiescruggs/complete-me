import Node from '../lib/Node.js';

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
      currentPosition[word[i]] = new Node(word[i]);
      currentPosition = currentPosition[word[i]].children;
      currentParent = currentParent.children[word[i]]
    }
    currentParent.wordEnd = true;

  }

  suggest() {

  }

  populate() {

  }

  count() {
    return this.num;
  }

  select() {

  }
}

module.exports = Trie;