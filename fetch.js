var allIds = [];
var i = 0;
var type = 'topstories';

function updateFetch() {
  fetch('https://hacker-news.firebaseio.com/v0/' + type + '.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(ids) {
      allIds = ids;
      fetchItems(ids.slice(0, 30));
    });
}

function fetchItems(ids) {
  return Promise.all(
    ids.map(function(id) {
      return fetch('https://hacker-news.firebaseio.com/v0/item/' + id + '.json').then(function(response) {
        return response.json();
      });
    })
  ).then(function(items) {
    items.map(function(item) {
      createItem(item);
    });
  });
}

updateFetch();

function createItem(value) {
  var list = document.querySelector('.content');
  var listItem = document.createElement('li');
  var link = document.createElement('a');
  link.innerHTML = value.title;
  link.href = value.url;
  var sub = document.createElement('div');
  if (type == 'jobstories') {
    sub.innerHTML = timeConvert(value.time);
  } else {
    sub.innerHTML = value.score + ' points by ' + value.by + timeConvert(value.time) + '| hide | past | web | discuss';
  }
  listItem.appendChild(link);
  listItem.appendChild(sub);
  list.appendChild(listItem);
}

window.addEventListener('scroll', function() {
  var bottom = document.querySelector('footer');
  var rect = bottom.getBoundingClientRect();
  if (window.innerHeight > rect.y) {
    i += 30;
    fetchItems(allIds.slice(0 + i, 30 + i), type);
  }
});

// time
function timeConvert(t) {
  var d = new Date(t * 1000), // Convert the passed timestamp to milliseconds
    h = d.getHours(),
    min = ('0' + d.getMinutes()).slice(-2), // Add leading 0.
    time = h + ':' + min + ' ';
  return time;
}
