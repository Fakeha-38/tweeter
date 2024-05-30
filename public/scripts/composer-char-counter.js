$(document).ready(function() {
  // --- our code goes here ---
  const maxlength = 140;
  $('#tweet-text').on("input", function() {
    let currentLength = $(this).val().length;
    let charLeft = maxlength - currentLength;
    $('.counter').text(charLeft);
    if (charLeft >= 0) {
      $('.counter').removeClass('neg-counter');
    } else if (charLeft < 0) {
      $('.counter').addClass('neg-counter');
    }
    });  
});
