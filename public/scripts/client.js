/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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

  // Validating tweet form
  
  const validateForm = function (textLen) {
    if (textLen === 0 || textLen === null) {
      alert( "Youhave not entered tweet content" );
      return false;
    } else if (textLen > 140) {
      alert( "Your tweet content is longer than 140 characters");
      return false;
    }
    // let textSt = $('#tweet-text').val();
    return true;
  }


  // Event Listner to prevent the default behaviour of the form (Tweet form)
  // And then sending the form data using ajax post request
  $( ".new-tweet form" ).on( "submit", function ( event ) {
    event.preventDefault();
    const $tweetText = $.trim($('#tweet-text').val()).length;
    if (!validateForm($tweetText)) {  
      return;
    }

    console.log( "default " + event.type + " prevented", event );
    let dataSerial = $(this).serialize();
    $.ajax({
      url: "/tweets/",
      data: dataSerial,
      type: "POST"
    }) 
    .done( function (data) {
      console.log("The data has been sent to the server..I guess: ", data, typeof data);
      $('#tweet-text').val("");
      $('.counter').text('140').removeClass('neg-counter');
      $('#dynamic-tweets').empty(); // clear the tweet container
      loadTweets(); // load all tweets
    })
    .fail( function ( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem in submitting the tweet! Please try again" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.log( xhr );
    });
    
  });
  
  
});
