class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = false;
    this.popularity = 0;
  }
}

module.exports = Node;