let players = [];
const preExistingPlayers = [
    { name: "Lionel Messi", skill: 5 },
    { name: "Cristiano Ronaldo", skill: 5 },
    { name: "Neymar Jr", skill: 5 },
    { name: "Kylian Mbappe", skill: 5 },
    { name: "Luka Modric", skill: 4 },
    { name: "Sergio Ramos", skill: 4 },
    { name: "Virgil van Dijk", skill: 4 },
    { name: "Kevin De Bruyne", skill: 5 },
    { name: "Mohamed Salah", skill: 5 },
    { name: "Harry Kane", skill: 4 },
    { name: "Eden Hazard", skill: 4 },
    { name: "Sadio Mane", skill: 4 },
    { name: "Robert Lewandowski", skill: 5 },
    { name: "Paulo Dybala", skill: 4 },
    { name: "Antoine Griezmann", skill: 4 },
    { name: "Raheem Sterling", skill: 4 },
    { name: "Sergio Aguero", skill: 4 },
    { name: "Kante", skill: 4 }
];

function addPlayer() {
    const name = document.getElementById("player-name").value;
    const skill = parseInt(document.getElementById("player-skill").value);

    if (name && skill >= 1 && skill <= 5) {
        players.push({ name, skill });
        updatePlayerList();
        updatePlayerCount();
    } else {
        alert("Please enter valid player details.");
    }
}

function autoAddPlayers() {
    players = [...preExistingPlayers];
    updatePlayerList();
    updatePlayerCount();
}

function updatePlayerList() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";
    players.forEach(player => {
        const playerItem = document.createElement("div");
        playerItem.className = "player-item";
        playerItem.innerText = `${player.name} - Skill: ${player.skill}`;
        playerList.appendChild(playerItem);
    });
}

function updatePlayerCount() {
    const playerCount = document.getElementById("player-count");
    playerCount.innerText = `Chosen Players: ${players.length} / 18`;
}

function createTeams() {
    if (players.length !== 18) {
        alert("Please choose exactly 18 players.");
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
        teamDiv.className = "team";
        teamDiv.innerHTML = `<h3>Team ${index + 1}</h3>`;
        team.forEach(player => {
            const playerItem = document.createElement("div");
            playerItem.className = "player-item";
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
