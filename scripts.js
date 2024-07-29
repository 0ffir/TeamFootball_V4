document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Simple login mechanism
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('main').style.display = 'block';
    } else {
        alert('Invalid login');
    }
});

const playerForm = document.getElementById('playerForm');
const playerList = document.getElementById('playerList');
const players = [];

playerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('playerName').value;
    const level = parseInt(document.getElementById('playerLevel').value);
    const image = document.getElementById('playerImage').files[0];
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const player = {
            name: name,
            level: level,
            image: e.target.result
        };
        players.push(player);
        updatePlayerList();
    };
    if (image) {
        reader.readAsDataURL(image);
    } else {
        const player = {
            name: name,
            level: level,
            image: null
        };
        players.push(player);
        updatePlayerList();
    }
});

function updatePlayerList() {
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${player.name} - Level: ${player.level}
            ${player.image ? `<img src="${player.image}" alt="${player.name}" style="width: 50px; height: 50px; border-radius: 50%;">` : ''}
        `;
        playerList.appendChild(li);
    });
}

document.getElementById('createTeams').addEventListener('click', function() {
    const teams = [[], [], []];
    players.sort((a, b) => b.level - a.level);
    
    players.forEach((player, index) => {
        teams[index % 3].push(player);
    });
    
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';
    
    teams.forEach((team, index) => {
        const div = document.createElement('div');
        div.classList.add('team');
        div.innerHTML = `<h4>Team ${index + 1}</h4>`;
        team.forEach(player => {
            div.innerHTML += `
                ${player.name} - Level: ${player.level}
                ${player.image ? `<img src="${player.image}" alt="${player.name}" style="width: 50px; height: 50px; border-radius: 50%;">` : ''}
                <br>
            `;
        });
        teamsContainer.appendChild(div);
    });
});
