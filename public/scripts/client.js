/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {

  $(".new-tweet form").submit((event) => {
    event.preventDefault()


    const formData = $(event.target).serialize();
    console.log("Serialized form data:", formData);

    $.ajax({
      mathod: "POST",
      url: "http://localhost:8080/api/tweets",
      data: formData,
    })
      .then((response) => {
        console.log("Server responded:", response);
        // reset form
        $(".new-tweet form").trigger("reset");
      })
      .catch((err) => {
        console.error("AJAX error:", err);
      });
  });
});

// const handleFormSubmission = (event) => {
//   event.preventDefault();

//   const formData = $(event.target).serialize();

//   console.log(event);
//   $.ajax({
//     method: "POST",
//     url: "http://localhost:8080/api/tweets",
//     data: formData,
//   })
//   .then((data) => {
//     const postElement = createPostElement(data);
//     $("main").prepend(postElement);
//     $("form").trigger("reset")
//   })
//   .catch((err) => console.error(err));
// };