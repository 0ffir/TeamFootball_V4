const softwareVersion = "1.0.0";

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('playerForm')) {
        setupPlayerManagement();
    }
    if (document.getElementById('team1')) {
        setupGameDataEntry();
    }
    document.getElementById('version').innerText = `Software Version: ${softwareVersion}`;
});

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

function setupPlayerManagement() {
    const playerForm = document.getElementById('playerForm');
    const playerList = document.getElementById('playerList');

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

    document.getElementById('createTeams').addEventListener('click', createTeams);
    document.getElementById('randomPlayers').addEventListener('click', chooseRandomPlayers);

    populateExistingPlayers();
    updatePlayerCount();
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
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

function createTeams() {
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
}

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
        elements.enterPlayersTitle.innerText = 'הכנס שחקנים';
        elements.addPlayerButton.innerText = 'הוסף שחקן';
        elements.playerListTitle.innerText = 'רשימת שחקנים';
        elements.createTeamsButton.innerText = 'צור קבוצות';
        elements.playerCount.innerText = 'שחקנים שנבחרו: 0/18. צריך עוד 18.';
        elements.version.innerText = `גרסת תוכנה: ${softwareVersion}`;
        document.getElementById('playerName').placeholder = 'שם השחקן';
        document.getElementById('playerLevel').placeholder = 'רמת השחקן (1-5)';
        document.getElementById('existingPlayers').firstChild.innerText = 'בחר שחקן קיים';
    } else {
        elements.title.innerText = 'Football Team Management';
        elements.enterPlayersTitle.innerText = 'Enter Players';
        elements.addPlayerButton.innerText = 'Add Player';
        elements.playerListTitle.innerText = 'Player List';
        elements.createTeamsButton.innerText = 'Create Teams';
        elements.playerCount.innerText = 'Players chosen: 0/18. 18 more needed.';
        elements.version.innerText = `Software Version: ${softwareVersion}`;
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

function setupGameDataEntry() {
    const team1Select = document.getElementById('team1');
    const team2Select = document.getElementById('team2');
    const goalsContainer = document.getElementById('goals');
    const gameSummary = document.getElementById('gameSummary');
    
    populateTeamDropdowns(team1Select, team2Select);
    
    document.getElementById('addGoal').addEventListener('click', function() {
        addGoalEntry(goalsContainer);
    });
    
    document.getElementById('saveGame').addEventListener('click', function() {
        saveGameData();
    });
    
    function populateTeamDropdowns(team1Select, team2Select) {
        players.forEach(player => {
            const option1 = document.createElement('option');
            option1.value = player.name;
            option1.innerText = player.name;
            team1Select.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = player.name;
            option2.innerText = player.name;
            team2Select.appendChild(option2);
        });
    }
    
    function addGoalEntry(container) {
        const goalEntry = document.createElement('div');
        goalEntry.innerHTML = `
            <select class="goalPlayer">
                ${players.map(player => `<option value="${player.name}">${player.name}</option>`).join('')}
            </select>
            <button onclick="this.parentElement.remove()">Remove</button>
        `;
        container.appendChild(goalEntry);
        updateGameSummary();
    }
    
    function updateGameSummary() {
        const team1 = team1Select.value;
        const team2 = team2Select.value;
        const goals = Array.from(document.querySelectorAll('.goalPlayer')).map(select => select.value);
        
        let summary = `<p>Team 1: ${team1}</p>`;
        summary += `<p>Team 2: ${team2}</p>`;
        summary += '<p>Goals:</p><ul>';
        goals.forEach(goal => {
            summary += `<li>${goal}</li>`;
        });
        summary += '</ul>';
        
        gameSummary.innerHTML = summary;
    }
    
    function saveGameData() {
        const team1 = team1Select.value;
        const team2 = team2Select.value;
        const goals = Array.from(document.querySelectorAll('.goalPlayer')).map(select => select.value);
        
        const gameData = {
            team1: team1,
            team2: team2,
            goals: goals
        };
        
        const gameDataJson = JSON.stringify(gameData);
        const blob = new Blob([gameDataJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'game-data.json';
        a.click();
        
        URL.revokeObjectURL(url);
        alert('Game data saved!');
    }
}

// Initialize language to English and populate existing players
changeLanguage();
