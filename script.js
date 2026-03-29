function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateMatches() {
    let players = document.getElementById("players").value
        .split("\n")
        .map(p => p.trim())
        .filter(p => p !== "");

    shuffle(players);

    let results = "";

    for (let i = 0; i < players.length; i += 2) {
        if (players[i + 1]) {
            results += `<p>⚔️ ${players[i]} vs ${players[i + 1]}</p>`;
        } else {
            results += `<p>🎯 ${players[i]} gets a BYE</p>`;
        }
    }

    document.getElementById("results").innerHTML = results;
}