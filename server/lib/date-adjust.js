"use strict";

// Update tweets with recent dates
const dateAdjust = (db) => {
  // One day in milliseconds is 86400000ms or...
  // oneDayMs = 1000 milliseconds * 60 seconds * 60 minutes * 24 hours.
  const oneDayMs = 1000 * 60 * 60 * 24
  // Subtract one day in milliseconds (oneDayMs) times the tweets length minus the current index.
  // This keeps the newest tweets at the bottom, and allows for further tweets to be added.
  const updatedTweets = db.tweets.map((tweet, index) => {
    tweet.created_at = Date.now() - (oneDayMs * (db.tweets.length - index));
    return tweet;
  });
  
  return {
    tweets: updatedTweets
  };
};

module.exports = dateAdjust;
