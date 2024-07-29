const softwareVersion = "1.0.0";

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
    updatePlayerCount();
});

function updatePlayerList() {
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${player.name} - Level: ${player.level}
            ${player.image ? `<img src="${player.image}" alt="${player.name}" style="width: 50px; height: 50px; border-radius: 50%;">` : ''}
            <button onclick="removePlayer(${index})">Remove</button>
        `;
        playerList.appendChild(li);
    });
    updatePlayerCount();
}

function removePlayer(index) {
    const removedPlayer = players.splice(index, 1)[0];
    updatePlayerList();
    addPlayerToDropdown(removedPlayer);
    updatePlayerCount();
}

function updatePlayerCount() {
    const count = players.length;
    const remaining = 18 - count;
    document.getElementById('playerCount').innerText = `Players chosen: ${count}/18. ${remaining > 0 ? `${remaining} more needed.` : 'Ready to create teams!'}`;
}

document.getElementById('createTeams').addEventListener('click', function() {
    if (players.length !== 18) {
        alert(`Please choose ${18 - players.length} more players to create teams.`);
        return;
    }
    
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
        playerListTitle: document.getElementById('player-list-title'),
        createTeamsButton: document.getElementById('createTeams'),
        playerCount: document.getElementById('playerCount'),
        version: document.getElementById('version')
    };
    
    if (language === 'he') {
        elements.title.innerText = 'ניהול קבוצות כדורגל';
        elements.loginTitle.innerText = 'התחברות';
        elements.loginButton.innerText = 'התחבר';
        elements.enterPlayersTitle.innerText = 'הכנס שחקנים';
        elements.addPlayerButton.innerText = 'הוסף שחקן';
        elements.playerListTitle.innerText = 'רשימת שחקנים';
        elements.createTeamsButton.innerText = 'צור קבוצות';
        elements.playerCount.innerText = 'שחקנים שנבחרו: 0/18. צריך עוד 18.';
        elements.version.innerText = `גרסת תוכנה: ${softwareVersion}`;
        document.getElementById('username').placeholder = 'שם משתמש';
        document.getElementById('password').placeholder = 'סיסמה';
        document.getElementById('playerName').placeholder = 'שם השחקן';
        document.getElementById('playerLevel').placeholder = 'רמת השחקן (1-5)';
        document.getElementById('existingPlayers').firstChild.innerText = 'בחר שחקן קיים';
    } else {
        elements.title.innerText = 'Football Team Management';
        elements.loginTitle.innerText = 'Login';
        elements.loginButton.innerText = 'Login';
        elements.enterPlayersTitle.innerText = 'Enter Players';
        elements.addPlayerButton.innerText = 'Add Player';
        elements.playerListTitle.innerText = 'Player List';
        elements.createTeamsButton.innerText = 'Create Teams';
        elements.playerCount.innerText = 'Players chosen: 0/18. 18 more needed.';
        elements.version.innerText = `Software Version: ${softwareVersion}`;
        document.getElementById('username').placeholder = 'Username';
        document.getElementById('password').placeholder = 'Password';
        document.getElementById('playerName').placeholder = 'Player Name';
        document.getElementById('playerLevel').placeholder = 'Player Level (1-5)';
        document.getElementById('existingPlayers').firstChild.innerText = 'Choose existing player';
    }
}

function populateExistingPlayers() {
    const select = document.getElementById('existingPlayers');
    existingPlayers.forEach(player => {
        addPlayerToDropdown(player);
    });
}

function addPlayerToDropdown(player) {
    const option = document.createElement('option');
    option.value = player.name;
    option.innerText = `${player.name} - Level: ${player.level}`;
    document.getElementById('existingPlayers').appendChild(option);
}

function selectPlayer() {
    const selectedName = document.getElementById('existingPlayers').value;
    if (selectedName) {
        const selectedPlayer = existingPlayers.find(player => player.name === selectedName);
        if (selectedPlayer) {
            players.push(selectedPlayer);
            updatePlayerList();
            removePlayerFromDropdown(selectedName);
        }
    }
}

function removePlayerFromDropdown(playerName) {
    const select = document.getElementById('existingPlayers');
    const options = Array.from(select.options);
    options.forEach(option => {
        if (option.value === playerName) {
            select.removeChild(option);
        }
    });
    select.value = '';
}

function chooseRandomPlayers() {
    if (players.length >= 18) {
        alert('You already have 18 players.');
        return;
    }

    const remainingPlayers = existingPlayers.filter(player => !players.includes(player));
    while (players.length < 18 && remainingPlayers.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingPlayers.length);
        const randomPlayer = remainingPlayers.splice(randomIndex, 1)[0];
        players.push(randomPlayer);
        removePlayerFromDropdown(randomPlayer.name);
    }
    updatePlayerList();
}

document.getElementById('existingPlayers').addEventListener('change', selectPlayer);
document.getElementById('randomPlayers').addEventListener('click', chooseRandomPlayers);

// Initialize language to English and populate existing players
changeLanguage();
