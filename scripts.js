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
        elements.enterPlayersTitle.innerText = 'הכנס שחקנים';
        elements.addPlayerButton.innerText = 'הוסף שחקן';
        elements.playerListTitle.innerText = 'רשימת שחקנים';
        document.getElementById('username').placeholder = 'שם משתמש';
        document.getElementById('password').placeholder = 'סיסמה';
        document.getElementById('playerName').placeholder = 'שם השחקן';
        document.getElementById('playerLevel').placeholder = 'רמת השחקן (1-5)';
    } else {
        elements.title.innerText = 'Football Team Management';
        elements.loginTitle.innerText = 'Login';
        elements.loginButton.innerText = 'Login';
        elements.enterPlayersTitle.innerText = 'Enter Players';
        elements.addPlayerButton.innerText = 'Add Player';
        elements.playerListTitle.innerText = 'Player List';
        document.getElementById('username').placeholder = 'Username';
        document.getElementById('password').placeholder = 'Password';
        document.getElementById('playerName').placeholder = 'Player Name';
        document.getElementById('playerLevel').placeholder = 'Player Level (1-5)';
    }
}

// Initialize language to English
changeLanguage();
