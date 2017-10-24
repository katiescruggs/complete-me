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

    let currentNode = this.root;
    let currentChildren = this.root.children;


    word.forEach( letter => {
      if(!currentChildren[letter]) {
        currentChildren[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
      currentChildren = currentChildren[letter].children;
    });

    currentNode.wordEnd = true;
  }

  findEnd(currentPosition, currentLetter) {
    if(currentPosition[currentLetter].wordEnd) {
      return currentPosition[currentLetter].letter;
    }
    let childrenLetters = Object.keys(currentPosition);

    for(let i = 0; i < childrenLetters.length; i++) {
      currentPosition = currentPosition[childrenLetters[0]];
    }

    return [currentPosition.letter, ...this.findEnd(currentPosition, currentLetter)];
  }

  suggest(phrase) {
    let result = [];
    phrase = phrase.split('');

    let currentPosition = this.root.children;
    let currentLetter;

    let word = [];
    for(let i = 0; i < phrase.length; i++) {
      word.push(phrase[i]);
      currentPosition = currentPosition[phrase[i]].children;
      currentLetter = phrase[i];
    }

    word = [...word, ...this.findEnd(currentPosition, currentLetter)];

    result.push(word.join(''));

    console.log(result);
    return result;
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