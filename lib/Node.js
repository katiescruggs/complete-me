class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.children = {};
    this.wordEnd = false;
  }
}

module.exports = Node;