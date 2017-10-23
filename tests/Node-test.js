import { expect } from 'chai';
import Node from '../lib/Node.js';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should be a thing', () => {
    expect(node).to.exist;
  });

  it('should default letter to null', () => {
    expect(node.letter).to.equal(null);
  });

  it('should have a default children property of empty object', function() {
    expect(node.children).to.deep.equal({});
  });

  it('should have a default wordEnd property of false', function() {
    expect(node.wordEnd).to.equal(false);
  });

  it('should take in a letter', () => {
    node = new Node('a');
    expect(node.letter).to.equal('a');
  });

});
