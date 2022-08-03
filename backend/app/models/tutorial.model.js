module.exports = (sequelize, Sequelize) => {
    const players = sequelize.define("players", {
      first: {
        type: Sequelize.STRING,
      },
      last: {
        type: Sequelize.STRING,
      },
      old: {
        type: Sequelize.STRING,
      },
      wins: {
        type: Sequelize.STRING,
      },
      losses: {
        type: Sequelize.STRING,
      },
      points: {
        type: Sequelize.STRING,
      },
      published: {
        type: Sequelize.BOOLEAN,
      },
    });
    return players;
  };