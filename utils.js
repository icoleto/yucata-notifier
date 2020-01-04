module.exports = {
  parseCurrentGames: function (getCurrentGamesResponse) {
    const games = [];
    getCurrentGamesResponse.d.Games.forEach(value => {
      const game = new Game(value.ID, value.GameName, value.Players, value.PlayerOnTurn, value.LastMoveOn);
      games.push(game)
    });

    return games;
  }
}

class Game {
  constructor(
    id,
    gameName,
    players = [],
    playerOnTurn,
    lastMoveOn,
  ) {
    this.id = id,
      this.gameName = gameName;
    this.players = players;
    this.playerOnTurn = playerOnTurn;
    this.lastMoveOn = lastMoveOn;
  }

  getPlayerOnTurnNickname() {
    return this.players.find((player) => player.PlayerID === this.playerOnTurn).Login
  }

}
