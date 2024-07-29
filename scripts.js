document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Default username and password
    const defaultUsername = 'admin';
    const defaultPassword = 'admin';
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === defaultUsername && password === defaultPassword) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('main').style.display = 'block';
        populateExistingPlayers();
    } else {
        alert('Invalid login');
    }
});

const playerForm = document.getElementById('playerForm');
const playerList = document.getElementById('playerList');
const existingPlayers = [
    { name: "Lionel Messi", level: 5, image: null },
    { name: "Cristiano Ronaldo", level: 5, image: null },
    { name: "Neymar", level: 4, image: null },
    { name: "Kylian Mbappe", level: 4, image: null },
    { name: "Kevin De Bruyne", level: 4, image: null },
    { name: "Robert Lewandowski", level: 4, image: null },
    { name: "Sergio Ramos", level: 4, image: null },
    { name: "Luka Modric", level: 4, image: null },
    { name: "Mohamed Salah", level: 4, image: null },
    { name: "Virgil van Dijk", level: 4, image: null },
    { name: "Karim Benzema", level: 4, image: null },
    { name: "Erling Haaland", level: 4, image: null },
    { name: "Harry Kane", level: 4, image: null },
    { name: "Sadio Mane", level: 4, image: null },
    { name: "Eden Hazard", level: 4, image: null },
    { name: "Raheem Sterling", level: 4, image: null },
    { name: "Antoine Griezmann", level: 4, image: null },
    { name: "Paul Pogba", level: 4, image: null }
];
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

function changeLanguage() {
    const language = document.getElementById('language').value;
    
    const elements = {
        title: document.getElementById('title'),
        loginTitle: document.getElementById('login-title'),
        loginButton: document.getElementById('login-button'),
        enterPlayersTitle: document.getElementById('enter-players-title'),
        addPlayerButton: document.getElementById('add-player-button'),
        playerListTitle: document.getElementById('player-list-title')
    };
    
    if (language === 'he') {
        elements.title.innerText = 'ניהול קבוצות כדורגל';
        elements.loginTitle.innerText = 'התחברות';
        elements.loginButton.innerText = 'התחבר';
        elements.enter
