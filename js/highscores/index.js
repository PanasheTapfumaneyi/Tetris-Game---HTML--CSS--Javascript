import { getUsersFromLocacalStorage } from '../helpers/users.js';

// sorts the highscores from highest to lowest
function sortHighScores() {
  const users = getUsersFromLocacalStorage();
  return users.sort((a, b) => Number(b.highScore) - Number(a.highScore));
}

function loadRankingTable() {
  let str = '<tr><td>RANK</td><td>NAME</td><td>SCORE</td><tr/>';
  sortHighScores().forEach(function (user, index) {
    str += `<tr><td>${index + 1}</td><td>${user.username}</td><td>${
      user.highScore
    }</td></tr>`;
  });

  document.getElementById('high-scores-body').innerHTML = str;
}

window.onload = () => {
  loadRankingTable();
};
