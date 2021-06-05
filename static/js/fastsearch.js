let fuse; // holds our search engine
let firstRun = true; // allow us to delay loading json data unless search activated
let list = document.getElementById("searchResults"); // targets the <ul>
let first = list.firstChild; // first child of search list
let last = list.lastChild; // last child of search list
let mainInput = document.getElementById("searchInput"); // input box for search
let resultsAvailable = false; // Did we get any search results?
const metaKey = "Meta";
const switchKey = "Shift";
const actionKey = "b";
const arrowUpKey = "ArrowUp";
const arrowDownKey = "ArrowDown";
const escapeKey = "Escape";

// The main keyboard event listener running the show
//
function keyPressed(event) {
  if (event.metaKey && event.key === actionKey) {
    // Load json search index if first time invoking search
    // Means we don't load json unless searches are going to happen; keep user payload small unless needed
    if (firstRun) {
      loadSearch(); // loads our json data and builds fuse.js search index
      firstRun = false; // let's never do this again
    }
    mainInput.focus(); // put focus in input box so you can just start typing
  }

  if (
    event.key === escapeKey &&
    (list.contains(document.activeElement) ||
      document.activeElement === mainInput)
  ) {
    document.activeElement.blur();
    mainInput.value = "";
    resultsAvailable = false;
    list.innerHTML = null;
  }

  if (
    event.key === "Backspace" &&
    mainInput === document.activeElement &&
    mainInput.value === ""
  ) {
    resultsAvailable = false;
  }

  if (event.key === arrowDownKey) {
    if (resultsAvailable) {
      event.preventDefault(); // stop window from scrolling
      if (document.activeElement === mainInput) {
        first.focus();
      } // if the currently focused element is the main input --> focus the first <li>
      else if (document.activeElement === last) {
        last.focus();
      } // if we're at the bottom, stay there
      else {
        document.activeElement.parentElement.nextSibling.firstElementChild.focus();
      } // otherwise select the next search result
    }
  }

  if (event.key === arrowUpKey) {
    if (resultsAvailable) {
      event.preventDefault(); // stop window from scrolling
      if (document.activeElement === mainInput) {
        mainInput.focus();
      } // If we're in the input box, do nothing
      else if (document.activeElement === first) {
        mainInput.focus();
      } // If we're at the first item, go to input box
      else {
        document.activeElement.parentElement.previousSibling.firstElementChild.focus();
      } // Otherwise, select the search result above the current active one
    }
  }
}

function clickSearch() {
  if (firstRun) {
    loadSearch();
    firstRun = false;
  }
}

document.addEventListener("keydown", keyPressed);
mainInput.addEventListener("click", clickSearch);

// execute search as each character is typed
//
document.getElementById("searchInput").onkeyup = function (e) {
  executeSearch(this.value);
};

// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open("GET", path);
  httpRequest.send();
}

// load our search index, only executed once
// on first call of search box (CMD-/)
//
function loadSearch() {
  fetchJSONFile("/index.json", function (data) {
    let options = {
      // fuse.js options; check fuse.js website for details
      shouldSort: true,
      location: 0,
      distance: 100,
      threshold: 0.4,
      minMatchCharLength: 2,
      keys: ["title", "permalink", "summary"],
    };
    fuse = new Fuse(data, options); // build the index from the json file
  });
}

// using the index we loaded on CMD-/, run
// a search query (for "term") every time a letter is typed
// in the search box
//
function executeSearch(term) {
  let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ""; // our results bucket

  if (results.length === 0) {
    // no results based on what was typed into the input box
    resultsAvailable = false;
    searchitems = "";
  } else {
    // build our html
    for (let item in results.slice(0, 5)) {
      // only show first 5 results
      searchitems =
        searchitems +
        '<li><a href="' +
        results[item].item.permalink +
        '" tabindex="0">' +
        '<span class="title">' +
        results[item].item.title +
        "</span><br /><em>" +
        results[item].item.description +
        "</em></a></li>";
    }
    resultsAvailable = true;
  }

  list.innerHTML = searchitems;
  if (results.length > 0) {
    first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
    last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
  }
}
