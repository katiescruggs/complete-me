import { expect } from 'chai';
import Node from '../lib/Node.js';
import Trie from '../lib/Trie.js';


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

  it('should dive into the tree to insert nodes if a word starts with an existing node', function() {
    trie.insert('piece');
    expect(trie.count()).to.equal(2);
    expect(trie.root.children['p'].children['i'].children.hasOwnProperty('z')).to.equal(true);
    expect(trie.root.children['p'].children['i'].children.hasOwnProperty('e')).to.equal(true);  
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
    trie.populate();
  });
});

describe('SUGGEST', () => {
  it('should return an array', () => {
    let trie = new Trie();
    //trie.populate();
    trie.insert('pizza');
    expect(trie.suggest('piz')).to.be.array;
    expect(trie.suggest('piz')).to.deep.equal(['pizza']);

  });

});


