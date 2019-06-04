const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: null,
    aiHand: "",
}

const hands = [...document.querySelectorAll(".select img")];

const handSelection = (e) => {
    game.playerHand = e.target.dataset.option
    hands.forEach(hand => hand.style.boxShadow = "0 0 0px 0px ")
    e.target.style.boxShadow = "0 0 10px 0px black"
}

const computerChoice = () => {
    const aiDraw = Math.floor(Math.random() * hands.length)
    if (aiDraw === 0) return "papier"
    else if (aiDraw === 1) return "kamień"
    else if (aiDraw === 2) return "nożyczki"
}

const checkreasult = (player, aiPlayer) => {
    if (player === aiPlayer) return `draw`
    else if (player === "papier" && aiPlayer === "kamień" || player === "kamień" && aiPlayer === "nożyczki" || player === "nożyczki" && aiPlayer === "papier") {
        return `win`
    } else return "loss"
}

const publishResult = (player, ai, result) => {
    document.querySelector(`[data-summary="your-choice"]`).textContent = player;
    document.querySelector(`[data-summary="ai-choice"]`).textContent = ai;
    document.querySelector(`[data-summary="who-win"]`).textContent = result;

    document.querySelector(".numbers span").textContent = ++gameSummary.numbers
    if (result === "win") (
        document.querySelector(".wins span").textContent = ++gameSummary.wins,
        document.querySelector(`[data-summary="who-win"]`).textContent = "You Win!",
        document.querySelector(`[data-summary="who-win"]`).style.color = "green"

    )
    else if (result === "loss") (
        document.querySelector(".losses span").textContent = ++gameSummary.losses,
        document.querySelector(`[data-summary="who-win"]`).textContent = "You Lose!",
        document.querySelector(`[data-summary="who-win"]`).style.color = "red"
    )
    else (
        document.querySelector(".draws span").textContent = ++gameSummary.draws,
        document.querySelector(`[data-summary="who-win"]`).textContent = "Draw!",
        document.querySelector(`[data-summary="who-win"]`).style.color = "blue"
    )
}

const endGame = () => {
    hands.forEach(hand => hand.style.boxShadow = "0 0 0px 0px ")
    game.playerHand = "";
}

const startGame = () => {
    if (!game.playerHand) return alert("PLEASE SELECT HAND!")
    game.aiHand = computerChoice()
    const gameResult = checkreasult(game.playerHand, game.aiHand);
    // console.log(gameResult)
    publishResult(game.playerHand, game.aiHand, gameResult)
    endGame()
}

hands.forEach(hand => hand.addEventListener("click", handSelection));
document.querySelector(".start").addEventListener("click", startGame);
