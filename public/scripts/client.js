/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //Trigger for a new tweet section
  $('.nav-button').on('click', function() {
    $('.new-tweet').slideToggle(500, 'linear');
    $('#tweet-text').focus(); 
  });
  
  //Back to Top button LOgic ----->
  // Scroll trigger, making the button visible
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 100) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });
  //Click trigger, making th ewindow go back to the top
  $('#back-to-top').on('click', function() {
    $("html, body").animate({scrollTop: 0}, 500);
  });

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
      // takes return value and prepends it to the tweets container
      $('#dynamic-tweets').prepend($tweet);
    }
  }
  // Escape function to prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
      <p>${escape(tweetObj.content.text)}</p>
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
  const validateForm = function () {
    const $tweetText = $.trim($('#tweet-text').val()).length;
    if ($tweetText === 0 || $tweetText === null) {
      // alert( "Youhave not entered tweet content" );
      $(".null-error-msg").slideDown(500).delay(5000).slideUp(500);
      return false;
    } else if ($tweetText > 140) {
      // alert( "Your tweet content is longer than 140 characters");
      $(".long-error-msg").slideDown(500).delay(5000).slideUp(500);
      return false;
    }
    // let textSt = $('#tweet-text').val();
    return true;
  }


  // Event Listner to prevent the default behaviour of the form (Tweet form)
  // And then sending the form data using ajax post request
  $( ".new-tweet form" ).on( "submit", function ( event ) {
    event.preventDefault();
    if (!validateForm()) {  
      return;
    }
    let dataSerial = $(this).serialize();
    $.ajax({
      url: "/tweets/",
      data: dataSerial,
      type: "POST"
    }) 
    .done( function (data) {
      $('#tweet-text').val("");
      $('.counter').text('140').removeClass('neg-counter');
      $.ajax({
        url: '/tweets',
        type: "GET",
        dataType: "json"
      })
      .done( dataSub => {
        // Calling function to prepend the latest tweets at the top of the timeline of the client
        const $tweet = createTweetElement(dataSub[(dataSub.length - 1)]);
        $('#dynamic-tweets').prepend($tweet);
      })
      .fail(( xhr, status, errorThrown ) => {
        alert( "Sorry, there was a problem in submitting the tweet! Please try again" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.log( xhr );
      });
    })
    .fail( function ( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem in submitting the tweet! Please try again" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.log( xhr );
    });
    
  });
  
  
});
