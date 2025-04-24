/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//jQuery targeting entire document
$(document).ready(() => {

  //jQuery targets the tweet submit form triggers when submit event is activated
  $("#new-tweet-form").submit((event) => {

    //prevents full page reload
    event.preventDefault()

    //saves the tweet (serialised) into a variable
    const formData = $(event.target).serialize();
    console.log("Serialized form data:", formData);

    //tweet validation goes here
    validateTweetInput();

    //idk what ajax does and how it invokes an implicit promise
    //note: i kind of get this now
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/api/tweets",
      data: formData,
    })
    //promise with a response from the server and a form reset or an error 
    .then((response) => {
      console.log("Server responded:", response);
      // reset form
      $(event.target).trigger("reset");
      $(".counter").text(140);
    })
    .catch((err) => {
      console.error("AJAX error:", err);
    });
  });
  
  const loadTweets = () => {
    //ajax/jquery get request to get tweet data from /api/tweets
    $.ajax({
      method: "GET",
      url: "http://localhost:8080/api/tweets",
      // data: user,
    })
    //promise with a response from the server and a form reset or an error 
    .then((response) => {
      console.log("Server responded:", response);
      // reset form
      renderTweets(response);
    })
    .catch((err) => {
      console.error("AJAX error:", err);
    });
  }
  
  loadTweets();
});

//loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  //empty the container before appending
  $(".tweets-container").empty();
  
  for (const tweet of tweets) {
    const tweetElement = createTweetElement(tweet);
    $(".tweets-container").prepend(tweetElement);
  }
};

const createTweetElement = (tweet) => {
  const { user, content, created_at } = tweet;
  
  const $article = $("<article>").addClass("tweet");
  
  // header
  const $header = $("<header>");
  const $headerDiv = $("<div>");
  const $img = $("<img>").attr("src", user.avatars).attr("alt", "avatar image");
  const $username = $("<span>").text(user.name);
  const $userHandle = $("<span>").text(user.handle).addClass("handle");
  $headerDiv.append($img, $username);
  $header.append($headerDiv, $userHandle);
  
  // content
  const $p = $("<p>").text(content.text);
  
  // footer
  const $footer = $("<footer>");
  const $postedDate = $("<span>").text(timeago.format(created_at));
  const $iconsDiv = $("<div>");
  const $flagIcon = $("<i>").addClass("fa-solid fa-flag");
  const $retweetIcon = $("<i>").addClass("fa-solid fa-retweet");
  const $heartIcon = $("<i>").addClass("fa-solid fa-heart");
  $iconsDiv.append($flagIcon, $retweetIcon, $heartIcon);
  $footer.append($postedDate, $iconsDiv);
  
  //assemble tweet
  $article.append($header, $p, $footer);
  
  return $article;
}

const validateTweetInput = () => {
  let tweetContent = $('.new-tweet textarea').val().trim();
  if (tweetContent.length > 140) {
    alert("Character limit exceeded");
    return;
  } else if (tweetContent === null || tweetContent === "") {
    alert("Cannot submit a blank form")
    return;
  }
}