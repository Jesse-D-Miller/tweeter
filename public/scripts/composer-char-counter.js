$(document).ready(function() {
  console.log("Ready!")

  $('.new-tweet textarea').on('input', function() {
    const remainingCharacterCount = 140 - $(this).val().length;
    console.log(remainingCharacterCount);
    $(this).closest('form').find('.counter').text(remainingCharacterCount);
    if (remainingCharacterCount < 0) {
      $('.counter').css('color', '#ff0000');
    } else {
      $('.counter').css('color', '#545149');
    }
  })
});