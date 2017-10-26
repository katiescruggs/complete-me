const Node = require('./lib/Node.js');
const Trie = require('./lib/Trie.js');

module.exports = {
  Node,
  Trie
};

import $ from 'jquery'
global.jQuery = require('jquery');

const text = "./lib/web2";
let trie = new Trie();

$.get(text, function (data) {
  let words = data;
  let dictionary = words.toString().trim().split('\n');

  trie.populate(dictionary);
});

$('.user-input').on('keyup', function() {
  $('.result-section').text('');
  
  if($('.user-input').val().length > 2) {
    displayResults($('.user-input').val());
  }
});

$('.result-section').on('click', '.result', function(e) {
  trie.select($(this).text());

  $('.result').toggleClass('hide');
  $(this).toggleClass('hide');

  $('.user-input').val('');
  $('.user-input').focus();
});

function displayResults(userPhrase) {
  let resultArray = trie.suggest(userPhrase);

  resultArray.forEach(result => {
    $('.result-section').append(`<section class="result">${result}</result>`);
  });
}