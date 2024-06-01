/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // Dummy data for older tweets to show on client's timeline
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];
  //Fuction to make an ajax get requet to fetch dynamic data from /tweets
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json"
    })
    .done( data => {
      // Calling function to append the data-array tweets at the end of the timeline of the client
      renderTweets(data);
    })
    .fail(( xhr, status, errorThrown ) => {
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.log( xhr );
    });
  }
  loadTweets();
  // A function to render the tweets from the data-array and append it at the end of the section #dynamic-tweets
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let single of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(single);
      // console.log($tweet); // to see what it looks like
      // takes return value and appends it to the tweets container
      $('#dynamic-tweets').append($tweet);
    }
  }
  // A function to render the tweet data from the data-array into appendable html element 
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
        <p>${timeago.format(tweetObj.created_at)}</p>
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

  // Event Listner to prevent the default behaviour of the form (Tweet form)
  // And then sending the form data using ajax post request
  $( ".new-tweet form" ).on( "submit", ( event ) => {
    event.preventDefault();
    console.log( "default " + event.type + " prevented", event );
    let dataSerial = $(this).serialize();
    $.ajax({
      url: "/tweets",
      data: dataSerial,
      type: "POST"
    }) 
    .done((data) => {
      console.log("The data has been sent to the server..I guess: ", data, typeof data);
    })
    .fail(( xhr, status, errorThrown ) => {
      // alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.log( xhr );
    });
    
  });
  
  
});
