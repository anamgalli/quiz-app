const pointsUser = sessionStorage.getItem('points');
let users = JSON.parse(sessionStorage.getItem('usernames'));
const username = sessionStorage.getItem('username');

const dataUsername = {
    "username": username,
    "points": pointsUser
}

getDataRanking();

function getDataRanking() {

    if (username) {
        if (users) {
            users.push(dataUsername);
            sessionStorage.setItem('usernames', JSON.stringify(users));
        } else {
            users = [];
            users.push(dataUsername);
            sessionStorage.setItem('usernames', JSON.stringify(users));
        }
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('points');
    } else {
        users = JSON.parse(sessionStorage.getItem('usernames'));
    }

    const usersOrderedForHighScore = users.sort( (a, b) => b.points - a.points); 

    showRanking(usersOrderedForHighScore);

}

function showRanking(usersOrdered) {

    const tableRanking = document.getElementById('table-ranking');

    users.forEach( (user, index) => {
        let positionRanking = index + 1;
        let row = document.createElement('tr');
        row.innerHTML = 
        `
        <td class="td">${positionRanking}</td>
        <td class="td">${user.username}</td>
        <td class="td">${user.points}</td>
        `;
        tableRanking.appendChild(row);
    });

}



