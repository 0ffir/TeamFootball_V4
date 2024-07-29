const softwareVersion = "1.0.0";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('version').innerText = `Software Version: ${softwareVersion}`;
    setupPlayerManagement();
    loadSavedPlayers();
});

const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
const players = [...savedPlayers];

function setupPlayerManagement() {
    const playerForm = document.getElementById('playerForm');
    playerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('playerName').value;
        const level = parseInt(document.getElementById('playerLevel').value);
        
        const player = {
            name: name,
            level: level
        };
        players.push(player);
        updatePlayerList();
        savePlayers();
    });

    document.getElementById('createTeams').addEventListener('click', createTeams);
    document.getElementById('manageGameData').addEventListener('click', function() {
        window.location.href = 'game-data.html';
    });
}

function updatePlayerList() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${player.name} - Level: ${player.level}
            <button onclick="removePlayer(${index})">Remove</button>
        `;
        playerList.appendChild(li);
    });
}

function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerList();
    savePlayers();
}

function savePlayers() {
    localStorage.setItem('players', JSON.stringify(players));
}

function loadSavedPlayers() {
    updatePlayerList();
}

function createTeams() {
    const numTeams = 3; // Fixed number of teams for simplicity
    const teams = Array.from({ length: numTeams }, () => []);
    
    players.sort((a, b) => b.level - a.level);
    
    players.forEach((player, index) => {
        teams[index % numTeams].push(player);
    });
    
    const teamsContainer = document.getElementById('teams');
    teamsContainer.innerHTML = '';
    
    teams.forEach((team, index) => {
        const div = document.createElement('div');
        div.classList.add('team');
        div.innerHTML = `<h4>Team ${index + 1}</h4>`;
        team.forEach(player => {
            div.innerHTML += `
                ${player.name} - Level: ${player.level}<br>
            `;
        });
        teamsContainer.appendChild(div);
    });

    document.getElementById('manageGameData').style.display = 'block';
}

function changeLanguage() {
    const language = document.getElementById('language').value;
    // Update UI texts based on selected language...
}

// Initialize language to English and populate existing players
changeLanguage();
