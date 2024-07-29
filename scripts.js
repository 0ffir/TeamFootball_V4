let players = [];
let preExistingPlayers = [
    { name: "Player 1", skill: 3 },
    { name: "Player 2", skill: 4 },
    { name: "Player 3", skill: 2 },
    { name: "Player 4", skill: 5 },
    { name: "Player 5", skill: 1 },
    { name: "Player 6", skill: 3 },
    { name: "Player 7", skill: 4 },
    { name: "Player 8", skill: 2 },
    { name: "Player 9", skill: 5 },
    { name: "Player 10", skill: 1 },
    { name: "Player 11", skill: 3 },
    { name: "Player 12", skill: 4 },
    { name: "Player 13", skill: 2 },
    { name: "Player 14", skill: 5 },
    { name: "Player 15", skill: 1 },
    { name: "Player 16", skill: 3 },
    { name: "Player 17", skill: 4 },
    { name: "Player 18", skill: 2 },
];

function addPlayer() {
    const name = document.getElementById("player-name").value;
    const skill = parseInt(document.getElementById("player-skill").value);
    const image = document.getElementById("player-image").files[0];

    if (name && skill >= 1 && skill <= 5) {
        players.push({ name, skill, image });
        updatePlayerList();
        updatePlayerCount();
    } else {
        alert("Please enter valid player details.");
    }
}

function updatePlayerList() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";
    players.forEach(player => {
        const playerItem = document.createElement("div");
        playerItem.innerText = `${player.name} - Skill: ${player.skill}`;
        playerList.appendChild(playerItem);
    });
}

function updatePlayerCount() {
    const playerCount = document.getElementById("player-count");
    playerCount.innerText = `Chosen Players: ${players.length} / 18`;
}

function createTeams() {
    if (players.length < 18) {
        alert("Please choose at least 18 players.");
        return;
    }

    players = shuffle(players);
    const teams = [[], [], []];

    for (let i = 0; i < 18; i++) {
        teams[i % 3].push(players[i]);
    }

    displayTeams(teams);
}

function regenerateTeams() {
    createTeams();
}

function displayTeams(teams) {
    const teamsContainer = document.getElementById("teams");
    teamsContainer.innerHTML = "";

    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.innerHTML = `<h3>Team ${index + 1}</h3>`;
        team.forEach(player => {
            const playerItem = document.createElement("div");
            playerItem.innerText = `${player.name} - Skill: ${player.skill}`;
            teamDiv.appendChild(playerItem);
        });
        teamsContainer.appendChild(teamDiv);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function addGoalEntry() {
    const goalEntries = document.getElementById("goal-entries");
    const goalEntryDiv = document.createElement("div");
    goalEntryDiv.innerHTML = `
        <select class="goal-player-select">
            ${players.map(player => `<option value="${player.name}">${player.name}</option>`).join('')}
        </select>
        <input type="number" class="goal-time" placeholder="Goal Time (min)">
    `;
    goalEntries.appendChild(goalEntryDiv);
}

function saveGameData() {
    const team1 = document.getElementById("team1-select").value;
    const team2 = document.getElementById("team2-select").value;
    const goals = [];

    document.querySelectorAll("#goal-entries div").forEach(entry => {
        const player = entry.querySelector(".goal-player-select").value;
        const time = entry.querySelector(".goal-time").value;
        goals.push({ player, time });
    });

    const gameData = { team1, team2, goals };
    downloadJSON(gameData, "game-data.json");
}

function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function switchLanguage(language) {
    // Implement language switcher functionality
}
