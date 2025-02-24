class Player {
    constructor(name, team) {
        this.name = name;
        this.score = 0;
        this.team = team;
    }

    attemptShot(successRate) {
        if (Math.random() < successRate) {
            this.score++;
        }
    }
}

function generateSuccessRate() {
    return Math.random();
}

function playRound(players, attempts) {
    players.forEach(player => {
        const successRate = generateSuccessRate();
        for (let i = 0; i < attempts; i++) {
            player.attemptShot(successRate);
        }
    });
}

function rankPlayers(players) {
    return players.sort((a, b) => b.score - a.score);
}

function displayRankings(players) {
    console.log("\n🏆 Rankings after this round:");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - ${player.score} points`);
    });
}

function tieBreaker(players, attempts) {
    console.log("\n🔥 Tiebreaker needed between: " + players.map(p => p.name).join(", ")+"\n");
    console.log("🏀 Round 2 Begins!");

    players.forEach(player => (player.score = 0));
    playRound(players, attempts);

    players.forEach(player => {
        console.log(`${player.name} scored ${player.score} successful shots.`);
    });

    displayRankings(players);
    return rankPlayers(players)[0];
}

function determineChampion(players) {
    let rankedPlayers = rankPlayers(players);

  
    if (rankedPlayers.length > 1 && rankedPlayers[0].score === rankedPlayers[1].score) {
        let tiedPlayers = rankedPlayers.filter(p => p.score === rankedPlayers[0].score);

        if (tiedPlayers.length > 1) {
            let winner = tieBreaker(tiedPlayers, 3);
            console.log(`\n🏆 The champion is ${winner.name} with ${winner.score} points!\n`);
            return;
        }
    }

  
    console.log(`\n 🏆 The champion is ${rankedPlayers[0].name} with ${rankedPlayers[0].score} points!\n`);
}

const players = [
    new Player("James", "Lakers"),
    new Player("Curry", "Warriors"),
    new Player("Jordan", "Bulls"),
    new Player("Bryant", "Lakers"),
    new Player("Durant", "Suns")
];

playRound(players, 5);
displayRankings(players);
determineChampion(players);
