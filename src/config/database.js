module.exports = {
  dialect: "mariadb",
  host: "localhost",
  username: "root",
  password: "1234",
  database: process.env.NODE_ENV === "test" ? "teste_teste" : "ultima",
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
  },
};
