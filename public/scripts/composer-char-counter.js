$(document).ready(function() {
  console.log("Ready!")

  $('.new-tweet textarea').on('input', function() {
    const remainingCharacterCount = 140 - $(this).val().length;
    console.log(remainingCharacterCount);
    const counter = $(this).closest('form').find('.counter')

    counter.text(remainingCharacterCount);

    if (remainingCharacterCount < 0) {
      counter.addClass('negative');
    } else {
      counter.removeClass('negative');
    }
  })
});