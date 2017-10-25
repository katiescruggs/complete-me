import { expect } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js';

import fs from 'fs';

const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('TRIE', () => {
  let trie;
  let node;

  beforeEach(() => {
    node = new Node();
    trie = new Trie();
  });

  it('should be a thing', () => {
    expect(trie).to.exist;
  });

  it('should have a root of a null node', () => {
    expect(trie.root).to.deep.equal(node);
  });

  it('should have a default count of 0', () => {
    expect(trie.num).to.equal(0);
  });
});

describe('INSERT', () => {
  let trie = new Trie();
  trie.insert('pizza');
  console.log(JSON.stringify(trie, null, 2));
  it('should have a root node with a p child', () => {
    expect(trie.root.children.hasOwnProperty('p')).to.equal(true);
  });

  it('should have an i child of the p child', () => {
    expect(trie.root.children['p'].children.hasOwnProperty('i')).to.equal(true);
  });

  it('should have a z child of the i child', () => {
    expect(trie.root.children['p'].children['i'].children.hasOwnProperty('z')).to.equal(true);
  });

  it('should have a z child of the z child', () => {
    expect(trie.root.children['p'].children['i'].children['z'].children.hasOwnProperty('z')).to.equal(true);
  });

  it('should have an a child of the second z child', () => {
    expect(trie.root.children['p'].children['i'].children['z'].children['z'].children.hasOwnProperty('a')).to.equal(true);
  });

  it('should set the wordEnd property of the last letter to true', () => {
    expect(trie.root.children['p'].children['i'].children['z'].children['z'].children['a'].wordEnd).to.equal(true);
  });

  it('should keep count of how many nodes there are', () => {
    expect(trie.count()).to.equal(1);
  });

  it('should dive into the tree to insert nodes if a word starts with an existing node', () => {
    trie.insert('piece');
    expect(trie.count()).to.equal(2);
    expect(trie.root.children['p'].children['i'].children.hasOwnProperty('z')).to.equal(true);
    expect(trie.root.children['p'].children['i'].children.hasOwnProperty('e')).to.equal(true);  
  });

  it('should not create duplicates if the same word is inserted more than once', () => {
    trie.insert('dog');
    trie.insert('dog');

    expect(trie.count()).to.equal(3);
    expect(trie.suggest('piz')).to.deep.equal(['pizza']);
  });

  it('should sanitize cases of words so that everything is lowercase', () => {
    trie.insert('Food');

    expect(trie.suggest('f')).to.deep.equal(['food']);
  });
});

describe('COUNT', () => {
  it('should return the count of nodes', () => {
    let trie = new Trie();
    expect(trie.count()).to.equal(0);
    trie.insert('pizza');
    expect(trie.count()).to.equal(1);
    trie.insert('apple');
    expect(trie.count()).to.equal(2);
  });
});


describe('POPULATE', () => {
  it('should fill the trie with the dictionary', () => {
    let trie = new Trie();
    trie.populate(dictionary);
    expect(trie.count()).to.equal(234371);
  });
});

describe('SUGGEST', () => {
  it('should take in a string and return an array', () => {
    let trie = new Trie();
    trie.insert('pizza');
    expect(trie.suggest('piz')).to.be.array;
  });

  it('should suggest all words matching the phrase parameter (small sample)', () => {
    let trie = new Trie();
    trie.insert('dead');
    trie.insert('dirt');
    trie.insert('done');
    trie.insert('donuts');

    expect(trie.suggest('d')).to.deep.equal(['dead', 'dirt', 'done', 'donuts']);
    expect(trie.suggest('do')).to.deep.equal(['done', 'donuts']);
  });

  it('should suggest all words matching the phrase parameter (large sample)', () => {
    let trie = new Trie();
    trie.populate(dictionary);
    expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  });

  it('should return empty array if the phrase does not match any words', () => {
    let trie = new Trie();
    trie.insert('piece');
    trie.insert('pizza');

    expect(trie.suggest('!')).to.deep.equal([]);
  });
});

describe('SELECT', () => {
  it('should update the value of the Node property popularity', () => {
    let trie = new Trie();
    trie.insert('hey');
    expect(trie.root.children['h'].children['e'].children['y'].popularity).to.equal(0);

    trie.select('hey');
    trie.select('hey');
    expect(trie.root.children['h'].children['e'].children['y'].popularity).to.equal(2);
  });


  it('should return prioritized items first when returning suggestions array (small sample)', () => {
    let trie = new Trie();
    trie.insert('dog');
    trie.insert('dingo');
    trie.insert('doppler');

    expect(trie.suggest('d')).to.deep.equal(['dog', 'doppler', 'dingo']);

    trie.select('dingo');

    expect(trie.suggest('d')).to.deep.equal(['dingo', 'dog', 'doppler']);
  });

  it('should return prioritized items first when returning suggestions array (large sample)', () => {
    let trie = new Trie();
    trie.populate(dictionary);

    expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);

    trie.select('pizza');
    trie.select('pizza');
    trie.select('pizzle');

    expect(trie.suggest('piz')).to.deep.equal(['pizza', 'pizzle', 'pize', 'pizzeria', 'pizzicato']);
  });
});


