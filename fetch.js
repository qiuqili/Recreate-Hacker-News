function updateFetch(type) {
  fetch('https://hacker-news.firebaseio.com/v0/' + type + '.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(ids) {
      return Promise.all(
        ids.map(function(id) {
          return fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function(response) {
            return response.json();
          });
        })
      );
    })
    .then(function(items) {
      items.map(function(item) {
        createItem(item, type);
      });
    });
}

updateFetch('topstories');

function createItem(value, type) {
  console.log(type);
  var list = document.querySelector('.content');
  var listItem = document.createElement('li');
  var link = document.createElement('a');
  link.innerHTML = value.title;
  link.href = value.url;
  var sub = document.createElement('div');
  if (type == 'jobstories') {
    sub.innerHTML = timeConvert(value.time) + ' ago ';
  } else {
    sub.innerHTML = value.score + ' points by ' + value.by + timeConvert(value.time) + ' ago | hide | ';
  }

  listItem.appendChild(link);
  listItem.appendChild(sub);
  list.appendChild(listItem);
}

// time
function timeConvert(t) {
  var d = new Date(t * 1000), // Convert the passed timestamp to milliseconds
    h = d.getHours(),
    min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
    time = h + ':' + min + ' ';
  return time;
}
// console.log(timeConvert(1532707016));
