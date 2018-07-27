fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(function(responseObj) {
  console.log('status:', responseObj.status);
});
