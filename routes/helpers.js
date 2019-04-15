const myfuncs = {
  checkAuth: (req, res, next) => {
    if (!req.isAuthenticated()){
      res.redirect("/login");
      return;
    }
    next();
  },
  // function to display creation time
  timeDifference: (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + " months ago";
    } else {
      return Math.round(elapsed / msPerYear) + " years ago";
    }
  },
  // function to get the creation time of an array
  creationTime: (arr) => {
    let timeElapsed = [];
    for (let i = 0; i < arr.length; i++) {
      timeElapsed.push(Date.parse(arr[i].createdAt));
    }
    return timeElapsed;
  }
}

module.exports = myfuncs;
