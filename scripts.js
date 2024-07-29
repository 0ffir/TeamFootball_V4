const softwareVersion = "1.0.0";

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('version').innerText = `Software Version: ${softwareVersion}`;
    setupInitialForm();
    loadSavedPlayers();
});

const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
const players = [...savedPlayers];

function setupInitialForm() {
    const setupForm = document.getElementById('setupForm');
    setupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const numPlayers = document.getElementById('numPlayers').value;
        const numTeams = document.getElementById('numTeams').value;
        setupPlayerForm(numPlayers, numTeams);
    });
}

function setupPlayerForm(numPlayers, numTeams) {
    document.getElementById('playerFormContainer').style.display = 'block';
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
    const numTeams = document.getElementById('numTeams').value;
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
}

document.getElementById('createTeams').addEventListener('click', createTeams);
