const memHistory = {} // this is the laziest and dangerous way of persistence :(

module.exports = {
  parseCurrentGames: function (getCurrentGamesResponse) {
    const games = [];
    getCurrentGamesResponse.d.Games.forEach(value => {
      const game = new Game(value.ID, value.GameName, value.Players, value.PlayerOnTurn, value.LastMoveOn);
      games.push(game)
    });

    return games;
  },
  checkIfHasToBeNotified: function (game) {

    if (!memHistory[game.id]) {
      memHistory[game.id] = game;
      return false;
    }

    if (memHistory[game.id].lastMoveOn !== game.lastMoveOn && memHistory[game.id].getPlayerOnTurnNickname() === process.env.USER) {
      return true;
    }
    return false;
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

