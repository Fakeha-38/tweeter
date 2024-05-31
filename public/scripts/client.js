/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const renderTweets = function(tweets) {
  // loops through tweets
  for (let single of tweets) {
    const $tweet = createTweetElement(single);
    console.log($tweet); // to see what it looks like
    $('#dynamic-tweets').append($tweet);
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweetObj) {
  const tweetHtml = `<article class="tweet-container">
  <header>
    <div class="user-dp">
      <img src="${tweetObj.user.avatars}" alt="${tweetObj.user.name} Avatar">
      <p>${tweetObj.user.name}</p>
    </div>
    <div class="user-handle">
    <p>${tweetObj.user.handle}</p>
    </div>
  </header>
  <div class="single-tweet">
    <p>${tweetObj.content.text}</p>
  </div>
  <footer>
    <div class="tweet-date">
      <p>${tweetObj.created_at}</p>
    </div>
    <div class="tweet-icons">
      <i class="fa-solid fa-font-awesome"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;
return tweetHtml;
}

renderTweets(data);

});
