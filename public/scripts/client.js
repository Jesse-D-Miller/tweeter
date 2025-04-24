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

    //idk what ajax does and how it invokes an implicit promise
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
});

//data and helper functions

// Fake data taken from initial-tweets.json
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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
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
  const $postedDate = $("<span>").text(created_at);
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

renderTweets(data);