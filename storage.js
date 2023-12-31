// User storage
function setUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function removeSessionUser() {
  localStorage.removeItem("user");
}

function setSessionUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

function getSessionUser() {
  return JSON.parse(localStorage.getItem("user")) || null;
}

// Score Storage

function getScores() {
  return JSON.parse(localStorage.getItem("scores")) || [];
}

function setScores(scores) {
  localStorage.setItem("scores", JSON.stringify(scores));
}

function sendNewScore(score) {
  const allScores = getScores();
  allScores.push(score);
  setScores(allScores);
}

function sortedScores() {
  const scores = getScores();
  const sortedScores = scores.sort((a, b) => b.score - a.score);

  return sortedScores;
}

function getSessionsUserScoresByCategory(category) {
  const scores = getScores();
  const sessionUser = getSessionUser();

  const filteredScores = scores.filter(
    (score) =>
      score.userId === sessionUser.id && score.category === category
  );

  return filteredScores;
}