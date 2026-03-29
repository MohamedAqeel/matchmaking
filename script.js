let players = [];
let matches = [];
let angle = 0;

function startGame() {
    players = document.getElementById("players").value
        .split("\n")
        .map(p => p.trim())
        .filter(p => p !== "");

    drawWheel();
}

function drawWheel() {
    const canvas = document.getElementById("wheel");
    const ctx = canvas.getContext("2d");

    const arc = (2 * Math.PI) / players.length;

    ctx.clearRect(0, 0, 300, 300);

    players.forEach((player, i) => {
        const start = i * arc;
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? "#22c55e" : "#4ade80";
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, start, start + arc);
        ctx.fill();

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(start + arc / 2);
        ctx.fillStyle = "black";
        ctx.fillText(player, 80, 5);
        ctx.restore();
    });
}

function spin() {
    if (players.length < 2) {
        alert("Not enough players!");
        return;
    }

    // pick 2 random players
    let idx1 = Math.floor(Math.random() * players.length);
    let player1 = players.splice(idx1, 1)[0];

    let idx2 = Math.floor(Math.random() * players.length);
    let player2 = players.splice(idx2, 1)[0];

    let match = `${player1} vs ${player2}`;
    matches.push(match);

    document.getElementById("currentMatch").innerHTML =
        `<h2>⚔️ ${match}</h2>`;

    updateResults();
    drawWheel();

    if (players.length === 1) {
        document.getElementById("results").innerHTML +=
            `<p>🎯 ${players[0]} gets a BYE</p>`;
        players = [];
    }
}

function updateResults() {
    let html = "<h3>Match History</h3>";
    matches.forEach((m, i) => {
        html += `<p>${i + 1}. ${m}</p>`;
    });
    document.getElementById("results").innerHTML = html;
}

function exportResults() {
    let csv = "Match No,Players\n";
    matches.forEach((m, i) => {
        csv += `${i + 1},${m}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tournament_results.csv";
    a.click();
}