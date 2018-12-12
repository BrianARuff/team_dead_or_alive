module.exports = {
  development: {
      client: "sqlite3",
      connection: {
          filename: "./data/dead_or_alive.sqlite3"
      },
      useNullAsDefault: true, // used to avoid warning on console
      migrations: {
          directory: "./data/migrations",
          tableName: "dbmigrations"
      },
      seeds: { directory: "./data/seeds" }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds/'
    },
    useNullAsDefault: true
  }
};